
import { useState } from "react";
import { User } from "lucide-react";
import { SharedUser } from "@/types";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SharedUserBubbleProps {
  user: SharedUser;
  position: { x: number; y: number };
}

export default function SharedUserBubble({ user, position }: SharedUserBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a consistent color based on email
  const getColorFromEmail = (email: string) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };
  
  const color = getColorFromEmail(user.email);
  const initials = user.email
    .split('@')[0]
    .substring(0, 2)
    .toUpperCase();
  
  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`rounded-full flex items-center justify-center shadow-md transition-all ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{
                width: '35px',
                height: '35px',
                backgroundColor: color,
                border: '2px solid white',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {initials || <User size={16} />}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.email}</p>
            <p className="text-xs text-muted-foreground">
              {user.isActive ? 'Active now' : 'Offline'}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
