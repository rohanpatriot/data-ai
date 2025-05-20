import { supabase } from "../../supabase-client";
import { Project } from "../../types/project";

export const ProjectsAPI = {
  async getAll(): Promise<Project[]> {
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, name, description, sources_number, widgets_number, created_at"
      )
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Project[];
  },

  async create(name: string, description: string): Promise<Project> {
    const user_id = (await supabase.auth.getUser()).data.user?.id;
    const newProject = {
      name: name || "Untitled Project",
      description: description || "",
      user_id: user_id,
      sources_number: 0,
      widgets_number: 0,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();
    if (error) console.error(error);
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

  async updateDataSourcesCount(id: string, count: number): Promise<Project> {
    const { data, error } = await supabase
      .from("projects")
      .update({ sources_number: count })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async updateWidgetsCount(id: string, count: number): Promise<Project> {
    const { data, error } = await supabase
      .from("projects")
      .update({ widgets_number: count })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async incrementDataSourcesCount(id: string): Promise<Project> {
    // First get the current count
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("sources_number")
      .eq("id", id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Increment the count
    const newCount = (project.sources_number || 0) + 1;
    
    // Update the project
    const { data, error } = await supabase
      .from("projects")
      .update({ sources_number: newCount })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async incrementWidgetsCount(id: string): Promise<Project> {
    // First get the current count
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("widgets_number")
      .eq("id", id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Increment the count
    const newCount = (project.widgets_number || 0) + 1;
    
    // Update the project
    const { data, error } = await supabase
      .from("projects")
      .update({ widgets_number: newCount })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async decrementDataSourcesCount(id: string): Promise<Project> {
    // First get the current count
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("sources_number")
      .eq("id", id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Decrement the count, but don't go below 0
    const newCount = Math.max(0, (project.sources_number || 0) - 1);
    
    // Update the project
    const { data, error } = await supabase
      .from("projects")
      .update({ sources_number: newCount })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  async decrementWidgetsCount(id: string): Promise<Project> {
    // First get the current count
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("widgets_number")
      .eq("id", id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Decrement the count, but don't go below 0
    const newCount = Math.max(0, (project.widgets_number || 0) - 1);
    
    // Update the project
    const { data, error } = await supabase
      .from("projects")
      .update({ widgets_number: newCount })
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
