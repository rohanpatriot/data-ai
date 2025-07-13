import React, { useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  Skeleton,
} from "@mui/material";
import Logo from "../../../../shared/components/Logo";
import ChatBox from "./ChatBox";
import brandmark from "@/assets/brandmark.svg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMessages } from "../../hooks/useMessages";
import { useWidgets } from "../../hooks/useWidgets";
import { useAppTheme } from "../../../../theme/ThemeContext";
import ChatIcon from "./ChatIcon";

interface ChatSidePanelProps {
  setChatOpen: (open: boolean) => void;
  user: {
    email: string;
    avatar_url: string;
  };
  chatOpen: boolean;
  projectId?: string;
  setDashboardLoading: (loading: boolean) => void;
}

const ChatSidePanel: React.FC<ChatSidePanelProps> = ({
  setChatOpen,
  user,
  chatOpen,
  projectId,
  setDashboardLoading,
}) => {
  const {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    loading,
    dashboardLoading,
    referencedWidget, // Get the referenced widget from useMessages
  } = useMessages(projectId);

  const { get: getWidget } = useWidgets(projectId);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setDashboardLoading(dashboardLoading);
  }, [dashboardLoading, setDashboardLoading]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, dashboardLoading]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mode } = useAppTheme();
  const strokeColor = mode === "dark" ? "#fff" : "#000";

  const renderChatContent = () => (
    <Box
      sx={{
        width: isMobile ? "100%" : "330px",
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "90vh" : "98%",
        border: isMobile ? "none" : `1px solid ${theme.palette.divider}`,
        borderRadius: isMobile ? 0 : "12px",
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
          {isMobile ? (
            <CloseRoundedIcon />
          ) : (
            <Box
              component="span"
              sx={{
                width: 24,
                height: 24,
                display: "flex",
              }}
            >
              <ChatIcon color={strokeColor} />
            </Box>
          )}
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.1) transparent",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{ mb: 3, display: "flex", alignItems: "flex-start" }}
          >
            {msg.sender === "user" ? (
              <Avatar
                src={user.avatar_url}
                sx={{
                  mr: 1.25,
                  width: 28,
                  height: 28,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            ) : (
              <Avatar
                src={brandmark}
                sx={{
                  mr: 1.25,
                  width: 28,
                  height: 28,
                  bgcolor: "transparent",
                  padding: 0.4,
                  border: `1px solid ${theme.palette.divider}`,
                  "& img": {
                    objectFit: "contain",
                  },
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
                sx={{ textAlign: "start", wordBreak: "break-word" }}
              >
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Show skeleton when dashboardLoading is true */}
        {dashboardLoading && (
          <Box sx={{ mb: 3, display: "flex", alignItems: "flex-start" }}>
            <Avatar
              src={brandmark}
              sx={{
                mr: 1.25,
                width: 28,
                height: 28,
                bgcolor: "transparent",
                padding: 0.4,
                "& img": {
                  objectFit: "contain",
                },
              }}
            />
            <Box sx={{ maxWidth: "85%" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  perplexigrid
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  wdith: "100%",
                }}
              >
                <Skeleton variant="text" width="220px" height={20} />
                <Skeleton variant="text" width="120px" height={20} />
              </Box>
            </Box>
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <ChatBox
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          disabledSend={loading}
          referencedWidget={referencedWidget || undefined}
          getWidget={getWidget}
        />
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpen={() => setChatOpen(true)}
        disableSwipeToOpen={false}
        swipeAreaWidth={56}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "95vh",
          },
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "5px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "2.5px",
            margin: "8px auto",
          }}
        />
        {renderChatContent()}
      </SwipeableDrawer>
    );
  }

  return renderChatContent();
};

export default ChatSidePanel;
