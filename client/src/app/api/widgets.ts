import { Widget } from "../../types/widget";
import { supabase } from "../../supabase-client";

export const WidgetsAPI = {
  /**
   * Get all widgets for a specific project
   * @param projectId - The ID of the project
   * @returns Promise with an array of widgets
   */
  getWidgetsByProject: async (projectId: string): Promise<Widget[]> => {
    const { data, error } = await supabase
      .from("widgets")
      .select("*")
      .eq("project_id", projectId)
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching widgets:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get a specific widget by ID
   * @param widgetId - The ID of the widget to retrieve
   * @returns Promise with the widget data
   */
  getWidgetById: async (widgetId: string): Promise<Widget | null> => {
    const { data, error } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", widgetId)
      .single();

    if (error) {
      console.error("Error fetching widget:", error);
      throw error;
    }

    return data;
  },

  /**
   * Create a new widget
   * @param widget - The widget data to create
   * @returns Promise with the created widget
   */
  createWidget: async (
    widget: Omit<Widget, "id" | "created_at">
  ): Promise<Widget> => {
    const { data, error } = await supabase
      .from("widgets")
      .insert([widget])
      .select()
      .single();

    if (error) {
      console.error("Error creating widget:", error);
      throw error;
    }

    return data;
  },

  /**
   * Update an existing widget
   * @param widgetId - The ID of the widget to update
   * @param updates - The widget data to update
   * @returns Promise with the updated widget
   */
  updateWidget: async (
    widgetId: string,
    updates: Partial<Omit<Widget, "id" | "created_at">>
  ): Promise<Widget> => {
    const { data, error } = await supabase
      .from("widgets")
      .update(updates)
      .eq("id", widgetId)
      .select()
      .single();

    if (error) {
      console.error("Error updating widget:", error);
      throw error;
    }

    return data;
  },

  /**
   * Delete a widget
   * @param widgetId - The ID of the widget to delete
   * @returns Promise with success status
   */
  deleteWidget: async (widgetId: string): Promise<void> => {
    const { error } = await supabase
      .from("widgets")
      .delete()
      .eq("id", widgetId);

    if (error) {
      console.error("Error deleting widget:", error);
      throw error;
    }
  },

  /**
   * Update the positions of multiple widgets
   * @param updates - Array of widget IDs and their new positions
   * @returns Promise with success status
   */
  updateWidgetPositions: async (
    updates: { id: string; position: number }[]
  ): Promise<void> => {
    // Using transaction to ensure all updates succeed or fail together
    const { error } = await supabase.rpc("update_widget_positions", {
      position_updates: updates,
    });

    if (error) {
      console.error("Error updating widget positions:", error);
      throw error;
    }
  },

  /**
   * Duplicate a widget
   * @param widgetId - The ID of the widget to duplicate
   * @returns Promise with the duplicated widget
   */
  duplicateWidget: async (widgetId: string): Promise<Widget> => {
    // First get the widget to duplicate
    const { data: widget, error: fetchError } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", widgetId)
      .single();

    if (fetchError) {
      console.error("Error fetching widget to duplicate:", fetchError);
      throw fetchError;
    }

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

    const { data, error } = await supabase
      .from("widgets")
      .insert([newWidget])
      .select()
      .single();

    if (error) {
      console.error("Error duplicating widget:", error);
      throw error;
    }

    return data;
  },
};
