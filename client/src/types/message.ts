import { DataSource } from "./dataSource";
import { Widget } from "./widget";

export interface Message {
  id: string;
  response: string;
  sources: DataSource[];
  widgets: Widget[];
  project_id: string;
  created_at: string;
}
