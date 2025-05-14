import { useState } from "react";

export interface Message {
  sender: "user" | "system";
  text: string;
  timestamp: Date;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "user",
      text: "Who the heck is Bombordillo Croccodrillo?",
      timestamp: new Date(),
    },
    {
      sender: "system",
      text: "It is an italian brainrot name",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: "user", text: newMessage, timestamp: new Date() },
      ]);
      setNewMessage("");

      // Simulate response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "I've received your message and will get back to you shortly.",
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
  };
};
