import { useRef, useState } from "react";
import { Project } from "../../../types/project";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

interface UseProjectDialogsProps {
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const useProjectDialogs = ({ setProjects }: UseProjectDialogsProps) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Add project state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  // Edit project state
  const [editingProject, setEditingProject] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);

  // Delete project state
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAdd = async () => {
    const newProject = await createProject(
      newProjectName,
      newProjectDescription
    );
    if (newProject) {
      setProjects((prev) => [newProject, ...prev]);
      setSnackbar({
        open: true,
        message: "Project created successfully",
        severity: "success",
      });
      setIsAddDialogOpen(false);
      setNewProjectName("");
      setNewProjectDescription("");
    } else {
      setSnackbar({
        open: true,
        message: "Failed to create project",
        severity: "error",
      });
    }
  };

  const handleEdit = async () => {
    if (!editingProject) return;

    const success = await updateProject(
      editingProject.id,
      editingProject.name,
      editingProject.description
    );

    if (success) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                name: editingProject.name,
                description: editingProject.description,
              }
            : p
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
    setEditingProject(null);
  };

  const handleDelete = async () => {
    if (!deleteProjectId) return;

    try {
      const success = await deleteProject(deleteProjectId);

      if (success) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteProjectId));
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
    } catch (error) {
      console.error("Error deleting project:", error);
      setSnackbar({
        open: true,
        message: "An error occurred while deleting the project",
        severity: "error",
      });
    } finally {
      setDeleteProjectId(null);
    }
  };

  return {
    triggerRef,
    add: {
      isOpen: isAddDialogOpen,
      name: newProjectName,
      description: newProjectDescription,
      setName: setNewProjectName,
      setDescription: setNewProjectDescription,
    },
    edit: {
      project: editingProject,
      set: (projectId: string, projects: Project[]) => {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          setEditingProject({
            id: project.id,
            name: project.name,
            description: project.description || "",
          });
        }
      },
      updateName: (name: string) =>
        setEditingProject((prev) => (prev ? { ...prev, name } : null)),
      updateDescription: (description: string) =>
        setEditingProject((prev) => (prev ? { ...prev, description } : null)),
      reset: () => setEditingProject(null),
    },
    del: {
      id: deleteProjectId,
      set: setDeleteProjectId,
      reset: () => setDeleteProjectId(null),
    },
    snackbar,
    openAddDialog: () => setIsAddDialogOpen(true),
    closeAddDialog: () => {
      setIsAddDialogOpen(false);
      setNewProjectName("");
      setNewProjectDescription("");
    },
    confirmAdd: handleAdd,
    confirmEdit: handleEdit,
    confirmDelete: handleDelete,
    closeSnackbar: () => setSnackbar((prev) => ({ ...prev, open: false })),
  };
};
