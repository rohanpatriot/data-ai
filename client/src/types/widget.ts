export interface Widget {
  id: string;
  created_at: string;
  name: string;
  data: JSON;
  widget_type: string;
  customization_type: number;
  position: number;
  project_id: string;
}
