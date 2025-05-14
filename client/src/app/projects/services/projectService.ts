import { supabase } from "../../../supabase-client";
import { Project, ProjectData } from "../../../types/project";
import { formatRelativeTime } from "../../../shared/utils/dateUtils";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, sources, widgets, updated_At")
      .eq("user_id", user_id)
      .order("updated_At", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return (data || []).map((p: ProjectData) => ({
      id: p.id,
      title: p.name,
      sources: p.sources || 0,
      widgets: p.widgets || 0,
      updatedAt: formatRelativeTime(p.updated_At),
    }));
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
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const newProject = {
      name: name || "Untitled Project",
      description: description || "No description provided",
      sources: 0,
      widgets: 0,
      user_id: user_id,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();

    if (error) {
      console.error("Error inserting project:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.name,
      sources: data.sources || 0,
      widgets: data.widgets || 0,
      updatedAt: formatRelativeTime(data.updated_At),
    };
  } catch (error) {
    console.error("Error in createProject:", error);
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
