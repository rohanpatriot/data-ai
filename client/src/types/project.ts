// Frontend project representation
export interface Project {
  id: string;
  name: string;
  description?: string;
  sources: number;
  widgets: number;
  updated_At: string;
}
