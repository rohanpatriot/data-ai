import { Message } from "./message";

export interface History {
  id: string;
  messages?: Message[];
  responses?: Response[];
}
