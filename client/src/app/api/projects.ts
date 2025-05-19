import { supabase } from "../../supabase-client";
import { Project } from "../../types/project";

export const ProjectsAPI = {
  async getAll(): Promise<Project[]> {
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, description, sources, widgets, updated_At")
      .eq("user_id", user_id)
      .order("updated_At", { ascending: false });

    if (error) throw error;
    return data as Project[];
  },

  async create(name: string, description: string): Promise<Project> {
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const newProject = {
      name: name || "Untitled Project",
      description: description || "",
      sources: 0,
      widgets: 0,
      user_id: user_id,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async update(
    id: string,
    name: string,
    description: string
  ): Promise<Project> {
    const { data, error } = await supabase
      .from("projects")
      .update({ name, description })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
  },
};
