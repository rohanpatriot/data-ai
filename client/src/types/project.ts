import { DataSource } from "./dataSource";
import { Widget } from "./widget";

// Frontend project representation
export interface Project {
  id: string;
  name: string;
  description?: string;
  sources: DataSource[];
  widgets: Widget[];
  updated_At: string;
}
