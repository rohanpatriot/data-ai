import React, { useEffect, useRef } from "react";
import { Box, IconButton, Typography, Avatar, useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../../../shared/components/Logo";
import ChatBox from "./ChatBox";
import brandmark from '@/assets/brandmark.svg'

interface ChatSidePanelProps {
  setChatOpen: (open: boolean) => void;
  messages: { sender: string; text: string }[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  user: {
    email: string;
    avatar_url: string;
  };
}

const ChatSidePanel: React.FC<ChatSidePanelProps> = ({
  setChatOpen,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  user,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? "100vw" : "330px",
        display: "flex",
        flexDirection: "column",
        height: isMobile ? '100%' : '98%',
        border: isMobile ? "none" : "1px solid #eaeaea",
        borderRadius: "12px",
        margin: isMobile ? "0" : "2%",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Logo />
        <IconButton onClick={() => setChatOpen(false)} sx={{ ml: "auto" }}>
          <Box
            component="span"
            sx={{
              width: 24,
              height: 24,
              display: "flex",
            }}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 2V19M1 7.9C1 5.66 1 4.54 1.436 3.684C1.81949 2.93139 2.43139 2.31949 3.184 1.936C4.04 1.5 5.16 1.5 7.4 1.5H12.6C14.84 1.5 15.96 1.5 16.816 1.936C17.5686 2.31949 18.1805 2.93139 18.564 3.684C19 4.54 19 5.66 19 7.9V13.1C19 15.34 19 16.46 18.564 17.316C18.1805 18.0686 17.5686 18.6805 16.816 19.064C15.96 19.5 14.84 19.5 12.6 19.5H7.4C5.16 19.5 4.04 19.5 3.184 19.064C2.43139 18.6805 1.81949 18.0686 1.436 17.316C1 16.46 1 15.34 1 13.1V7.9Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{ mb: 3, display: "flex", alignItems: "flex-start" }}
          >
            {msg.sender === "user" ? (
              <Avatar
                src={user.avatar_url}
                sx={{ mr: 2, width: 36, height: 36 }}
              />
            ) : (
              <Avatar
                src={brandmark}
                sx={{
                  mr: 2,
                  width: 36,
                  height: 36,
                  bgcolor: "transparent",
                  padding: 0.8,
                }}
              />
            )}
            <Box sx={{ maxWidth: "85%" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {msg.sender === "user" ? "you" : "perplexigrid"}
                </Typography>
              </Box>
              <Typography
                ref={messagesEndRef}
                variant="body2"
                sx={{ textAlign: "start" }}
              >
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2 }}>
        <ChatBox
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </Box>
    </Box>
  );
};

export default ChatSidePanel;
