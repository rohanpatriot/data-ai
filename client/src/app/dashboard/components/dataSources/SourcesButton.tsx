import React from "react";
import { Button } from "@mui/material";
import SourcesIcon from "../chat/SourcesIcon";

interface SourcesButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const SourcesButton: React.FC<SourcesButtonProps> = ({
  onClick,
  disabled = true,
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    startIcon={<SourcesIcon />}
    sx={{
      color: "#555555",
      textTransform: "none",
      borderRadius: 2,
      fontWeight: 500,
      fontSize: "0.875rem",
      py: 0.5,
      px: 1.5,
      minWidth: "auto",
      "&:hover": {
        backgroundColor: "#f1f1f1",
      },
    }}
  >
    Sources
  </Button>
);

export default SourcesButton;
