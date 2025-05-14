import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { supabase } from "../../../../supabase-client";
import { Card, CardActionArea } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
interface AddDataSourceProps {
  showAddDataSourceModal: boolean;
  setShowAddDataSourceModal: (show: boolean) => void;
  newDataSource: {
    name: string;
    type: string;
    sourceType: string;
  };
  setNewDataSource: (dataSource: {
    name: string;
    type: string;
    sourceType: string;
  }) => void;
  handleAddDataSource: () => void;
  projectId: string;
}

const AddDataSource: React.FC<AddDataSourceProps> = ({
  showAddDataSourceModal,
  setShowAddDataSourceModal,
  newDataSource,
  setNewDataSource,
  handleAddDataSource,
  projectId,
}) => {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      const fileType =
        e.target.files[0].name.split(".").pop()?.toUpperCase() || "";
      setNewDataSource({
        ...newDataSource,
        type: fileType,
      });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const resetForm = () => {
    setFile(null);
    setUrl("");
    setError("");
    setNewDataSource({
      name: "",
      type: "",
      sourceType: "File",
    });
  };

  const handleClose = () => {
    resetForm();
    setShowAddDataSourceModal(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Get current user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw userError;

      const userId = userData.user?.id;
      if (!userId) throw new Error("User not authenticated");

      let filePath = "";
      let isLink = false;

      if (newDataSource.sourceType === "File" && file) {
        // Upload file to Supabase storage
        const fileName = `${Date.now()}_${file.name}`;
        const storagePath = `${userId}/${fileName}`;

        const { data: _uploadData, error: uploadError } = await supabase.storage
          .from("files")
          .upload(storagePath, file);

        if (uploadError) throw uploadError;

        filePath = storagePath;
      } else if (newDataSource.sourceType === "Url" && url) {
        filePath = url;
        isLink = true;
      } else {
        throw new Error("Please provide a file or URL");
      }

      // Create data source record in database
      const { error: insertError } = await supabase.from("datasources").insert({
        name: newDataSource.name || (file ? file.name : "Untitled"),
        path: filePath,
        project_id: projectId,
        is_link: isLink,
      });

      if (insertError) throw insertError;

      // Success - close modal and refresh list
      handleAddDataSource();
      handleClose();
    } catch (err) {
      console.error("Error adding data source:", err);
      setError(
        err instanceof Error ? err.message : "Failed to add data source"
      );
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      const fileType =
        e.dataTransfer.files[0].name.split(".").pop()?.toUpperCase() || "";
      setNewDataSource({
        ...newDataSource,
        type: fileType,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Dialog
      open={showAddDataSourceModal}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Typography variant="h5" component="div">
          Add Data Source
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add a new data source by uploading a file or providing a URL
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Name
            </Typography>
            <TextField
              fullWidth
              name="name"
              placeholder="Name"
              value={newDataSource.name}
              onChange={(e) =>
                setNewDataSource({ ...newDataSource, name: e.target.value })
              }
              variant="outlined"
              size="small"
              required
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Type of Data Source
            </Typography>
            <ToggleButtonGroup
              fullWidth
              color="primary"
              size="small"
              value={newDataSource.sourceType}
              exclusive
              onChange={(_e, newValue) => {
                if (newValue) {
                  setNewDataSource({
                    ...newDataSource,
                    sourceType: newValue,
                  });
                }
              }}
              sx={{
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                padding: "0.325rem",
              }}
            >
              <ToggleButton
                sx={{ border: "none", borderRadius: 2 }}
                value="File"
              >
                File
              </ToggleButton>
              <ToggleButton
                sx={{ border: "none", borderRadius: 2 }}
                value="Url"
              >
                Url
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {newDataSource.sourceType === "File" ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                File
              </Typography>
              <Card
                variant="outlined"
                sx={{
                  border: "2px dashed #A224F0",
                  borderRadius: 2,
                  bgcolor: "#faf7fd",
                  textAlign: "center",
                  p: 3,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "#7b1fa2" },
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => {
                  // Trigger hidden file input on card click
                  document.getElementById("hidden-file-input")?.click();
                }}
              >
                <CardActionArea sx={{ p: 0 }}>
                  <AttachFileIcon
                    sx={{ fontSize: 40, color: "#A224F0", mb: 1 }}
                  />
                  <Typography variant="body1" sx={{ color: "#A224F0" }}>
                    Drag & drop your file here, or click to select
                  </Typography>
                  {file && (
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, display: "block" }}
                    >
                      Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </Typography>
                  )}
                  <input
                    id="hidden-file-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </CardActionArea>
              </Card>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                URL
              </Typography>
              <TextField
                fullWidth
                name="url"
                placeholder="Enter URL"
                value={url}
                onChange={handleUrlChange}
                variant="outlined"
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ mr: 2, width: 16, height: 16 }}>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z"
                            fill="#293133"
                          ></path>{" "}
                          <path
                            d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z"
                            fill="#293133"
                          ></path>{" "}
                          <path
                            d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z"
                            fill="#293133"
                          ></path>{" "}
                        </g>
                      </svg>
                    </Box>
                  ),
                }}
              />
            </Box>
          )}

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, justifyContent: "flex-end" }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            loading ||
            (newDataSource.sourceType === "File" && !file) ||
            (newDataSource.sourceType === "Url" && !url)
          }
        >
          {loading ? <CircularProgress size={24} /> : "Add Data Source"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataSource;
