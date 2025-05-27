// src/api/projectShares.ts
import { supabase } from "../../supabase-client";
import { nanoid } from "nanoid";

export const ProjectSharesAPI = {
  async create(projectId: string): Promise<string> {
    // Optional: Check if share already exists
    const { data: existing, error: existingError } = await supabase
      .from("project_shares")
      .select("share_token")
      .eq("project_id", projectId)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) return existing.share_token;

    const share_token = nanoid(12);

    const { data, error } = await supabase
      .from("project_shares")
      .insert([{ project_id: projectId, share_token, permission: "view" }])
      .select("share_token")
      .single();

    if (error) throw error;

    return data.share_token;
  },

  async getProjectIdFromToken(token: string): Promise<string | null> {
    const { data, error } = await supabase
      .from("project_shares")
      .select("project_id")
      .eq("share_token", token)
      .single();

    if (error) {
      console.error("Invalid or expired token:", error);
      return null;
    }

    return data.project_id;
  },

  async revoke(projectId: string): Promise<void> {
    const { error } = await supabase
      .from("project_shares")
      .delete()
      .eq("project_id", projectId);

    if (error) throw error;
  },
};
