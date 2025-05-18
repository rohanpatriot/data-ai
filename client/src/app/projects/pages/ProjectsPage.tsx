import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Skeleton,
  useTheme,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import Logo from "../../../shared/components/Logo";
import UserMenu from "../../../shared/components/UserMenu";
import AddProjectModal from "../components/AddProjectModal";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import ProjectCard from "../components/ProjectCard";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import EditProjectModal from "../components/EditProjectModal";
import { Project } from "../../../types/project";

const ProjectsPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleAddProject = async (name: string, description: string) => {
    const newProject = await createProject(name, description);
    if (newProject) {
      setProjects((prev) => [newProject, ...prev]);
      setSnackbar({
        open: true,
        message: "Project created successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to create project",
        severity: "error",
      });
    }
  };

  const handleEditProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject({
        id: project.id,
        title: project.title,
        description: project.description || '',
      });
      setOpenEditModal(true);
    }
  };

  const handleUpdateProject = async (name: string, description: string) => {
    if (!currentProject) return;

    const success = await updateProject(currentProject.id, name, description);
    if (success) {
      // Update the local state
      setProjects((prev) =>
        prev.map((p) =>
          p.id === currentProject.id ? { ...p, title: name } : p
        )
      );
      setSnackbar({
        open: true,
        message: "Project updated successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to update project",
        severity: "error",
      });
    }
    setOpenEditModal(false);
    setCurrentProject(null);
  };

  const handleDeleteProject = async (projectId: string) => {
    const success = await deleteProject(projectId);
    if (success) {
      // Remove the project from the local state
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setSnackbar({
        open: true,
        message: "Project deleted successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Failed to delete project",
        severity: "error",
      });
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard?projectId=${projectId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderProjectList = () => {
    if (loading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          height={72}
          animation="wave"
          variant="rounded"
          sx={{ mb: 1.25 }}
        />
      ));
    }

    if (projects.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No projects yet. Create your first project to get started.
          </Typography>
        </Box>
      );
    }

    return projects.map((project) => (
      <ProjectCard
        key={project.id}
        id={project.id}
        title={project.title}
        sources={project.sources}
        widgets={project.widgets}
        updatedAt={project.updatedAt}
        onClick={handleProjectClick}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
              <Logo />
              <UserMenu />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6, pb: 8 }}>
        <Card
          sx={{
            p: 4,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              Projects
            </Typography>
            <Button variant="contained" onClick={() => setOpenAddModal(true)}>
              Add a new project
            </Button>
          </Box>

          <Typography variant="body1">
            Select one of your projects here
          </Typography>

          <Box sx={{ mt: 4 }}>{renderProjectList()}</Box>
        </Card>
      </Container>

      <AddProjectModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddProject}
      />

      {currentProject && (
        <EditProjectModal
          isOpen={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setCurrentProject(null);
          }}
          projectName={currentProject.title}
          projectDescription={currentProject.description}
          onSave={handleUpdateProject}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default ProjectsPage;
