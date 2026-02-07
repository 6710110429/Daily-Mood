import React from 'react';
import { MoodEntry } from '../types';
import { getLast30DaysDates } from '../services/storageService';
import FlowerIcon from './FlowerIcon';
import { Calendar } from 'lucide-react';

interface HistoryGridProps {
  history: Record<string, MoodEntry>;
}

const HistoryGrid: React.FC<HistoryGridProps> = ({ history }) => {
  const dates = getLast30DaysDates();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00'); // Ensure local time interpretation
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const isToday = (dateStr: string) => {
    return dateStr === new Date().toLocaleDateString('en-CA');
  };

  return (
    <div className="w-full">
        <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-garden-accent" size={20} />
            <h3 className="text-lg font-bold text-slate-700">Past 30 Days</h3>
        </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4">
        {dates.map((date) => {
          const entry = history[date];
          const hasMood = !!entry;
          const isCurrentDay = isToday(date);

          return (
            <div 
              key={date} 
              className={`
                relative aspect-square rounded-2xl flex flex-col items-center justify-center
                border transition-all duration-300
                ${hasMood ? 'bg-white border-green-100 shadow-sm' : 'bg-slate-50 border-slate-100'}
                ${isCurrentDay ? 'ring-2 ring-garden-accent ring-offset-1' : ''}
              `}
              title={`${formatDate(date)}${entry ? `: ${entry.mood}` : ''}`}
            >
              <div className="absolute top-1 right-2 text-[10px] font-bold text-slate-400">
                {formatDate(date).split(' ')[0] /* Month */}
                <br/>
                <span className="text-slate-600 text-xs">{formatDate(date).split(' ')[1] /* Day */}</span>
              </div>

              <div className="mt-3">
                {hasMood ? (
                    <FlowerIcon mood={entry.mood} size={45} className="drop-shadow-sm" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center opacity-50">
                        {isCurrentDay && <div className="w-2 h-2 bg-garden-accent rounded-full animate-pulse" />}
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryGrid;