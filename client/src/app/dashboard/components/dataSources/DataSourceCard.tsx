import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";

interface Props {
  source: {
    id: string;
    name: string;
    type: string;
    fileType: string;
    size: string;
    addedAt: string;
    path: string;
  };
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
    switch (source.fileType.toLowerCase()) {
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

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          minHeight: 72, // ✅ Consistent height
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
              <Typography variant="subtitle1" fontWeight={500}>
                {source.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.secondary",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  {getFileIcon()}
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {source.fileType} file
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    Added {source.addedAt}
                  </Typography>
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
