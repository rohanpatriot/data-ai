
export interface BubbleData {
  id: string;
  position: {
    x: number;
    y: number;
  };
  message: string;
  response: string | null;
  responseType: 'loading' | 'text' | 'chart' | 'error' | null;
  chartData?: any;
  chartType?: 'bar' | 'pie' | 'line' | 'bubble' | 'scatter';
  isMinimized: boolean;
  width: number;
  height: number;
  lastUpdated: number;
  createdBy?: string;
}

export interface SharedUser {
  email: string;
  joinedAt: number;
  isActive?: boolean;
}

export interface BubbleState {
  bubbles: BubbleData[];
  sharedUsers: SharedUser[];
  addBubble: (x: number, y: number) => string; // Now returns the bubble ID
  updateBubblePosition: (id: string, x: number, y: number) => void;
  updateBubbleSize: (id: string, width: number, height: number) => void;
  updateBubbleMessage: (id: string, message: string) => void;
  updateBubbleResponse: (id: string, response: string, chartType?: 'bar' | 'pie' | 'line' | 'bubble' | 'scatter', chartData?: any) => void;
  toggleMinimize: (id: string) => void;
  removeBubble: (id: string) => void;
  addSharedUser: (email: string) => void;
  removeSharedUser: (email: string) => void;
}
