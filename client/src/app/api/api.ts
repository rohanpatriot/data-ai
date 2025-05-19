import { DataSourcesAPI } from "./dataSources.ts";
import { ProjectsAPI } from "./projects.ts";
import { WidgetsAPI } from "./widgets.ts";

export const API = {
  projects: ProjectsAPI,
  dataSources: DataSourcesAPI,
  widgets: WidgetsAPI,
};
