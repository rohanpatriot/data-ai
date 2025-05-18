import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, Button, useMediaQuery } from "@mui/material";
import { PageLayout } from "../components/layout/PageLayout";
import { useProjects } from "../hooks/useProjects";
import EditProjectModal from "../components/modals/EditProjectModal";
import AddProjectModal from "../components/modals/AddProjectModal";
import { useProjectDialogs } from "../hooks/useProjectDialogs";
import { ProjectsList } from "../components/ProjectsList";
import { Add } from "@mui/icons-material";
import DeleteProjectModal from "../components/modals/DeleteProjectModal";

const ProjectsPage = () => {
  const { projects, setProjects, isLoading } = useProjects();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("md");
  const {
    add,
    edit,
    del,
    snackbar,
    triggerRef,
    openAddDialog,
    closeAddDialog,
    confirmAdd,
    confirmEdit,
    confirmDelete,
    closeSnackbar,
  } = useProjectDialogs({ setProjects });

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard?projectId=${projectId}`);
  };

  return (
    <PageLayout
      title="Projects"
      subtitle="Select one of your projects here"
      actions={
        <Button
          ref={triggerRef}
          variant="contained"
          onClick={openAddDialog}
          startIcon={<Add />}
        >
          {isMobile ? "Add" : "Add a new project"}
        </Button>
      }
    >
      <ProjectsList
        projects={projects}
        isLoading={isLoading}
        onEdit={(projectId) => edit.set(projectId, projects)}
        onDelete={del.set}
        onClick={handleProjectClick}
      />

      <AddProjectModal
        open={add.isOpen}
        onClose={closeAddDialog}
        onAdd={confirmAdd}
      />

      {edit.project && (
        <EditProjectModal
          isOpen={edit.project !== null}
          onClose={edit.reset}
          projectName={edit.project.name}
          projectDescription={edit.project.description}
          onSave={confirmEdit}
        />
      )}

      <DeleteProjectModal
        open={!!del.id}
        onClose={del.reset}
        onConfirm={confirmDelete}
        projectName={projects.find((p) => p.id === del.id)?.name}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
};

export default ProjectsPage;
