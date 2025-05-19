import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BaseFormDialog } from "../../../../shared/components/BaseFormDialog";
import { useAutoFocusAndSelect } from "../../../../shared/components/useAutoFocusAndSelect";
import CustomTextField from "../../../../shared/components/CustomTextField";

interface Props {
  open: boolean;
  name: string;
  description: string;
  onChangeName: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const EditProjectModal = ({
  open,
  name,
  description,
  onChangeName,
  onChangeDescription,
  onClose,
  onConfirm,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useAutoFocusAndSelect(nameInputRef, open);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  const handleConfirm = async () => {
    if (!name.trim()) return;
    try {
      await onConfirm();
    } catch (e: any) {
      const message = e?.message || "";
      setError(
        message === "duplicate"
          ? "A project with this name already exists."
          : "Unexpected error. Please try again."
      );
    }
  };

  return (
    <BaseFormDialog
      open={open}
      title="Edit Project"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Save"
      confirmDisabled={!name.trim()}
    >
      <Box sx={{ mt: 2 }}>
        <CustomTextField
          inputRef={nameInputRef}
          label="Project Name"
          value={name}
          onChange={(e) => {
            onChangeName(e.target.value);
            if (error) setError(null);
          }}
          error={!!error}
          helperText={error || " "}
          sx={{ mb: 2 }}
        />
        <CustomTextField
          label="Description"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          multiline
          rows={3}
        />
      </Box>
    </BaseFormDialog>
  );
};

export default EditProjectModal;
