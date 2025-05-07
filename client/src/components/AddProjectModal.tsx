import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name, description);
      setName("");
      setDescription("");
      onClose();
    }
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle
        variant="h4"
        sx={{ fontWeight: "bold", mb: 0.5, color: "#293133" }}
      >
        Add Project
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 1 }}>
            <Box
              component="label"
              sx={{
                fontWeight: "medium",
                fontSize: "1.1rem",
                mb: 1,
                display: "block",
                color: "#293133",
              }}
            >
              Name
            </Box>
            <TextField
              fullWidth
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
          <Box>
            <Box
              component="label"
              sx={{
                fontWeight: "medium",
                fontSize: "1.1rem",
                mb: 1,
                display: "block",
                color: "#293133",
              }}
            >
              Description
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", pt: 0.5 }}>
        <Button onClick={handleCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained" disabled={!name.trim()}>
          Add project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectModal;
