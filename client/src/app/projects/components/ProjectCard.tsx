import React from "react";
import { Box, Typography, Card, useTheme } from "@mui/material";
import {
  SourcesIcon,
  TimeIcon,
  WidgetsIcon,
} from "../../../shared/components/Icons";

interface ProjectCardProps {
  id: string;
  title: string;
  sources: number;
  widgets: number;
  updatedAt: string;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  sources,
  widgets,
  updatedAt,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      onClick={() => onClick(id)}
      sx={{
        p: 1,
        pl: 2,
        mb: 1.25,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="span"
            sx={{
              mr: 0.5,
              display: "inline-flex",
            }}
          >
            <TimeIcon />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {updatedAt}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          <Box
            component="span"
            sx={{
              mr: 0.5,
              display: "inline-flex",
            }}
          >
            <SourcesIcon />
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {sources} sources
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="span"
            sx={{
              mr: 0.5,
              display: "inline-flex",
            }}
          >
            <WidgetsIcon />
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {widgets} widgets
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCard;
