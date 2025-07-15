import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProjectModal from "./modals/DeleteProjectModal";

interface ProjectMoreMenuProps {
  projectId: string;
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

const ProjectMoreMenu: React.FC<ProjectMoreMenuProps> = ({
  projectId,
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleEditClick = () => {
    onEdit(projectId);
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete(projectId);
    onClose();
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleDeleteConfirm = async () => {
    onDelete(projectId);
    setDeleteConfirmOpen(false);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            width: "180px",
          },
        }}
      >
        <MenuItem onClick={handleEditClick} sx={{ gap: 2 }}>
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

      <DeleteProjectModal
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default ProjectMoreMenu;
