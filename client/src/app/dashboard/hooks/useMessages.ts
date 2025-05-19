import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../supabase-client";

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

  // Fetch messages from Supabase
  const fetchMessages = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from("messages")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (supabaseError) throw supabaseError;

      if (data) {
        // Transform the data to match the expected format
        const formattedMessages = data.map((msg) => ({
          sender: msg.from_user ? "user" : "system",
          text: msg.message,
        }));
        setMessages(formattedMessages);
      }
    } catch (err) {
      setError("Error fetching messages");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Send a message to Supabase
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !projectId) return;

      // Optimistically add user message to the UI
      const userMessage: Message = { sender: "user", text };
      setMessages((prev) => [...prev, userMessage]);

      setLoading(true);
      setError(null);

      try {
        // Insert the message into Supabase
        const { error: supabaseError } = await supabase.from("messages").insert({
          project_id: projectId,
          message: text,
          from_user: true,
          created_at: new Date().toISOString(),
        });

        if (supabaseError) throw supabaseError;

        // Fetch messages to ensure we have the latest state
        await fetchMessages();
        
      } catch (err) {
        setError("Error sending message");
        console.error("Error sending message:", err);
        // If failed, remove the optimistic message
        setMessages((prev) => prev.filter((msg) => msg !== userMessage));
      } finally {
        setLoading(false);
      }
    },
    [projectId, fetchMessages]
  );

  // Handle sending the current message
  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  }, [newMessage, sendMessage]);

  // Load messages when component mounts or projectId changes
  useEffect(() => {
    if (projectId) {
      fetchMessages();
    }
  }, [projectId, fetchMessages]);

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    loading,
    error,
    refreshMessages: fetchMessages,
  };
};
