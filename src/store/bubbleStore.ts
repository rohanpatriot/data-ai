import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { BubbleState, BubbleData, SharedUser } from '../types';
import { saveBubblesToLocalStorage, loadBubblesFromLocalStorage, saveSharedUsersToLocalStorage, loadSharedUsersFromLocalStorage } from '../services/localStorageService';

const useBubbleStore = create<BubbleState>((set, get) => ({
  bubbles: loadBubblesFromLocalStorage() || [],
  sharedUsers: loadSharedUsersFromLocalStorage() || [],
  
  addBubble: (x: number, y: number) => {
    const newId = uuidv4();
    const newBubble: BubbleData = {
      id: newId,
      position: { x, y },
      message: '',
      response: null,
      responseType: null,
      isMinimized: false,
      width: 384, // 96rem for Tailwind w-96
      height: 384, // Increased initial height to accommodate visualization
      lastUpdated: Date.now(),
    };
    
    set((state) => {
      const updatedBubbles = [...state.bubbles, newBubble];
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
    
    return newId; // Return the ID of the newly created bubble
  },
  
  updateBubblePosition: (id: string, x: number, y: number) => {
    set((state) => {
      const updatedBubbles = state.bubbles.map((bubble) => 
        bubble.id === id ? {
          ...bubble,
          position: { x, y },
          lastUpdated: Date.now(),
        } : bubble
      );
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
  },
  
  updateBubbleSize: (id: string, width: number, height: number) => {
    console.log(`Updating bubble size: ${id}, width: ${width}, height: ${height}`);
    set((state) => {
      const updatedBubbles = state.bubbles.map((bubble) => 
        bubble.id === id ? {
          ...bubble,
          width,
          height,
          lastUpdated: Date.now(),
        } : bubble
      );
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
  },
  
  updateBubbleMessage: (id: string, message: string) => {
    set((state) => {
      const updatedBubbles = state.bubbles.map((bubble) => 
        bubble.id === id ? {
          ...bubble,
          message,
          lastUpdated: Date.now(),
        } : bubble
      );
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
  },
  
  updateBubbleResponse: (id: string, response: string, chartType?: 'bar' | 'pie' | 'line' | 'bubble' | 'scatter', chartData?: any) => {
    set((state) => {
      const updatedBubbles = state.bubbles.map((bubble) => 
        bubble.id === id ? {
          ...bubble,
          response,
          responseType: chartType ? 'chart' as const : 'text' as const,
          chartType,
          chartData,
          height: chartType ? Math.max(bubble.height, 384) : bubble.height,
          lastUpdated: Date.now(),
        } : bubble
      );
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
  },
  
  toggleMinimize: (id: string) => {
    set((state) => {
      const updatedBubbles = state.bubbles.map((bubble) => 
        bubble.id === id ? {
          ...bubble,
          isMinimized: !bubble.isMinimized,
          lastUpdated: Date.now(),
        } : bubble
      );
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
  },
  
  removeBubble: (id: string) => {
    set((state) => {
      const updatedBubbles = state.bubbles.filter((bubble) => bubble.id !== id);
      saveBubblesToLocalStorage(updatedBubbles);
      return { bubbles: updatedBubbles };
    });
  },
  
  addSharedUser: (email: string) => {
    set((state) => {
      if (state.sharedUsers.some(user => user.email === email)) {
        return state;
      }
      
      const newUser: SharedUser = {
        email,
        joinedAt: Date.now(),
        isActive: false
      };
      
      const updatedUsers = [...state.sharedUsers, newUser];
      saveSharedUsersToLocalStorage(updatedUsers);
      return { sharedUsers: updatedUsers };
    });
  },
  
  removeSharedUser: (email: string) => {
    set((state) => {
      const updatedUsers = state.sharedUsers.filter(user => user.email !== email);
      saveSharedUsersToLocalStorage(updatedUsers);
      return { sharedUsers: updatedUsers };
    });
  }
}));

export default useBubbleStore;
