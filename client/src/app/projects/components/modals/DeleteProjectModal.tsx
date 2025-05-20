import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { ResponsiveDialog } from "../../../../shared/components/ResponsiveDialog";

interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteProjectModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setIsDeleting(false);
      const timer = setTimeout(() => {
        confirmRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose(); // << Force close here
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      title="Delete Project?"
      actions={
        <>
          <Button onClick={onClose} color="secondary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            ref={confirmRef}
            variant="contained"
            color="error"
            onClick={handleConfirm}
            disabled={isDeleting}
            startIcon={
              isDeleting ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </>
      }
    >
      Are you sure you want to delete this project? This action cannot be
      undone.
    </ResponsiveDialog>
  );
};

export default DeleteProjectModal;
