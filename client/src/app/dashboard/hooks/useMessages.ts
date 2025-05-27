import { useState, useEffect, useCallback } from "react";
import { MessageAPI } from "../../../app/api/messages";
import { supabase } from "../../../supabase-client";
import { API } from "../../api/api";
import { DataSourcesAPI } from "../../api/dataSources";

// Define message type
interface Message {
  sender: string;
  text: string;
}

export const useMessages = (projectId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const messagesData = await MessageAPI.getAll(projectId);
      const formattedMessages = messagesData.map((msg) => ({
        sender: msg.from_user ? "user" : "system",
        text: msg.message,
      }));
      setMessages(formattedMessages);
    } catch (err) {
      setError("Error fetching messages");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const handleSendMessage = async (message: string) => {
    if (!projectId || !message.trim()) return;

    setLoading(true);
    setDashboardLoading(true);
    setError(null);

    try {
      await MessageAPI.create({
        message,
        project_id: projectId,
        from_user: true
      });
      // Optimistically add user message to the UI
      const userMessage: Message = { sender: "user", text: message };
      setMessages((prev) => [...prev, userMessage]);

      // 2. Get data sources if any
      const dataSources = await API.dataSources.getAll(projectId);
      const structuredData = dataSources.reduce((acc, source) => {
        (acc as Record<string, string>)[source.name] = source.path;
        return acc;
      }, {});

      // 3. Determine if it's first message
      const isFirstMessage = messages.length === 0;

      // 4. Call Supabase Edge Function
      const response = await supabase.functions.invoke('call-perplexity', {
        body: {
          mode: isFirstMessage ? 'f1' : 'r1',
          query: message,
          structuredDataSource: structuredData,
          chatHistory: messages,
          previousWidgets: isFirstMessage? null : await API.widgets.getAll(projectId),
          focusedWidgetsData: null,
        }
      }
    );

      // 5. Save the generated widgets
      if (response.data?.choices) {
        const responseData = response.data.choices[0].message.content;
        const cleanData = responseData.replace(/```json|```/g, '').trim();
        const parsedJSON = JSON.parse(cleanData);
      
        if (!parsedJSON.widgets) {
          throw new Error("No widgets found in the response.");
        }
        let position = 1;
        for (const widget of parsedJSON.widgets) {
          const widgetData = JSON.stringify(widget);
          
          await API.widgets.create({
            project_id: projectId,
            widget_type: widget.type,
            data: JSON.parse(widgetData),
            position: position,
            customization_type: 1,
            name: widget.title || "Untitled Widget",
          });
          position++;
        }
      }

      // 6. Save AI response message
      if (response.data?.choices) {
        const responseData = response.data.choices[0].message.content;
        const cleanData = responseData.replace(/```json|```/g, '').trim();
        const parsedJSON = JSON.parse(cleanData);
        await MessageAPI.create({
          message: parsedJSON.message,
          project_id: projectId,
          from_user: false
        });
      }

      if(response.data?.choices) {
        const responseData = response.data.choices[0].message.content;
        const cleanData = responseData.replace(/```json|```/g, '').trim();
        const parsedJSON = JSON.parse(cleanData);
        const sources = parsedJSON.sources || [];
      
        for (const source of sources) {
          const url = source.trim();
          const name = url.replace(/^https?:\/\//, '').split('/')[0];
          await DataSourcesAPI.create({
            projectId: projectId,
            name: name,
            path: url,
            isLink: true,
            addedByAi: true,
          });
        }
      }

      await fetchMessages();

    } catch (err) {
      setError("Error processing message");
      console.error("Error processing message:", err);
    } finally {
      setLoading(false);
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    newMessage,
    setNewMessage,
    loading,
    dashboardLoading,
    error,
    handleSendMessage,
  };
};
