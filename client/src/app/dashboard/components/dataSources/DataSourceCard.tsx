import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  TextField,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import LanguageIcon from "@mui/icons-material/Language";
import { DataSource } from "../../../../types/dataSource";
import { formatRelativeTime } from "../../../../shared/utils/dateUtils";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
interface Props {
  source: DataSource;
  onDeleteClick: () => void;
  onEditConfirm: (id: string, newName: string) => Promise<void>;
}

const iconButtonSx = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
  p: 0.5,
  fontSize: "1rem",
  ml: 0.5,
};

const DataSourceCard: React.FC<Props> = ({
  source,
  onDeleteClick,
  onEditConfirm,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(source.name);
  const [loading, setLoading] = useState(false);

  const handleEditSave = async () => {
    if (!newName.trim() || newName === source.name) {
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      await onEditConfirm(source.id, newName.trim());
    } catch (err) {
      console.error("Error updating name:", err);
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };

  const getFileIcon = () => {
    // Assuming fileType is extracted from the path or determined elsewhere
    const fileType = source.path.split(".").pop()?.toLowerCase() || "";
    switch (fileType) {
      case "csv":
        return <DescriptionIcon fontSize="small" />;
      default:
        return <DescriptionIcon fontSize="small" />;
    }
  };

  const renderEditButtons = () => (
    <>
      <IconButton
        onClick={handleEditSave}
        disabled={loading}
        size="small"
        sx={iconButtonSx}
      >
        <CheckIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => setIsEditing(false)}
        disabled={loading}
        size="small"
        sx={iconButtonSx}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const renderActionButtons = () => (
    <>
      <IconButton
        onClick={() => setIsEditing(true)}
        size="small"
        sx={{ ...iconButtonSx, ml: 0 }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={onDeleteClick} size="small" sx={iconButtonSx}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );

  // Handle file download or link opening
  const handleSourceClick = () => {
    if (source.is_link) {
      // Open URL in new tab - ensure it has proper protocol
      let url = source.path;

      // Check if the URL has a protocol, if not add https://
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      // Use window.location.href for direct navigation instead of window.open
      window.location.href = url;
    } else {
      // For file download, create a download link
      const link = document.createElement("a");
      link.href = source.path;
      link.download = source.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getSourceIcon = () => {
    if (source.is_link) {
      return <LanguageIcon sx={{ fontSize: "18px" }} />;
    } else {
      return <DescriptionIcon sx={{ fontSize: "18px" }} />;
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          {isEditing ? (
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={loading}
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSave();
                if (e.key === "Escape") setIsEditing(false);
              }}
              fullWidth
              sx={{ ml: 1, mt: 0.5, mb: 0.5 }}
            />
          ) : (
            <Stack spacing={0.5}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  component="a"
                  href={
                    source.is_link
                      ? !/^https?:\/\//i.test(source.path)
                        ? `https://${source.path}`
                        : source.path
                      : undefined
                  }
                  target={source.is_link ? "_blank" : undefined}
                  rel={source.is_link ? "noopener noreferrer" : undefined}
                  onClick={source.is_link ? undefined : handleSourceClick}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "text.primary",
                  }}
                >
                  {source.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  {getSourceIcon()}
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {source.is_link ? "Web" : "File"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon sx={{ fontSize: "18px" }} />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    Added {formatRelativeTime(source.created_at)}
                  </Typography>
                </Box>
                <Box>
                  {source.added_by_ai && (
                    <Chip
                      label="Added by AI"
                      size="small"
                      color="primary"
                      icon={<AutoAwesomeIcon />}
                      sx={{
                        ml: 1,
                        bgcolor: "#f0e6ff",
                        color: "#A224F0",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        height: 24,
                        borderRadius: 2,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Stack>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isEditing ? renderEditButtons() : renderActionButtons()}
        </Box>
      </Box>
    </Card>
  );
};

export default DataSourceCard;
