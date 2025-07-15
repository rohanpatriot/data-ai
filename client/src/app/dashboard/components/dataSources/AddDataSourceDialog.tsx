import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useRef, useState } from "react";
import { useAutoFocusAndSelect } from "../../../../shared/components/useAutoFocusAndSelect";
import { BaseFormDialog } from "../../../../shared/components/BaseFormDialog";
import CustomTextField from "../../../../shared/components/CustomTextField";
import { useTheme } from "@mui/material/styles";

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
  const [urlError, setUrlError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const theme = useTheme();

  useAutoFocusAndSelect(nameInputRef, open);

  const validateUrl = (url: string): boolean => {
    try {
      // If URL doesn't start with http:// or https://, add https://
      let urlToValidate = url;
      if (!url.match(/^https?:\/\//i)) {
        urlToValidate = `https://${url}`;
      }

      const parsedUrl = new URL(urlToValidate);

      // Check if the hostname has at least one dot (e.g., example.com)
      // This prevents strings like "test" from being valid
      if (!parsedUrl.hostname.includes(".")) {
        throw new Error("Invalid hostname");
      }

      setUrlError(null);
      return true;
    } catch (e) {
      setUrlError("Please enter a valid URL");
      return false;
    }
  };

  const validateFileType = (file: File): boolean => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "csv") {
      setFileError("Only CSV files are allowed");
      return false;
    }
    setFileError(null);
    return true;
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      if (validateFileType(dropped)) {
        onChangeFile(dropped);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (validateFileType(selected)) {
        onChangeFile(selected);
      }
    }
  };

  const handleConfirm = async () => {
    if (!name.trim()) return;

    if (sourceType === "Url" && !validateUrl(url)) {
      return;
    }

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
        (sourceType === "File" && (!file || !!fileError)) ||
        (sourceType === "Url" && (!url.trim() || !!urlError))
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
          onChange={(_e, value) => {
            if (value) {
              onChangeSourceType(value);
              // Reset errors when switching source type
              setUrlError(null);
              setFileError(null);
            }
          }}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="File">File</ToggleButton>
          <ToggleButton value="Url">URL</ToggleButton>
        </ToggleButtonGroup>

        {sourceType === "File" ? (
          <>
            <Card
              variant="outlined"
              sx={{
                border: fileError ? "2px dashed #f44336" : `2px dashed ${theme.palette.primary.main}`,
                bgcolor: theme.palette.background.paper,
                p: 3,
                cursor: "pointer",
                textAlign: "center",
                mb: fileError ? 1 : 2,
              }}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDragDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <CardActionArea>
                <AttachFileIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography>
                  Drag & drop your CSV file here, or click to select
                </Typography>
                {file && (
                  <Typography variant="caption">
                    Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </Typography>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
              </CardActionArea>
            </Card>
            {fileError && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {fileError}
              </Typography>
            )}
          </>
        ) : (
          <CustomTextField
            label="URL"
            value={url}
            onChange={(e) => {
              onChangeUrl(e.target.value);
              if (urlError) {
                // Clear error when user starts typing again
                setUrlError(null);
              }
            }}
            onBlur={() => {
              if (url.trim()) {
                validateUrl(url);
              }
            }}
            error={!!urlError}
            helperText={urlError}
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
