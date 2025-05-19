import { useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";

import { PageLayout } from "../components/layout/PageLayout";
import { ProjectsList } from "../components/ProjectsList";
import AddProjectModal from "../components/modals/AddProjectModal";
import EditProjectModal from "../components/modals/EditProjectModal";
import DeleteProjectModal from "../components/modals/DeleteProjectModal";

import { useProjects } from "../hooks/useProjects";
import { useProjectDialogs } from "../hooks/useProjectDialogs";
import theme from "../../../theme/theme";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { projects, setProjects, isLoading } = useProjects();
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
        projects={projects ?? []}
        isLoading={isLoading}
        onEdit={(projectId) => edit.set(projectId, projects || [])}
        onDelete={del.set}
        onClick={handleProjectClick}
      />

      <AddProjectModal
        open={add.isOpen}
        name={add.name}
        description={add.description}
        onChangeName={add.setName}
        onChangeDescription={add.setDescription}
        onClose={closeAddDialog}
        onConfirm={confirmAdd}
      />

      {edit.project && (
        <EditProjectModal
          open={!!edit.project}
          name={edit.name}
          description={edit.description}
          onChangeName={edit.updateName}
          onChangeDescription={edit.updateDescription}
          onClose={edit.reset}
          onConfirm={confirmEdit}
        />
      )}

      <DeleteProjectModal
        open={Boolean(del.id)}
        onClose={del.reset}
        onConfirm={confirmDelete}
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
