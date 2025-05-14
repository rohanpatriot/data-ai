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
  Project,
} from "../services/projectService";

const ProjectsPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
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
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard?projectId=${projectId}`);
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
    </motion.div>
  );
};

export default ProjectsPage;
