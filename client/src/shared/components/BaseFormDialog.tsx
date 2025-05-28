import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { ResponsiveDialog } from "./ResponsiveDialog";

interface BaseFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  confirmColor?: "primary" | "secondary" | "error";
  children: React.ReactNode;
}

export const BaseFormDialog = ({
  open,
  title,
  onClose,
  onConfirm,
  confirmLabel = "Conferma",
  confirmDisabled = false,
  confirmLoading = false,
  confirmColor = "primary",
  children,
}: BaseFormDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button onClick={onClose} color="secondary" disabled={confirmLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            disabled={confirmDisabled || confirmLoading}
            startIcon={
              confirmLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {children}
        <button type="submit" style={{ display: "none" }} />
      </form>
    </ResponsiveDialog>
  );
};
