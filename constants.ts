import { MoodConfig, MoodType } from './types';

export const MOODS: Record<MoodType, MoodConfig> = {
  radiant: {
    type: 'radiant',
    label: 'Radiant',
    color: 'text-yellow-400',
    petalColor: '#FACC15', // Yellow 400
    centerColor: '#FFFbeb', // Amber 50
    faceColor: '#854D0E', // Yellow 800
  },
  happy: {
    type: 'happy',
    label: 'Happy',
    color: 'text-pink-400',
    petalColor: '#F472B6', // Pink 400
    centerColor: '#FDF2F8', // Pink 50
    faceColor: '#9D174D', // Pink 800
  },
  neutral: {
    type: 'neutral',
    label: 'Calm',
    color: 'text-teal-400',
    petalColor: '#2DD4BF', // Teal 400
    centerColor: '#F0FDFA', // Teal 50
    faceColor: '#115E59', // Teal 800
  },
  blue: {
    type: 'blue',
    label: 'Low',
    color: 'text-blue-400',
    petalColor: '#60A5FA', // Blue 400
    centerColor: '#EFF6FF', // Blue 50
    faceColor: '#1E3A8A', // Blue 800
  },
  stormy: {
    type: 'stormy',
    label: 'Stormy',
    color: 'text-red-400',
    petalColor: '#F87171', // Red 400
    centerColor: '#FEF2F2', // Red 50
    faceColor: '#7F1D1D', // Red 800
  },
};

export const STORAGE_KEYS = {
  CURRENT_USER: 'mood_journal_current_user',
  DATA_PREFIX: 'mood_journal_data_',
};