import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useRef } from "react";
import { useAutoFocusAndSelect } from "../../../../shared/components/useAutoFocusAndSelect";
import { BaseFormDialog } from "../../../../shared/components/BaseFormDialog";
import CustomTextField from "../../../../shared/components/CustomTextField";

interface Props {
  open: boolean;
  name: string;
  sourceType: "File" | "Url";
  url: string;
  file: File | null;
  loading: boolean;
  error: string | null;
  onChangeName: (value: string) => void;
  onChangeUrl: (value: string) => void;
  onChangeFile: (file: File) => void;
  onChangeSourceType: (type: "File" | "Url") => void;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const AddDataSourceDialog = ({
  open,
  name,
  sourceType,
  url,
  file,
  loading,
  error,
  onChangeName,
  onChangeUrl,
  onChangeFile,
  onChangeSourceType,
  onClose,
  onConfirm,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useAutoFocusAndSelect(nameInputRef, open);

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      onChangeFile(dropped);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onChangeFile(selected);
    }
  };

  const handleConfirm = async () => {
    if (!name.trim()) return;
    await onConfirm();
  };

  return (
    <BaseFormDialog
      open={open}
      title="Add Data Source"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Add"
      confirmDisabled={
        loading ||
        !name.trim() ||
        (sourceType === "File" && !file) ||
        (sourceType === "Url" && !url.trim())
      }
    >
      <Box sx={{ mt: 2 }}>
        <CustomTextField
          inputRef={nameInputRef}
          label="Name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={sourceType}
          exclusive
          onChange={(_e, value) => value && onChangeSourceType(value)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="File">File</ToggleButton>
          <ToggleButton value="Url">URL</ToggleButton>
        </ToggleButtonGroup>

        {sourceType === "File" ? (
          <Card
            variant="outlined"
            sx={{
              border: "2px dashed #A224F0",
              bgcolor: "#faf7fd",
              p: 3,
              cursor: "pointer",
              textAlign: "center",
              mb: 2,
            }}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDragDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <CardActionArea>
              <AttachFileIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>
                Drag & drop your file here, or click to select
              </Typography>
              {file && (
                <Typography variant="caption">
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </Typography>
              )}
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </CardActionArea>
          </Card>
        ) : (
          <CustomTextField
            label="URL"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
    </BaseFormDialog>
  );
};

export default AddDataSourceDialog;
