import { Button } from "@mui/material";
import { ResponsiveDialog } from "./ResponsiveDialog";

interface BaseFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  confirmDisabled?: boolean;
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
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            disabled={confirmDisabled}
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
