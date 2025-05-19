// src/api/dataSources.ts

import { formatRelativeTime } from "../../shared/utils/dateUtils";
import { supabase } from "../../supabase-client";

export interface DataSource {
  id: string;
  name: string;
  path: string;
  is_link: boolean;
  created_at: string;
}

export const DataSourcesAPI = {
  async getAll(projectId: string) {
    const { data, error } = await supabase
      .from("datasources")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map((source) => ({
      id: source.id,
      name: source.name,
      type: source.is_link
        ? "URL"
        : source.path.split(".").pop()?.toUpperCase() || "FILE",
      fileType: source.is_link
        ? "URL"
        : `${source.path.split(".").pop()?.toUpperCase() || "FILE"} file`,
      size: source.is_link ? "0" : "2.2 Kb", // temp
      addedAt: formatRelativeTime(source.created_at),
      path: source.path,
    }));
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
  }: {
    name: string;
    path: string;
    projectId: string;
    isLink: boolean;
  }) {
    const { error } = await supabase.from("datasources").insert({
      name,
      path,
      project_id: projectId,
      is_link: isLink,
    });

    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase.from("datasources").delete().eq("id", id);
    if (error) throw error;
  },

  async updateName(id: string, name: string) {
    const { error } = await supabase
      .from("datasources")
      .update({ name })
      .eq("id", id);

    if (error) throw error;
  },
};
