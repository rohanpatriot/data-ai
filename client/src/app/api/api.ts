import { DataSourcesAPI } from "./dataSources.ts";
import { ProjectsAPI } from "./projects.ts";
import { WidgetsAPI } from "./widgets.ts";
import { ProjectSharesAPI } from "./projectShares.ts";

export const API = {
  projects: ProjectsAPI,
  dataSources: DataSourcesAPI,
  widgets: WidgetsAPI,
  projectShares: ProjectSharesAPI,
};
