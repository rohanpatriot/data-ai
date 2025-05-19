import React, { KeyboardEvent } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatBoxProps {
  value: string;
  onChange: (message: string) => void;
  onSend: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ value, onChange, onSend }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        placeholder="Type a message..."
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={onSend}
        disabled={!value.trim()}
        sx={{ ml: 1 }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBox;
