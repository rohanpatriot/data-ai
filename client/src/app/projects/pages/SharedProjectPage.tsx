import React, { useState } from "react";
import { Box, Container, useTheme, Typography, CircularProgress, Button } from "@mui/material";
import { useParams } from "react-router-dom";

// Components
import DashboardGrid from "../../dashboard/components/layout/DashboardGrid";

// Hooks
import { useProjectShare } from "../../dashboard/hooks/useProjectShares";
import { useProjectData } from "../../dashboard/hooks/useProjectData";
import { useWidgets } from "../../dashboard/hooks/useWidgets";
import ExportMenu from "../../dashboard/components/export/ExportMenu";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import Logo from "../../../shared/components/Logo";

const SharedProject: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const theme = useTheme();

  const { sharedProjectId, loading: shareLoading, error: shareError } = useProjectShare(undefined, token);
  const { currentProject, loading: projectLoading, error: projectError } = useProjectData(sharedProjectId);
  const { widgets, loading: widgetsLoading, error: widgetsError } = useWidgets(sharedProjectId || undefined);

  const loading = shareLoading || projectLoading || widgetsLoading;
  const error = shareError || projectError || widgetsError;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [shareMenuAnchor, setShareMenuAnchor] = useState<HTMLElement | null>(
    null
  );

  console.log("SharedProject", {
    sharedProjectId,
    loading,
    error,
    currentProject,
    widgets,
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Typography variant="h5" color="error">Error loading project</Typography>
        <Typography variant="body1">{error.message}</Typography>
      </Box>
    );
  }

  if (!currentProject) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5">Project not found or invalid token.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", flexDirection: "column" }}>
      {/* Header for project name, no back button or chat */}
      <Box sx={{ padding: 2, borderBottom: '1px solid ' + theme.palette.divider,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
       }}>
        <Logo />
        <Typography variant="h5" component="h1">
          {currentProject.name}
        </Typography>
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
      </Box>
      {/* Subheader for description */}
      <Box sx={{ padding: 2, borderBottom: '1px solid'+ theme.palette.divider }}>
        <Typography variant="body1" color="text.secondary">
          {currentProject.description}
        </Typography>
      </Box>

      {/* Main Content - Dashboard Grid */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 0,
          overflowY: "auto",
          width: "100%",
          height: "calc(100vh - 64px)" // Adjust height based on header
        }}
        id="grid-container"
      >
        <Container maxWidth="xl" sx={{ padding: 0, width: "100%" }}>
          <Box sx={{ p: 0 }}>
            <DashboardGrid 
                    dashboardLoading={loading} 
                    readonly={true} 
                    projectId={sharedProjectId || ""}  
            />
          </Box>
          <ExportMenu
            exportOnly={true}
            setExportMenuOpen={setExportMenuOpen}
            exportMenuOpen={exportMenuOpen}
            shareMenuAnchor={shareMenuAnchor}
            setIsShareModalOpen={setIsShareModalOpen}
            projectName={currentProject.name ?? ""}
            projectId={currentProject.id || ""}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default SharedProject;