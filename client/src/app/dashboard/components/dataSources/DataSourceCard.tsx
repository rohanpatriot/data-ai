import React, { useState } from "react";
import { Box, Card, TextField, Typography } from "@mui/material";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import { CheckSharp } from "@mui/icons-material";
import DeleteDataSource from "./DeleteDataSource";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BackupIcon from "@mui/icons-material/Backup";
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3077 2.9775C11.5453 2.73984 11.5453 2.34375 11.3077 2.11828L9.88172 0.692341C9.65625 0.454685 9.26016 0.454685 9.0225 0.692341L7.90125 1.8075L10.1864 4.09265M0.515625 9.19921V11.4844H2.80078L9.54047 4.73859L7.25531 2.45343L0.515625 9.19921Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <CheckSharp fontSize="small" />
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
              <svg
                width="16"
                height="18"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.08317 1.33333H7.0415L6.45817 0.75H3.5415L2.95817 1.33333H0.916504V2.5H9.08317M1.49984 10.0833C1.49984 10.3928 1.62275 10.6895 1.84155 10.9083C2.06034 11.1271 2.35708 11.25 2.6665 11.25H7.33317C7.64259 11.25 7.93934 11.1271 8.15813 10.9083C8.37692 10.6895 8.49984 10.3928 8.49984 10.0833V3.08333H1.49984V10.0833Z"
                  fill="black"
                />
              </svg>
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
