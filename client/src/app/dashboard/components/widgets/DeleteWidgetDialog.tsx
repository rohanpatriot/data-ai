import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { ResponsiveDialog } from "../../../../shared/components/ResponsiveDialog";

interface DeleteWidgetDialogProps {
  open: boolean;
  onDelete: () => Promise<void>;
  onClose: () => void;
}

const DeleteWidgetDialog: React.FC<DeleteWidgetDialogProps> = ({
  open,
  onDelete,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      onClose(); // Only close on success
    } catch (err) {
      console.error("Failed to delete widget:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      title="Delete Widget?"
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </>
      }
    >
      <Typography>
        Are you sure you want to delete this widget? This action cannot be
        undone.
      </Typography>
    </ResponsiveDialog>
  );
};

export default DeleteWidgetDialog;