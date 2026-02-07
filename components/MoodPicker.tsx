import React from 'react';
import { MoodType } from '../types';
import { MOODS } from '../constants';
import FlowerIcon from './FlowerIcon';

interface MoodPickerProps {
  onSelect: (mood: MoodType) => void;
  selectedMood: MoodType | null;
}

const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect, selectedMood }) => {
  const moods = Object.keys(MOODS) as MoodType[];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-slate-700 mb-6 text-center">How are you feeling today?</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood;
          return (
            <button
              key={mood}
              onClick={() => onSelect(mood)}
              className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-300 w-full
                ${isSelected 
                  ? 'bg-white shadow-inner ring-4 ring-offset-2 ring-green-200 scale-105' 
                  : 'hover:bg-white/50 hover:shadow-sm'
                }
              `}
            >
              <FlowerIcon 
                mood={mood} 
                size={70} 
                animate={isSelected} 
                className={`mb-3 drop-shadow-sm ${isSelected ? 'drop-shadow-lg' : ''}`}
              />
              <span className={`font-bold text-sm ${MOODS[mood].color}`}>
                {MOODS[mood].label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodPicker;