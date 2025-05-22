import React from "react";
import { 
  Button, 
  CircularProgress, 
  Box
} from "@mui/material";
import { ResponsiveDialog } from "../../../../../shared/components/ResponsiveDialog";
import CustomTextField from "../../../../../shared/components/CustomTextField";

export interface EditWidgetDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  name: string;
  setName: (name: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const EditWidgetDialog: React.FC<EditWidgetDialogProps> = ({
  open,
  onClose,
  onSave,
  name,
  setName,
  loading = false,
  error = null
}) => {
  const handleSave = async () => {
    if (!name.trim()) return;
    await onSave();
  };

  return (
    <ResponsiveDialog
      open={open}
      title="Edit Widget"
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || !name.trim()}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </>
      }
    >
      <Box sx={{ mt: 2 }}>
        <CustomTextField
          label="Widget Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          showError={!!error}
          autoFocus
        />
        
        {/* Additional widget configuration fields can be added here */}
      </Box>
    </ResponsiveDialog>
  );
};

export default EditWidgetDialog;