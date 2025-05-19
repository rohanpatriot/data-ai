import React, { useState } from "react";
import { Box, Typography, Card, useTheme, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  TimeIcon,
  SourcesIcon,
  WidgetsIcon,
} from "../../../shared/components/Icons";
import ProjectMoreMenu from "./ProjectMoreMenu";
import { formatRelativeTime } from "../../../shared/utils/dateUtils";

interface ProjectCardProps {
  id: string;
  title: string;
  sources: number;
  widgets: number;
  updatedAt: string;
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  sources,
  widgets,
  updatedAt,
  onClick,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const moreMenuOpen = Boolean(moreMenuAnchor);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent card click when clicking on the more button
    if (e.defaultPrevented) return;
    onClick(id);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent card click
    event.stopPropagation(); // Stop event propagation
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreMenuAnchor(null);
  };

  return (
    <>
      <Card
        elevation={0}
        onClick={handleCardClick}
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
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "80%",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}
          >
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
              {formatRelativeTime(updatedAt)}
            </Typography>
            <IconButton size="small" onClick={handleMoreClick} sx={{ ml: 1 }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
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

      <ProjectMoreMenu
        projectId={id}
        anchorEl={moreMenuAnchor}
        open={moreMenuOpen}
        onClose={handleMoreClose}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default ProjectCard;
