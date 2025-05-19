import { useState, useEffect, useCallback } from "react";
import { MessageAPI } from "../../../app/api/messages";
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

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const messagesData = await MessageAPI.getAll(projectId);

      // Transform the data to match the expected format
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

  // Send a message using the API
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !projectId) return;

      // Optimistically add user message to the UI
      const userMessage: Message = { sender: "user", text };
      setMessages((prev) => [...prev, userMessage]);

      setLoading(true);
      setError(null);

      try {
        // Create the message using the API
        await MessageAPI.create({
          project_id: projectId,
          message: text,
          from_user: true,
        });

        // Fetch messages to ensure we have the latest state
        await fetchMessages(); // This is causing the scroll reset
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

  // Set up real-time subscription to messages
  useEffect(() => {
    if (!projectId) return;

    // Initial fetch of messages
    fetchMessages();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`messages-${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `project_id=eq.${projectId}`,
        },
        (_payload) => {
          // When a new message is inserted, fetch all messages again
          // This ensures we have the correct order and all messages
          fetchMessages();
        }
      )
      .subscribe();

    // Clean up subscription when component unmounts or projectId changes
    return () => {
      subscription.unsubscribe();
    };
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
