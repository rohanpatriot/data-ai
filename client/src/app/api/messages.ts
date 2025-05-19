import { supabase } from "../../supabase-client";
import { Message } from "../../types/message";

export const MessageAPI = {
  /**
   * Get all messages for a specific project
   * @param projectId - The ID of the project
   * @returns Promise with an array of messages
   */
  async getAll(projectId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }

    return (data as Message[]) || [];
  },

  /**
   * Get a specific message by ID
   * @param messageId - The ID of the message to retrieve
   * @returns Promise with the message data
   */
  async getById(messageId: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .single();

    if (error) {
      console.error("Error fetching message:", error);
      throw error;
    }

    return data as Message;
  },

  /**
   * Create a new message
   * @param message - The message data to create
   * @returns Promise with the created message
   */
  async create(message: Omit<Message, "id" | "created_at">): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert([message])
      .select()
      .single();

    if (error) {
      console.error("Error creating message:", error);
      throw error;
    }

    return data as Message;
  },

  /**
   * Update an existing message
   * @param messageId - The ID of the message to update
   * @param updates - The message data to update
   * @returns Promise with the updated message
   */
  async update(
    messageId: string,
    updates: Partial<Omit<Message, "id" | "created_at">>
  ): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .update(updates)
      .eq("id", messageId)
      .select()
      .single();

    if (error) {
      console.error("Error updating message:", error);
      throw error;
    }

    return data as Message;
  },

  /**
   * Delete a message
   * @param messageId - The ID of the message to delete
   * @returns Promise with success status
   */
  async delete(messageId: string): Promise<void> {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  },

  /**
   * Get messages by conversation
   * @param conversationId - The ID of the conversation
   * @returns Promise with an array of messages
   */
  async getByConversation(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching conversation messages:", error);
      throw error;
    }

    return (data as Message[]) || [];
  },
};
