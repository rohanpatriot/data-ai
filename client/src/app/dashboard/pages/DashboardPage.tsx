import React, { useState } from "react";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";

// Components
import ChatSidePanel from "../components/chat/ChatSidePanel";
import AddDataSource from "../components/dataSources/AddDataSource";
import DataSourcesSidePanel from "../components/dataSources/DataSourcesSidePanel";
import ShareModal from "../components/share/ShareModal";
import DashboardHeader from "../components/layout/DashboardHeader";

// Hooks
import { useProjectData } from "../hooks/useProjectData";
import { useChatMessages } from "../hooks/useChatMessages";
import { useDataSources } from "../hooks/useDataSources";
import DashboardGrid from "../components/layout/DashboardGrid";

const DashboardPage: React.FC = () => {
  // URL params
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  // UI state
  const [chatOpen, setChatOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [shareMenuAnchor, setShareMenuAnchor] = useState<HTMLElement | null>(
    null
  );

  // Custom hooks
  const { currentProject, loading, user } = useProjectData(projectId);
  const { messages, newMessage, setNewMessage, handleSendMessage } =
    useChatMessages();
  const {
    dataSources,
    newDataSource,
    setNewDataSource,
    showAddDataSourceModal,
    setShowAddDataSourceModal,
    DSPanelOpen,
    setDSPanelOpen,
    handleAddDataSource,
  } = useDataSources();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <AnimatePresence>
          {/* Chat sidebar */}
          {chatOpen && (
            <motion.div
              key="chat-sidebar"
              initial={{ x: -330, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -330, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ChatSidePanel
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                setChatOpen={setChatOpen}
                user={user}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
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

          {/* Dashboard content */}
          <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }} id={'grid-container'}>
            <Container maxWidth="xl">
              <Box sx={{ mb: 3,  ml: 1 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {currentProject?.description || (
                    <Skeleton
                      animation="wave"
                      width={"100%"}
                      height={32}
                      sx={{ bgcolor: "grey.100" }}
                    />
                  )}
                </Typography>
              </Box>
              {/* Grid layout */}
              <DashboardGrid />
            </Container>
          </Box>
        </Box>

        {/* Side panels and modals */}
        <DataSourcesSidePanel
          setDSPanelOpen={setDSPanelOpen}
          DSPanelOpen={DSPanelOpen}
          dataSources={dataSources}
          setShowAddDataSourceModal={setShowAddDataSourceModal}
        />

        <AddDataSource
          showAddDataSourceModal={showAddDataSourceModal}
          setShowAddDataSourceModal={setShowAddDataSourceModal}
          newDataSource={newDataSource}
          setNewDataSource={setNewDataSource}
          handleAddDataSource={handleAddDataSource}
          projectId={projectId || ""}
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
