import { Widget } from "../../types/widget";
import { supabase } from "../../supabase-client";
import { API } from "./api";

export const WidgetsAPI = {
  async getAll(projectId: string): Promise<Widget[]> {
    const { data, error } = await supabase
      .from("widgets")
      .select("*")
      .eq("project_id", projectId)
      .order("position", { ascending: true });

    if (error) throw error;

    return (data as Widget[]) ?? [];
  },

  async getById(widgetId: string): Promise<Widget | null> {
    const { data, error } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", widgetId)
      .single();

    if (error) throw error;

    return data as Widget;
  },

  async create(widget: Omit<Widget, "id" | "created_at">): Promise<Widget> {
    const { data, error } = await supabase
      .from("widgets")
      .insert([widget])
      .select()
      .single();

    if (error) throw error;

    // Update the project's widgets count
    try {
      await API.projects.incrementWidgetsCount(widget.project_id);
    } catch (countError) {
      console.error("Failed to update project widgets count:", countError);
      // Continue execution even if count update fails
    }

    return data as Widget;
  },

  async update(
    widgetId: string,
    updates: Partial<Omit<Widget, "id" | "created_at">>
  ): Promise<Widget> {
    const { data, error } = await supabase
      .from("widgets")
      .update(updates)
      .eq("id", widgetId)
      .select()
      .single();

    if (error) throw error;

    return data as Widget;
  },

  async delete(widgetId: string): Promise<void> {
    // First get the widget to know which project to update
    const { data, error: fetchError } = await supabase
      .from("widgets")
      .select("project_id")
      .eq("id", widgetId)
      .single();

    if (fetchError) throw fetchError;

    const projectId = data.project_id;

    // Delete the widget
    const { error } = await supabase.from("widgets").delete().eq("id", widgetId);
    if (error) throw error;

    // Update the project's widgets count
    try {
      await API.projects.decrementWidgetsCount(projectId);
    } catch (countError) {
      console.error("Failed to update project widgets count:", countError);
      // Continue execution even if count update fails
    }
  },

  async updatePositions(
    updates: { id: string; position: number }[]
  ): Promise<void> {
    // Using transaction to ensure all updates succeed or fail together
    const { error } = await supabase.rpc("update_widget_positions", {
      position_updates: updates,
    });

    if (error) throw error;
  },

  async duplicate(widgetId: string): Promise<Widget> {
    // First get the widget to duplicate
    const { data: widget, error: fetchError } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", widgetId)
      .single();

    if (fetchError) throw fetchError;

    if (!widget) {
      throw new Error("Widget not found");
    }

    // Create a new widget with the same data but a new name
    const newWidget = {
      ...widget,
      id: undefined,
      created_at: undefined,
      name: `${widget.name} (Copy)`,
    };

    return await this.create(newWidget);
  }
};
