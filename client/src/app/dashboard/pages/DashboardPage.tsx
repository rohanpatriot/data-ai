import React, { useState } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
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
import { WidgetThemeProvider } from "../store/WidgetThemeContext";

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
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState("100%");

  const { refresh } = useDataSources(projectId!);
  // const { refresh: refreshDashboard } = useWidgets(projectId!);
  const dialogs = useDataSourceDialogs({ projectId: projectId!, refresh });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //refresh dashboard
  const refreshDash = () => {
    setDashboardLoading(true);

    // Temporarily change width by 5px to force layout recalculation

    // refresh().finally(() => {
    //   refreshDashboard().finally(() => {
    //     // Reset width after a brief delay
    //     setTimeout(() => {
    //       setContainerWidth("100%");
    //       setDashboardLoading(false);
    //     }, 50);
    //   });
    // });
    setContainerWidth("calc(99% + 1px)");
  };

  return (
    <WidgetThemeProvider project={currentProject}>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {chatOpen && !isMobile && (
          <ChatSidePanel
            setChatOpen={setChatOpen}
            user={user}
            chatOpen={chatOpen}
            projectId={projectId || undefined}
            setDashboardLoading={setDashboardLoading}
          />
        )}

        {isMobile && (
          <ChatSidePanel
            setChatOpen={setChatOpen}
            user={user}
            chatOpen={chatOpen}
            projectId={projectId || undefined}
            setDashboardLoading={setDashboardLoading}
          />
        )}

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <DashboardHeader
            loading={loading}
            projectId={projectId || ""}
            projectName={currentProject?.name}
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            setDSPanelOpen={setDSPanelOpen}
            exportMenuOpen={exportMenuOpen}
            setExportMenuOpen={setExportMenuOpen}
            shareMenuAnchor={shareMenuAnchor}
            setShareMenuAnchor={setShareMenuAnchor}
            setIsShareModalOpen={setIsShareModalOpen}
            refreshDash={refreshDash}
          />

          <Box
            sx={{ flexGrow: 1, padding: 0, overflowY: "auto" }}
            id="grid-container"
          >
            <Container maxWidth="xl" sx={{ padding: 0, width: containerWidth }}>
              <Box sx={{ p: 0 }}>
                <DashboardGrid dashboardLoading={dashboardLoading} />
              </Box>
            </Container>
          </Box>
        </Box>

        {/* Panels */}
        <DataSourcesSidePanel
          DSPanelOpen={DSPanelOpen}
          setDSPanelOpen={setDSPanelOpen}
          dashboardLoading={dashboardLoading}
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
          projectId={projectId || ""}
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      </Box>
    </WidgetThemeProvider>
  );
};

export default DashboardPage;
