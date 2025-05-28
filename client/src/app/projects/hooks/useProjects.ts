import { useEffect, useState } from "react";
import { Project } from "../../../types/project";
import { API } from "../../api/api";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await API.projects.getAll();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getSharedWith = async (id: string) => {
    try {
      const data = await API.projects.getSharedWith(id);
      return data;
    } catch (error) {
      console.error("Failed to fetch shared with:", error);
      return [];
    }
  };

  const updateSharedWith = async (id: string, sharedWith: string[]) => {
    try {
      const data = await API.projects.updateSharedWith(id, sharedWith);
      return data;
    } catch (error) {
      console.error("Failed to update shared with:", error);
    }
  };

  return {
    getSharedWith,
    updateSharedWith,
    projects,
    setProjects,
    isLoading,
  };
};
