import React, { useState } from "react";
import { Box, Card, TextField, Typography } from "@mui/material";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import { CheckSharp } from "@mui/icons-material";
import DeleteDataSource from "./DeleteDataSource";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BackupIcon from "@mui/icons-material/Backup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface DataSourceCardProps {
  source: {
    id: string;
    name: string;
    addedAt: string;
    fileType: string;
    size: string;
  };
  handleDeleteDataSource: (id: string) => void;
  handleEditDataSource: (id: string, newName: string) => void;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({
  source,
  handleDeleteDataSource,
  handleEditDataSource,
}) => {
  const handleDelete = () => {
    setShowDeleteDialog(true);
  };
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(source.name);
  const handleSave = () => {
    setEditing(false);
    if (name !== source.name) {
      handleEditDataSource(source.id, name);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 0,
          mb: 1,
        }}
      >
        <ListItem>
          <ListItemText
            primary={
              editing ? (
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  autoFocus
                  size="small"
                  fullWidth
                  sx={{ width: "90%", height: "50%" }}
                />
              ) : (
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {source.name}
                </Typography>
              )
            }
            secondary={
              <Box
                sx={{ display: "flex", alignItems: "center", mt: 0.5, gap: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon sx={{ fontSize: "15px", marginRight: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Added {source.addedAt}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="span"
                    sx={{
                      mr: 0.5,
                      display: "flex",
                      alignItems: "center",
                      height: 12,
                      width: 12,
                    }}
                  >
                    <AttachFileIcon
                      sx={{ fontSize: "15px", marginRight: 0.5 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {source.fileType}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BackupIcon sx={{ fontSize: "15px", marginRight: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {source.size}
                  </Typography>
                </Box>
              </Box>
            }
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              onClick={editing ? handleSave : () => setEditing(true)}
              sx={{
                borderRadius: 2,
                border: "1px solid #E6EEF4",
                padding: 0.75,
              }}
            >
              {!editing ? (
                <EditIcon fontSize="small" sx={{ color: "black" }} />
              ) : (
                <CheckSharp fontSize="small" sx={{ color: "black" }} />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDelete()}
              sx={{
                borderRadius: 2,
                border: "1px solid #E6EEF4",
                padding: 0.75,
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </ListItem>
      </Card>
      <DeleteDataSource
        open={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onDelete={handleDeleteDataSource}
        dataSourceName={source.name}
      />
    </>
  );
};

export default DataSourceCard;
