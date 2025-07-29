export type DashboardMode = "f1" | "l1" | "r1" | "r2";

export interface DashboardRequestPayload {
  mode: DashboardMode;
  query: string;
  chatHistory?: unknown;
  structuredDataSource?: unknown;
  previousWidgetsJSON?: unknown;
  focusedWidgetsData?: unknown;
}

export type Role = "system" | "user";

export interface Message {
  role: Role;
  content: string;
}
