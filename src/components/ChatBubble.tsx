
import { useState, useEffect, useRef } from "react";
import { X, Send, Circle, Smile, Image } from "lucide-react";
import { fetchMockResponse } from "../services/apiService";
import useBubbleStore from "../store/bubbleStore";
import { BubbleData } from "../types";

interface ChatBubbleProps {
  bubble: BubbleData;
  isActive: boolean;
  onClose: (e: React.MouseEvent) => void;
}

export default function ChatBubble({ bubble, isActive, onClose }: ChatBubbleProps) {
  const { id, message } = bubble;
  
  const [isLoading, setIsLoading] = useState(false);
  const [localMessage, setLocalMessage] = useState(message);
  const { updateBubbleMessage, updateBubbleResponse } = useBubbleStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (message !== localMessage) {
      setLocalMessage(message);
    }
  }, [message]);

  // Focus the input when bubble is created
  useEffect(() => {
    if (inputRef.current && isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!localMessage.trim()) return;
    
    updateBubbleMessage(id, localMessage);
    setIsLoading(true);
    
    try {
      const mockResponse = await fetchMockResponse(localMessage);
      updateBubbleResponse(
        id, 
        mockResponse.text, 
        mockResponse.chartType, 
        mockResponse.chartData
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      updateBubbleResponse(id, "Sorry, there was an error processing your request.", undefined, undefined);
    } finally {
      setIsLoading(false);
    }
  };

  // Redesigned chat bubble as a horizontal bar
  return (
    <div 
      className="bg-card border border-border shadow-lg rounded-lg animate-fade-in flex flex-col w-96"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the bubble
    >
      {/* Horizontal input bar */}
      <form 
        className="flex flex-row p-2 items-center" 
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          value={localMessage}
          onChange={(e) => setLocalMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border-0 bg-transparent outline-none focus:ring-0"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={!localMessage.trim() || isLoading}
          className={`p-2 rounded-md ${
            localMessage.trim() && !isLoading
              ? "text-perplexity-purple hover:bg-accent"
              : "text-muted-foreground"
          }`}
        >
          <Send className="h-5 w-5" />
        </button>
        
        <button 
          onClick={onClose}
          className="ml-1 p-1 hover:bg-muted rounded text-destructive"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </form>
      
      {/* Icon buttons */}
      <div className="flex justify-center border-t border-border p-1 space-x-2">
        <button className="p-1.5 hover:bg-muted rounded-full">
          <Circle className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded-full">
          <Smile className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-1.5 hover:bg-muted rounded-full">
          <Image className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      
      {/* Response loading state */}
      {isLoading && (
        <div className="border-t border-border p-3">
          <div className="flex gap-1.5 items-center p-2">
            <div className="h-2 w-2 bg-perplexity-purple rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-perplexity-purple rounded-full animate-pulse delay-100"></div>
            <div className="h-2 w-2 bg-perplexity-purple rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      )}
    </div>
  );
}
