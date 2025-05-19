import { DataSource } from "./dataSource";
import { Widget } from "./widget";

export interface Message {
  id: string;
  response: string;
  sourcesAdded?: DataSource[];
  widgets_changed?: Widget[];
  project_id: string;
  created_at: string;
}
