import { supabase } from "../../../supabase-client";

export interface Project {
  id: string;
  title: string;
  sources: number;
  widgets: number;
  updatedAt: string;
}

interface ProjectData {
  id: string;
  name: string;
  description?: string;
  sources: number;
  widgets: number;
  updated_At: string;
}

export const formatRelativeTime = (isoDate: string): string => {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = diff / (1000 * 60 * 60);
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  if (hours < 48) return `1 day ago`;
  return `${Math.floor(hours / 24)} days ago`;
};

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
      updated_At: new Date().toISOString(),
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
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

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