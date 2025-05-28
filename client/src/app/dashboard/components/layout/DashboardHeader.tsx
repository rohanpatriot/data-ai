import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ExportMenu from "../../components/export/ExportMenu";
import ChatIcon from "../chat/ChatIcon";
import databaseIcon from "@/assets/icons/db_icon.svg";
import exportIcon from "@/assets/icons/export_icon.svg";
import chatIconRound from "@/assets/icons/chat_icon_round.svg";
import DashboardThemeSelector from "./DashboardThemeSelector";
import { RefreshOutlined } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";

interface DashboardHeaderProps {
  loading: boolean;
  projectName: string | undefined;
  projectId: string | undefined;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  setDSPanelOpen: (open: boolean) => void;
  exportMenuOpen: boolean;
  setExportMenuOpen: (open: boolean) => void;
  shareMenuAnchor: HTMLElement | null;
  setShareMenuAnchor: (anchor: HTMLElement | null) => void;
  setIsShareModalOpen: (open: boolean) => void;
  refreshDash: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  loading,
  projectName,
  projectId,
  chatOpen,
  setChatOpen,
  setDSPanelOpen,
  exportMenuOpen,
  setExportMenuOpen,
  shareMenuAnchor,
  setShareMenuAnchor,
  setIsShareModalOpen,
  refreshDash,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 2 : 0,
          py: isMobile ? 2 : 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {!isMobile && !chatOpen && (
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
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: { xs: "275px", md: chatOpen ? "190px" : "320px" },
                fontSize: { xs: 20, md: 16 },
              }}
            >
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
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: isMobile ? "100%" : "auto",
          }}
        >
          {isMobile ? (
            <IconButton
              size="medium"
              onClick={() => setChatOpen(true)}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                color: `${theme.palette.text.primary}`,
                flexGrow: 1,
              }}
            >
              <img src={chatIconRound} alt="Chat Icon" width={20} height={20} />
              <Box ml={1} fontSize={16}>
                Chat
              </Box>
            </IconButton>
          ) : (
            []
          )}

          {isMobile ? (
            <IconButton
              size="medium"
              onClick={() => setDSPanelOpen(true)}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <img
                src={databaseIcon}
                alt="Database Icon"
                width={20}
                height={20}
              />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              fullWidth={isMobile}
              onClick={() => setDSPanelOpen(true)}
              sx={{
                height: 32,
              }}
              startIcon={
                <img
                  src={databaseIcon}
                  alt="Database Icon"
                  width={16}
                  height={16}
                />
              }
            >
              Data sources
            </Button>
          )}

          {isMobile ? (
            <IconButton
              size="medium"
              onClick={(e) => {
                setShareMenuAnchor(e.currentTarget);
                setExportMenuOpen(true);
              }}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <img src={exportIcon} alt="Export Icon" width={20} height={20} />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              fullWidth={isMobile}
              startIcon={<DownloadIcon />}
              onClick={(e) => {
                setShareMenuAnchor(e.currentTarget);
                setExportMenuOpen(true);
              }}
              sx={{
                height: 32,
              }}
            >
              Export
            </Button>
          )}

          <ExportMenu
            setExportMenuOpen={setExportMenuOpen}
            exportMenuOpen={exportMenuOpen}
            shareMenuAnchor={shareMenuAnchor}
            setIsShareModalOpen={setIsShareModalOpen}
            projectName={projectName ?? ""}
            projectId={projectId || ""}
          />

          <DashboardThemeSelector />
          <IconButton
            size="medium"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              height: 32,
              color: "black",
            }}
            onClick={refreshDash}
          >
            <RefreshOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
