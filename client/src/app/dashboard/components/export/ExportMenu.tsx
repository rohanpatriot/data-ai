import React from "react";
import { Menu, MenuItem, Typography, Divider } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface ExportMenuProps {
  setExportMenuOpen: (open: boolean) => void;
  exportMenuOpen: boolean;
  shareMenuAnchor: HTMLElement | null;
  setIsShareModalOpen: (open: boolean) => void;
}

const ExportMenu: React.FC<ExportMenuProps> = ({
  setExportMenuOpen,
  exportMenuOpen,
  shareMenuAnchor,
  setIsShareModalOpen,
}) => {
  const handleExportMenuClose = () => {
    setExportMenuOpen(false);
  };

  const handleCopyLink = () => {
    handleExportMenuClose();
  };

  const handleInviteUsers = () => {
    setIsShareModalOpen(true);
    handleExportMenuClose();
  };

  const handleExport = (_format: string) => {
    handleExportMenuClose();
  };

  return (
    <Menu
      anchorEl={shareMenuAnchor}
      open={exportMenuOpen}
      onClose={() => setExportMenuOpen(false)}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "8px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          width: "220px",
        },
      }}
    >
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
      <MenuItem onClick={() => handleExport("JSON")} sx={{ gap: 2 }}>
        <FileDownloadIcon fontSize="small" />
        JSON Data
      </MenuItem>
    </Menu>
  );
};

export default ExportMenu;
