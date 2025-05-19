import React, { useState } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";

// Components
import ChatSidePanel from "../components/chat/ChatSidePanel";
import DataSourcesSidePanel from "../components/dataSources/DataSourcesSidePanel";
import ShareModal from "../components/share/ShareModal";
import DashboardHeader from "../components/layout/DashboardHeader";
import DashboardGrid from "../components/layout/DashboardGrid";

// Hooks
import { useProjectData } from "../hooks/useProjectData";
import { useDataSources } from "../hooks/useDataSources";
import { useDataSourceDialogs } from "../components/hooks/useDataSourceDialogs";
import AddDataSourceDialog from "../components/dataSources/AddDataSourceDialog";
import DeleteDataSourceDailog from "../components/dataSources/DeleteDataSourceDialog";

const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [chatOpen, setChatOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [shareMenuAnchor, setShareMenuAnchor] = useState<HTMLElement | null>(
    null
  );
  const [DSPanelOpen, setDSPanelOpen] = useState(false);

  const { currentProject, loading, user } = useProjectData(projectId);

  const { refresh } = useDataSources(projectId!);
  const dialogs = useDataSourceDialogs({ projectId: projectId!, refresh });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <AnimatePresence>
          {chatOpen && !isMobile && (
            <motion.div
              key="chat-sidebar"
              initial={{ x: -330, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -330, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ChatSidePanel
                setChatOpen={setChatOpen}
                user={user}
                chatOpen={chatOpen}
                projectId={projectId || undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isMobile && (
          <ChatSidePanel
            setChatOpen={setChatOpen}
            user={user}
            chatOpen={chatOpen}
            projectId={projectId || undefined}
          />
        )}

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <DashboardHeader
            loading={loading}
            projectName={currentProject?.name}
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            setDSPanelOpen={setDSPanelOpen}
            exportMenuOpen={exportMenuOpen}
            setExportMenuOpen={setExportMenuOpen}
            shareMenuAnchor={shareMenuAnchor}
            setShareMenuAnchor={setShareMenuAnchor}
            setIsShareModalOpen={setIsShareModalOpen}
          />

          <Box
            sx={{ flexGrow: 1, padding: 0, overflowY: "auto" }}
            id="grid-container"
          >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
              {/* <Box sx={{ mb: 3, ml: 1 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {currentProject?.description || (
                    <Skeleton
                      animation="wave"
                      width="100%"
                      height={32}
                      sx={{ bgcolor: "grey.100" }}
                    />
                  )}
                </Typography>
              </Box> */}
              <Box sx={{ p: 0 }}>
                <DashboardGrid />
              </Box>
            </Container>
          </Box>
        </Box>

        {/* Panels */}
        <DataSourcesSidePanel
          DSPanelOpen={DSPanelOpen}
          setDSPanelOpen={setDSPanelOpen}
        />

        {/* Dialogs */}
        <AddDataSourceDialog
          open={dialogs.add.isOpen}
          onClose={dialogs.add.close}
          onConfirm={dialogs.add.confirm}
          name={dialogs.add.name}
          onChangeName={dialogs.add.setName}
          file={dialogs.add.file}
          onChangeFile={dialogs.add.setFile}
          url={dialogs.add.url}
          onChangeUrl={dialogs.add.setUrl}
          sourceType={dialogs.add.sourceType}
          onChangeSourceType={dialogs.add.setSourceType}
          error={dialogs.add.error}
          loading={dialogs.add.loading}
        />

        <DeleteDataSourceDailog
          open={dialogs.del.isOpen}
          onClose={dialogs.del.close}
          onDelete={dialogs.del.confirm}
        />

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      </Box>
    </motion.div>
  );
};

export default DashboardPage;
