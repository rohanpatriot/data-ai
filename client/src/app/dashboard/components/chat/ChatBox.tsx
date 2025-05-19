import React from "react";
import { Box, TextField, Stack, Card, IconButton } from "@mui/material";
import SourcesButton from "../dataSources/SourcesButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

// Main component
interface ChatBoxProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  const handleSend = () => {
    if (newMessage.trim()) {
      setNewMessage("");
      handleSendMessage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card sx={{ p: 0.5 }}>
      <Stack spacing={1}>
        <TextField
          fullWidth
          placeholder="Message"
          variant="standard"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInputBase-root": {
              px: 1,
              py: 0,
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <SourcesButton />
          <IconButton color="default" onClick={handleSend}>
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Stack>
    </Card>
  );
};

export default ChatBox;
