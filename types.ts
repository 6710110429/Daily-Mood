export type MoodType = 'radiant' | 'happy' | 'neutral' | 'blue' | 'stormy';

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: MoodType;
  note?: string;
  timestamp: number;
}

export interface User {
  username: string;
}

export interface MoodConfig {
  type: MoodType;
  label: string;
  color: string;
  petalColor: string;
  centerColor: string;
  faceColor: string;
}

export interface StorageSchema {
  [username: string]: Record<string, MoodEntry>; // username -> { date: entry }
}