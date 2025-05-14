import React from "react";
import { IconButton, Box } from "@mui/material";
import SendIcon from "./SendIcon";

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => (
  <IconButton
    color="primary"
    onClick={onClick}
    sx={{
      bgcolor: "#ecf5fe",
      "&:hover": {
        bgcolor: "#d9edfd",
      },
      width: 36,
      height: 36,
    }}
  >
    <Box component="span" sx={{ width: 16, height: 16, display: "flex" }}>
      <SendIcon />
    </Box>
  </IconButton>
);

export default SendButton;
