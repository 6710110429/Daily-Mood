import { MoodEntry, User } from '../types';
import { STORAGE_KEYS } from '../constants';

export const loginUser = (username: string): User => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({ username }));
  return { username };
};

export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch (e) {
    return null;
  }
};

export const getMoodHistory = (username: string): Record<string, MoodEntry> => {
  const key = `${STORAGE_KEYS.DATA_PREFIX}${username}`;
  const stored = localStorage.getItem(key);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch (e) {
    return {};
  }
};

export const saveMoodEntry = (username: string, entry: MoodEntry): void => {
  const key = `${STORAGE_KEYS.DATA_PREFIX}${username}`;
  const currentHistory = getMoodHistory(username);
  
  const updatedHistory = {
    ...currentHistory,
    [entry.date]: entry,
  };

  localStorage.setItem(key, JSON.stringify(updatedHistory));
};

export const getLast30DaysDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    // Format YYYY-MM-DD using locale to avoid timezone issues
    const dateStr = d.toLocaleDateString('en-CA');
    dates.push(dateStr);
  }
  return dates;
};

export const getTodayDateString = (): string => {
  return new Date().toLocaleDateString('en-CA');
};