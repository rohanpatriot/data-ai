import React, { ReactNode } from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon,
  action,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        border: "2px dashed",
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
        ...sx,
      }}
    >
      {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}
      <Typography variant="body1" color="text.secondary" align="center">
        {message}
      </Typography>
      {action && <Box sx={{ mt: 2 }}>{action}</Box>}
    </Box>
  );
};