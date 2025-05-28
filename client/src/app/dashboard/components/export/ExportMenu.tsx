import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportFormat, exportGrid } from "./util/exportGridUtil";
import { useProjectShare } from "../../hooks/useProjectShares";

interface ExportMenuProps {
  setExportMenuOpen: (open: boolean) => void;
  exportMenuOpen: boolean;
  shareMenuAnchor: HTMLElement | null;
  setIsShareModalOpen: (open: boolean) => void;
  projectName: string;
  projectId: string;
  exportOnly?: boolean;
}

const ExportMenu: React.FC<ExportMenuProps> = ({
  setExportMenuOpen,
  exportMenuOpen,
  shareMenuAnchor,
  setIsShareModalOpen,
  projectName,
  projectId,
  exportOnly = false,
}) => {
  const handleExportMenuClose = () => {
    setExportMenuOpen(false);
  };

  const { createShareLink } = useProjectShare(projectId);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCopyLink = async () => {
    const url = await createShareLink();
    if (url === null) {
      showSnackbar("Failed to create share link", "error");
      return;
    }
    navigator.clipboard.writeText(url);
    showSnackbar("Board link has been copied to clipboard", "info");
    handleExportMenuClose();
  };

  const handleInviteUsers = () => {
    setIsShareModalOpen(true);
    handleExportMenuClose();
  };

  const handleExport = (_format: string) => {
    exportGrid(_format as ExportFormat, projectName);
    handleExportMenuClose();
  };

  return (
    <>
    <Menu
      anchorEl={shareMenuAnchor}
      open={exportMenuOpen}
      onClose={() => setExportMenuOpen(false)}
      elevation={1}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "8px",
          width: "220px",
        },
      }}
    >
      {!exportOnly && (
        <>
          <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
            Share Options
          </Typography>
          <MenuItem onClick={handleCopyLink} sx={{ gap: 2 }}>
            <ContentCopyIcon fontSize="small" />
            Copy link
          </MenuItem>
          <MenuItem onClick={handleInviteUsers} sx={{ gap: 2 }}>
            <PersonAddIcon fontSize="small" />
            Invite users
          </MenuItem>
          <Divider />
        </>
      )}
      <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
        Export As
      </Typography>

      <MenuItem onClick={() => handleExport("PNG")} sx={{ gap: 2 }}>
        <ImageIcon fontSize="small" />
        PNG Image
      </MenuItem>
      <MenuItem onClick={() => handleExport("PDF")} sx={{ gap: 2 }}>
        <PictureAsPdfIcon fontSize="small" />
        PDF Document
      </MenuItem>
      <MenuItem onClick={() => handleExport("JSON")} sx={{ gap: 2 }} disabled>
        <FileDownloadIcon fontSize="small" />
        JSON Data
      </MenuItem>
    </Menu>

    <Snackbar
    open={snackbar.open}
    autoHideDuration={4000}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
    <Alert
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      severity={snackbar.severity}
      variant="standard"
      sx={{ width: "100%" }}
    >
      {snackbar.message}
    </Alert>
    </Snackbar>

  </>
  );
};

export default ExportMenu;
