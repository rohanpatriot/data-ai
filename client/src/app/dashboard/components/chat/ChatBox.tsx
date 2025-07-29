import React, { KeyboardEvent } from "react";
import { Box, TextField, IconButton, Chip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatBoxProps {
  value: string;
  onChange: (message: string) => void;
  onSend: (message: string) => void;
  disabledSend: boolean;
  referencedWidget?: {
    id: string;
  };
  getWidget?: (id: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ 
  value, 
  onChange, 
  onSend, 
  disabledSend,
  referencedWidget,
  getWidget,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
      onChange("");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {referencedWidget && (
        <Box sx={{ px: 1 }}>
          <Chip
            label={getWidget ? `${getWidget(referencedWidget.id)}` : ''}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "end" }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          disabled={disabledSend}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          multiline
          minRows={1}
          maxRows={10}
        />
        <IconButton
          color="primary"
          onClick={() => {
            onSend(value);
            onChange(""); 
          }}          
          disabled={!value.trim() || disabledSend}
          sx={{ ml: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBox;
