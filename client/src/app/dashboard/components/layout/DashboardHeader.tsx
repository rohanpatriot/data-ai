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
import UserMenu from "../../../../shared/components/UserMenu";
import ExportMenu from "../../components/export/ExportMenu";
import ChatIcon from "../chat/ChatIcon";
import databaseIcon from "@/assets/icons/db_icon.svg";
import tripleDotIcon from "@/assets/icons/triple_dot_icon.svg";
import exportIcon from "@/assets/icons/export_icon.svg";
import chatIconRound from "@/assets/icons/chat_icon_round.svg";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
    >
      <Toolbar 
        sx={{ 
          justifyContent: "space-between",
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0,
          py: isMobile ? 2 : 1,
        }}
      >
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          width: isMobile ? '100%' : 'auto',
        }}>
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

          <Typography variant="h5" sx={{ 
            flexGrow: 1,
          }}>
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

          {isMobile ? 
          <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
            }}>
              <UserMenu />
            </Box> : []
          }
        </Box>

        <Box sx={{ 
          display: "flex", 
          gap: 1,
          width: isMobile ? '100%' : 'auto',
        }}>

          {isMobile?
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
              <img src={chatIconRound} alt="Chat Icon" width={24} height={24} /> 
              <Box ml={1} fontSize={16}>
                Chat
              </Box>
            </IconButton>
            :
            []
          }

          {isMobile ? 
            <IconButton
              size="medium"
              onClick={() => setDSPanelOpen(true)}
              sx={{border: `1px solid ${theme.palette.divider}`, borderRadius: 3}}
            >
              <img src={databaseIcon} alt="Database Icon" width={24} height={24} />
            </IconButton>
            : 
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              fullWidth={isMobile}
              onClick={() => setDSPanelOpen(true)}
            >
              Data sources
            </Button>
          }

          {isMobile ? 
            <IconButton
              size="medium"
              onClick={(e) => {
                setShareMenuAnchor(e.currentTarget);
                setExportMenuOpen(true);
              }}
              sx={{border: `1px solid ${theme.palette.divider}`, borderRadius: 3}}
            >
              <img src={exportIcon} alt="Export Icon" width={24} height={24} />
            </IconButton>
            : 
            <Button
              variant="outlined"
              size="medium"
              color="secondary"
              fullWidth={isMobile}
              onClick={(e) => {
                setShareMenuAnchor(e.currentTarget);
                setExportMenuOpen(true);
              }}
            >
              Export
            </Button>
          }
          {isMobile?
            <IconButton
              size="medium"
              onClick={() => {}}
              sx={{border: `1px solid ${theme.palette.divider}`, borderRadius: 3}}
            >
              <img src={tripleDotIcon} alt="Triple Dot Icon" width={24} height={24} />
            </IconButton> : []
          }
          <ExportMenu
            setExportMenuOpen={setExportMenuOpen}
            exportMenuOpen={exportMenuOpen}
            shareMenuAnchor={shareMenuAnchor}
            setIsShareModalOpen={setIsShareModalOpen}
          />
          {
            !isMobile ? <Box sx={{ 
              width: isMobile ? '100%' : 'auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <UserMenu />
            </Box> : []
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
