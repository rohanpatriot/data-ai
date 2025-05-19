import { DataSource } from "./dataSource";
import { Widget } from "./widget";

export interface Message {
  id: string;
  message: string;
  sources?: DataSource[];
  widgets_context?: Widget[];
  project_id: string;
  created_at: string;
}
