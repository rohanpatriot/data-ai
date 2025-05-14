import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../../../shared/components/UserMenu";
import ExportMenu from "../../components/export/ExportMenu";
import ChatIcon from "../chat/ChatIcon";

interface DashboardHeaderProps {
  loading: boolean;
  projectName: string | undefined;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  setDSPanelOpen: (open: boolean) => void;
  exportMenuOpen: boolean;
  setExportMenuOpen: (open: boolean) => void;
  shareMenuAnchor: HTMLElement | null;
  setShareMenuAnchor: (anchor: HTMLElement | null) => void;
  setIsShareModalOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  loading,
  projectName,
  chatOpen,
  setChatOpen,
  setDSPanelOpen,
  exportMenuOpen,
  setExportMenuOpen,
  shareMenuAnchor,
  setShareMenuAnchor,
  setIsShareModalOpen,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid #eaeaea" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!chatOpen && (
            <IconButton onClick={() => setChatOpen(true)} sx={{ mr: 0.5 }}>
              <ChatIcon />
            </IconButton>
          )}

          <IconButton
            onClick={() => navigate("/projects")}
            sx={{ mr: 1, color: "black" }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h5">
            {loading ? (
              <Skeleton
                animation="wave"
                width={200}
                height={32}
                sx={{ bgcolor: "grey.100" }}
              />
            ) : (
              projectName
            )}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => setDSPanelOpen(true)}
          >
            Data sources
          </Button>

          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            onClick={(e) => {
              setShareMenuAnchor(e.currentTarget);
              setExportMenuOpen(true);
            }}
          >
            Export
          </Button>
          <ExportMenu
            setExportMenuOpen={setExportMenuOpen}
            exportMenuOpen={exportMenuOpen}
            shareMenuAnchor={shareMenuAnchor}
            setIsShareModalOpen={setIsShareModalOpen}
          />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
