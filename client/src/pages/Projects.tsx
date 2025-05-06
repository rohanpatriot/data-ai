import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Skeleton,
  useTheme,
} from "@mui/material";
import Logo from "../components/Logo";
import UserMenu from "../components/UserMenu";
import AddProjectModal from "../components/AddProjectModal";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { supabase } from "../supabase-client";

interface Project {
  id: string;
  title: string;
  sources: number;
  widgets: number;
  updatedAt: string;
}

const Projects = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    const fetchProjects = async () => {
      const user_id = (await supabase.auth.getUser()).data.user?.id;
      const { data, error } = await supabase
        .from("projects")
        .select("id, name, sources, widgets, updated_At")
        .eq("user_id", user_id)
        .order("updated_At", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else if (data) {
        const formattedProjects = data.map((p) => ({
          id: p.id,
          title: p.name,
          sources: p.sources || 0,
          widgets: p.widgets || 0,
          updatedAt: formatRelativeTime(p.updated_At),
        }));
        setProjects(formattedProjects);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const formatRelativeTime = (isoDate: string) => {
    const diff = Date.now() - new Date(isoDate).getTime();
    const hours = diff / (1000 * 60 * 60);
    if (hours < 24) return `${Math.floor(hours)}h ago`;
    if (hours < 48) return `1 day ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  const handleAddProject = async (name: string, description: string) => {
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const newProject = {
      name: name || "Untitled Project",
      description: description || "No description provided",
      sources: 0,
      widgets: 0,
      user_id: user_id,
      updated_At: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();

    if (error) {
      console.error("Error inserting project:", error);
    } else if (data) {
      const formatted = {
        id: data.id,
        title: data.name,
        sources: data.sources,
        widgets: data.widgets,
        updatedAt: formatRelativeTime(data.updated_At),
      };
      setProjects((prev) => [formatted, ...prev]);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate("/dashboard?projectId=" + projectId);
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
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
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
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "normal", color: theme.palette.text.primary }}
            >
              Projects
            </Typography>
            <Button variant="contained" onClick={() => setOpenAddModal(true)}>
              Add a new project
            </Button>
          </Box>

          <Typography variant="body1">
            Select one of your projects here
          </Typography>

          <Box sx={{ mt: 4 }}>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    height={72}
                    animation="wave"
                    variant="rounded"
                    sx={{ mb: 1.25 }}
                  ></Skeleton>
                ))
              : projects.map((project) => (
                  <Paper
                    key={project.id}
                    elevation={0}
                    onClick={() => handleProjectClick(project.id)}
                    sx={{
                      p: 1,
                      pl: 2,
                      mb: 1.25,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {project.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="span"
                          sx={{
                            mr: 0.5,
                            display: "inline-flex",
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                              stroke={theme.palette.text.secondary}
                              strokeOpacity="0.77"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 3.5V6L7.5 7.5"
                              stroke={theme.palette.text.secondary}
                              strokeOpacity="0.77"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {project.updatedAt}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", mt: 0 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mr: 3 }}
                      >
                        <Box
                          component="span"
                          sx={{
                            mr: 0.5,
                            display: "inline-flex",
                          }}
                        >
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 2.75C0 1.6895 -2.98023e-08 1.159 0.3295 0.8295C0.659 0.5 1.1895 0.5 2.25 0.5C3.3105 0.5 3.841 0.5 4.1705 0.8295C4.5 1.159 4.5 1.6895 4.5 2.75C4.5 3.8105 4.5 4.341 4.1705 4.6705C3.841 5 3.3105 5 2.25 5C1.1895 5 0.659 5 0.3295 4.6705C-2.98023e-08 4.341 0 3.8105 0 2.75ZM5.5 8.25C5.5 7.1895 5.5 6.659 5.8295 6.3295C6.159 6 6.6895 6 7.75 6C8.8105 6 9.341 6 9.6705 6.3295C10 6.659 10 7.1895 10 8.25C10 9.3105 10 9.841 9.6705 10.1705C9.341 10.5 8.8105 10.5 7.75 10.5C6.6895 10.5 6.159 10.5 5.8295 10.1705C5.5 9.841 5.5 9.3105 5.5 8.25ZM0 8.25C0 7.1895 -2.98023e-08 6.659 0.3295 6.3295C0.659 6 1.1895 6 2.25 6C3.3105 6 3.841 6 4.1705 6.3295C4.5 6.659 4.5 7.1895 4.5 8.25C4.5 9.3105 4.5 9.841 4.1705 10.1705C3.841 10.5 3.3105 10.5 2.25 10.5C1.1895 10.5 0.659 10.5 0.3295 10.1705C-2.98023e-08 9.841 0 9.3105 0 8.25ZM5.5 2.75C5.5 1.6895 5.5 1.159 5.8295 0.8295C6.159 0.5 6.6895 0.5 7.75 0.5C8.8105 0.5 9.341 0.5 9.6705 0.8295C10 1.159 10 1.6895 10 2.75C10 3.8105 10 4.341 9.6705 4.6705C9.341 5 8.8105 5 7.75 5C6.6895 5 6.159 5 5.8295 4.6705C5.5 4.341 5.5 3.8105 5.5 2.75Z"
                              fill={theme.palette.text.secondary}
                              fillOpacity="0.77"
                            />
                          </svg>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {project.sources} sources
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="span"
                          sx={{
                            mr: 0.5,
                            display: "inline-flex",
                          }}
                        >
                          <svg
                            width="10"
                            height="11"
                            viewBox="0 0 8 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.01 4.00501C5.12533 4.00501 6.07067 3.83467 6.846 3.49401C7.62167 3.15367 8.0095 2.74051 8.0095 2.25451C8.0095 1.76851 7.62167 1.35534 6.846 1.01501C6.07033 0.674672 5.125 0.504672 4.01 0.505005C2.895 0.505339 1.94783 0.675339 1.1685 1.01501C0.389167 1.35467 -0.00033312 1.76801 2.13767e-07 2.25501C0.000333547 2.74201 0.389834 3.15501 1.1685 3.49401C1.94717 3.83301 2.89417 4.00317 4.0095 4.00451M4 4.77401C4.40567 4.77401 4.81833 4.74167 5.238 4.67701C5.65767 4.61267 6.052 4.51734 6.421 4.39101C6.79 4.26467 7.115 4.10817 7.396 3.92151C7.677 3.73484 7.8815 3.51901 8.0095 3.27401V4.75451C7.8815 4.99951 7.677 5.21534 7.396 5.40201C7.11533 5.58901 6.79033 5.74567 6.421 5.87201C6.052 5.99834 5.65767 6.09367 5.238 6.15801C4.81833 6.22234 4.40567 6.25451 4 6.25451C3.59433 6.25451 3.18167 6.22234 2.762 6.15801C2.34233 6.09367 1.9495 5.99834 1.5835 5.87201C1.2175 5.74567 0.894167 5.58901 0.6135 5.40201C0.332834 5.21501 0.128334 4.99934 2.13767e-07 4.75501V3.27401C0.128 3.51867 0.3325 3.73451 0.6135 3.92151C0.894167 4.10817 1.2175 4.26484 1.5835 4.39151C1.9495 4.51751 2.34233 4.61284 2.762 4.67751C3.18167 4.74217 3.59433 4.77434 4 4.77401ZM4 7.02401C4.40567 7.02401 4.81833 6.99184 5.238 6.92751C5.65733 6.86284 6.05167 6.76734 6.421 6.64101C6.79033 6.51467 7.11533 6.35817 7.396 6.17151C7.67667 5.98484 7.88117 5.76901 8.0095 5.52401V6.99501C7.8815 7.24001 7.677 7.45584 7.396 7.64251C7.11533 7.82917 6.79033 7.98584 6.421 8.11251C6.052 8.23884 5.65767 8.33417 5.238 8.39851C4.81833 8.46284 4.40567 8.49501 4 8.49501C3.59433 8.49501 3.18167 8.46284 2.762 8.39851C2.34233 8.33417 1.9495 8.23884 1.5835 8.11251C1.2175 7.98617 0.894167 7.82951 0.6135 7.64251C0.332834 7.45551 0.128334 7.23967 2.13767e-07 6.99501V5.52401C0.128334 5.76867 0.332834 5.98451 0.6135 6.17151C0.894167 6.35851 1.2175 6.51517 1.5835 6.64151C1.9495 6.76784 2.34233 6.86317 2.762 6.92751C3.18167 6.99184 3.59433 7.02401 4 7.02401Z"
                              fill={theme.palette.text.secondary}
                              fillOpacity="0.77"
                            />
                          </svg>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {project.widgets} widgets
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
          </Box>
        </Paper>
      </Container>

      <AddProjectModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddProject}
      />
    </motion.div>
  );
};

export default Projects;
