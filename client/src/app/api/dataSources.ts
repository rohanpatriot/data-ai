// src/api/dataSources.ts

import { supabase } from "../../supabase-client";
import { DataSource } from "../../types/dataSource";
import { API } from "./api";

export const DataSourcesAPI = {
  async getAll(projectId: string): Promise<DataSource[]> {
    const { data, error } = await supabase
      .from("datasources")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data as DataSource[]) ?? [];
  },

  async createFile({
    file,
    name,
    projectId,
  }: {
    file: File;
    name?: string;
    projectId: string;
  }) {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) throw new Error("User not authenticated");

    const fileName = `${Date.now()}_${file.name}`;
    const path = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("files")
      .upload(path, file);

    if (uploadError) throw uploadError;

    await this.create({
      name: name || file.name,
      path,
      projectId,
      isLink: false,
    });
  },

  async createLink({
    url,
    name,
    projectId,
  }: {
    url: string;
    name: string;
    projectId: string;
  }) {
    await this.create({
      name: name || "Untitled",
      path: url,
      projectId,
      isLink: true,
    });
  },

  async create({
    name,
    path,
    projectId,
    isLink,
    addedByAi = false,
  }: {
    name: string;
    path: string;
    projectId: string;
    isLink: boolean;
    addedByAi?: boolean;
  }): Promise<void> {
    const newDataSource: Omit<DataSource, "id" | "created_at"> = {
      name,
      path,
      project_id: projectId,
      is_link: isLink,
      added_by_ai: addedByAi,
    };

    const { error } = await supabase.from("datasources").insert(newDataSource);
    if (error) throw error;

    // Update the project's data sources count
    try {
      await API.projects.incrementDataSourcesCount(projectId);
    } catch (countError) {
      console.error("Failed to update project data sources count:", countError);
      // Continue execution even if count update fails
    }
  },

  async delete(id: string): Promise<void> {
    // First get the data source to know which project to update
    const { data, error: fetchError } = await supabase
      .from("datasources")
      .select("project_id")
      .eq("id", id)
      .single();
    
    if (fetchError) throw fetchError;
    
    const projectId = data.project_id;
    
    // Delete the data source
    const { error } = await supabase.from("datasources").delete().eq("id", id);
    if (error) throw error;
    
    // Update the project's data sources count
    try {
      await API.projects.decrementDataSourcesCount(projectId);
    } catch (countError) {
      console.error("Failed to update project data sources count:", countError);
      // Continue execution even if count update fails
    }
  },

  async updateName(id: string, name: string): Promise<void> {
    const { error } = await supabase
      .from("datasources")
      .update({ name })
      .eq("id", id);

    if (error) throw error;
  },
};
