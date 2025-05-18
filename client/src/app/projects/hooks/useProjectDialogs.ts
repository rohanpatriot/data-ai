import { useRef, useState } from "react";
import { API } from "../../api/api";
import { Project } from "../../../types/project";

interface Props {
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;
}

export const useProjectDialogs = ({ setProjects }: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Add
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");

  // Edit
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Delete (just id)
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setAddName("");
    setAddDescription("");
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const confirmAdd = async () => {
    try {
      const newProject = await API.projects.create(addName, addDescription);
      setProjects((prev) => [newProject, ...(prev ?? [])]);
      setSnackbar({
        open: true,
        message: "Project added successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to add project",
        severity: "error",
      });
    } finally {
      closeAddDialog();
    }
  };

  const confirmEdit = async () => {
    if (!editProject) return;

    try {
      const updated = await API.projects.update(
        editProject.id,
        editName,
        editDescription
      );
      setProjects((prev) =>
        (prev ?? []).map((p) => (p.id === updated.id ? updated : p))
      );
      setSnackbar({
        open: true,
        message: "Project updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to update project",
        severity: "error",
      });
    } finally {
      setEditProject(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await API.projects.delete(deleteId);
      setProjects((prev) => (prev ?? []).filter((p) => p.id !== deleteId));
      setSnackbar({
        open: true,
        message: "Project deleted",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to delete project",
        severity: "error",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return {
    add: {
      isOpen: addDialogOpen,
      name: addName,
      description: addDescription,
      setName: setAddName,
      setDescription: setAddDescription,
    },
    edit: {
      project: editProject,
      name: editName,
      description: editDescription,
      updateName: setEditName,
      updateDescription: setEditDescription,
      set: (id: string, list: Project[]) => {
        const project = list.find((p) => p.id === id) || null;
        setEditProject(project);
        setEditName(project?.name ?? "");
        setEditDescription(project?.description ?? "");
      },
      reset: () => setEditProject(null),
    },
    del: {
      id: deleteId,
      set: setDeleteId,
      reset: () => setDeleteId(null),
    },
    triggerRef,
    openAddDialog,
    closeAddDialog,
    confirmAdd,
    confirmEdit,
    confirmDelete,
    snackbar,
    closeSnackbar,
  };
};
