import React from "react";
import { Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";
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

const AddProjectModal = ({
  open,
  name,
  description,
  onChangeName,
  onChangeDescription,
  onClose,
  onConfirm,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  useAutoFocusAndSelect(nameInputRef, open);

  useEffect(() => {
    if (open) {
      setError(null);
      setIsAdding(false);
    }
  }, [open]);

  const handleConfirm = async () => {
    if (!name.trim() || isAdding) return;
    
    setIsAdding(true);
    try {
      await onConfirm();
    } catch (e: any) {
      const message = e?.message || "";
      setError(
        message === "duplicate"
          ? "A project with this name already exists."
          : "Unexpected error. Please try again."
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      descInputRef.current?.focus();
    }
  };

  return (
    <BaseFormDialog
      open={open}
      title="Add Project"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Add"
      confirmDisabled={!name.trim() || isAdding}
      confirmLoading={isAdding}
    >
      <Box>
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
          onKeyDown={handleNameKeyDown}
          disabled={isAdding}
        />
        <CustomTextField
          inputRef={descInputRef}
          label="Description"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          multiline
          rows={3}
          disabled={isAdding}
        />
      </Box>
    </BaseFormDialog>
  );
};

export default AddProjectModal;
