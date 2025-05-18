import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

  return (
    <Card variant="outlined" sx={{ mb: 2, px: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          {isEditing ? (
            <TextField
              size="small"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSave();
                if (e.key === "Escape") setIsEditing(false);
              }}
              fullWidth
            />
          ) : (
            <Typography fontWeight={500}>{source.name}</Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {source.fileType} • {source.size} • Added {source.addedAt}
          </Typography>
        </Box>

        {isEditing ? (
          <>
            <IconButton onClick={handleEditSave} disabled={loading}>
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)} disabled={loading}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={onDeleteClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSourceCard;
