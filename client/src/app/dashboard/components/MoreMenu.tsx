import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { supabase } from "../../../supabase-client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface MoreMenuProps {
  setIsShareModalOpen: (open: boolean) => void;
  setEditProjectModalOpen: () => void;
  moreMenuAnchor: null | HTMLElement;
  moreMenuOpen: boolean;
  setMoreMenuOpen: (open: boolean) => void;
  projectId?: string;
}

const MoreMenu: React.FC<MoreMenuProps> = ({
  setEditProjectModalOpen,
  moreMenuAnchor,
  moreMenuOpen,
  setMoreMenuOpen,
  projectId,
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleMoreMenuClose = () => {
    setMoreMenuOpen(false);
  };

  const handleEditProject = () => {
    setEditProjectModalOpen();
    handleMoreMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
    handleMoreMenuClose();
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!projectId) return;

    try {
      // Delete the project from Supabase
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      // Redirect to dashboard or refresh the page
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <>
      <Menu
        anchorEl={moreMenuAnchor}
        open={moreMenuOpen}
        onClose={() => setMoreMenuOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            width: "220px",
          },
        }}
      >
        <MenuItem onClick={handleEditProject} sx={{ gap: 2 }}>
          <EditIcon fontSize="small" />
          Edit Project
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          sx={{ gap: 2, color: "error.main" }}
        >
          <DeleteIcon fontSize="small" />
          Delete Project
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle id="alert-dialog-title">Delete Project?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MoreMenu;
