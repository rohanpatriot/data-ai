export interface Project {
  id: string;
  name: string;
  description?: string;
  sources_number: number;
  widgets_number: number;
  created_at: string;
  theme: string;
  shared_with?: string[];
}
