
import { BubbleData, SharedUser } from '../types';

const BUBBLES_STORAGE_KEY = 'perplexigrid-bubbles';
const SHARED_USERS_STORAGE_KEY = 'perplexigrid-shared-users';

export const saveBubblesToLocalStorage = (bubbles: BubbleData[]): void => {
  try {
    localStorage.setItem(BUBBLES_STORAGE_KEY, JSON.stringify(bubbles));
  } catch (error) {
    console.error('Error saving bubbles to localStorage:', error);
  }
};

export const loadBubblesFromLocalStorage = (): BubbleData[] | null => {
  try {
    const storedBubbles = localStorage.getItem(BUBBLES_STORAGE_KEY);
    if (storedBubbles) {
      return JSON.parse(storedBubbles);
    }
    return null;
  } catch (error) {
    console.error('Error loading bubbles from localStorage:', error);
    return null;
  }
};

export const saveSharedUsersToLocalStorage = (users: SharedUser[]): void => {
  try {
    localStorage.setItem(SHARED_USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving shared users to localStorage:', error);
  }
};

export const loadSharedUsersFromLocalStorage = (): SharedUser[] | null => {
  try {
    const storedUsers = localStorage.getItem(SHARED_USERS_STORAGE_KEY);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    return null;
  } catch (error) {
    console.error('Error loading shared users from localStorage:', error);
    return null;
  }
};
