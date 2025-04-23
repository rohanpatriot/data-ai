
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-2 bg-background border-t border-border">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 resize-none max-h-32 rounded-md border border-input p-2 focus:outline-none focus:ring-2 focus:ring-perplexity-purple focus:border-transparent"
        rows={1}
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className={`p-2 rounded-md ${
          message.trim() && !disabled
            ? "bg-perplexity-purple text-white hover:bg-perplexity-purple/90"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}
