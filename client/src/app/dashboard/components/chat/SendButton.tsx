import React from "react";
import { IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => (
  <IconButton color="default" onClick={onClick}>
    <SendRoundedIcon />
  </IconButton>
);

export default SendButton;
