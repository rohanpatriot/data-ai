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
  const [returnOnlyMessage, setReturnOnlyMessage] = useState(false);
  const [referencedWidget, setReferencedWidget] = useState<{id: string; } | null>(null);

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
      // Save user message with reference
      await saveUserMessage(message, projectId);
      
      // Get structured data
      const structuredData = await getStructuredData(projectId);
      
      // Determine if it's first message
      const isFirstMessage = messages.length === 0;
      
      // Call Edge Function
      const response = await callEdgeFunction(message, structuredData, isFirstMessage, projectId);
      
      if (!response.data?.choices) {
        throw new Error("Invalid response format from API");
      }
  
      const responseData = response.data.choices[0].message.content;
      let parsedJSON;
  
      try {
        const cleanData = responseData.replace(/```json|```/g, '').trim();
        parsedJSON = JSON.parse(cleanData);
        setReturnOnlyMessage(!parsedJSON.widgets);
      } catch (parseError) {
        parsedJSON = { message: responseData };
        setReturnOnlyMessage(true);
      }
  
      if (!returnOnlyMessage && parsedJSON.widgets) {
        await saveWidgets(parsedJSON.widgets, projectId);
      }
  
      await saveAIResponse(parsedJSON.message, projectId);
  
      if (!returnOnlyMessage && parsedJSON.sources) {
        await saveDataSources(parsedJSON.sources, projectId);
      }
  
      await fetchMessages();
  
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error processing message");
      console.error("Error processing message:", err);
    } finally {
      setLoading(false);
      setDashboardLoading(false);
      setReferencedWidget(null); // Clear reference after sending
    }
  };
  
  // Modified saveUserMessage to include reference
  const saveUserMessage = async (message: string, projectId: string) => {
    const messageData = {
      message,
      project_id: projectId,
      from_user: true,
    };

    await MessageAPI.create(messageData);
    const userMessage: Message = { 
      sender: "user", 
      text: message,
    };
    setMessages((prev) => [...prev, userMessage]);
  };
  
  const getStructuredData = async (projectId: string) => {
    const dataSources = await API.dataSources.getAll(projectId);
    return dataSources.reduce((acc, source) => {
      (acc as Record<string, string>)[source.name] = source.path;
      return acc;
    }, {});
  };
  
  const callEdgeFunction = async (message: string, structuredData: Record<string, string>, isFirstMessage: boolean, projectId: string) => {
    return await supabase.functions.invoke('call-perplexity', {
      body: {
        mode: isFirstMessage ? 'f1' : 'r1',
        query: message,
        structuredDataSource: structuredData,
        chatHistory: messages,
        previousWidgets: isFirstMessage ? null : await API.widgets.getAll(projectId),
        focusedWidgetsData: null,
      }
    });
  };
  
  const saveWidgets = async (widgets: any[], projectId: string) => {
    let position = 1;
    for (const widget of widgets) {
      const widgetData = JSON.stringify(widget);
      await API.widgets.create({
        project_id: projectId,
        widget_type: widget.type,
        data: JSON.parse(widgetData),
        position: position++,
        customization_type: 1,
        name: widget.title || "Untitled Widget",
      });
    }
  };
  
  const saveAIResponse = async (message: string, projectId: string) => {
    await MessageAPI.create({
      message,
      project_id: projectId,
      from_user: false
    });
  };
  
  const saveDataSources = async (sources: string[], projectId: string) => {
    for (const source of sources) {
      const url = source.trim();
      const name = url.replace(/^https?:\/\//, '').split('/')[0];
      await DataSourcesAPI.create({
        projectId,
        name,
        path: url,
        isLink: true,
        addedByAi: true,
      });
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
    referencedWidget,
    setReferencedWidget,
  };
};
