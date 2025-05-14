// Database project data structure
export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  sources: number;
  widgets: number;
  updated_At: string;
  created_at?: string;
  user_id?: string;
}

// Frontend project representation
export interface Project {
  id: string;
  title: string;
  sources: number;
  widgets: number;
  updatedAt: string;
  description?: string;
}
