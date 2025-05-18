import { supabase } from "../../../supabase-client";
import { Project } from "../../../types/project";
import { API } from "../../api/api";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const projects = await API.projects.getAll();
    return projects;
  } catch (error) {
    console.error("Error in fetchProjects:", error);
    return [];
  }
};

export const createProject = async (
  name: string,
  description: string
): Promise<Project | null> => {
  try {
    const data = await API.projects.create(name, description);
    return data;
  } catch (error) {
    console.error("Error inserting project:", error);
    return null;
  }
};

export const updateProject = async (
  id: string,
  name: string,
  description: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("projects")
      .update({
        name,
        description,
        updated_At: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating project:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateProject:", error);
    return false;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteProject:", error);
    return false;
  }
};
