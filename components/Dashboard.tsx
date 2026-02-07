import React, { useState, useEffect } from 'react';
import { User, MoodType, MoodEntry } from '../types';
import { getMoodHistory, saveMoodEntry, getTodayDateString } from '../services/storageService';
import MoodPicker from './MoodPicker';
import HistoryGrid from './HistoryGrid';
import { LogOut, Sprout, Cpu } from 'lucide-react';
import FlowerIcon from './FlowerIcon';
import SystemSpecs from './SystemSpecs';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [history, setHistory] = useState<Record<string, MoodEntry>>({});
  const [todayMood, setTodayMood] = useState<MoodType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [user.username]);

  const loadHistory = () => {
    const data = getMoodHistory(user.username);
    setHistory(data);
    
    const today = getTodayDateString();
    if (data[today]) {
      setTodayMood(data[today].mood);
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    const today = getTodayDateString();
    const entry: MoodEntry = {
      date: today,
      mood: mood,
      timestamp: Date.now(),
    };
    
    saveMoodEntry(user.username, entry);
    setHistory(prev => ({ ...prev, [today]: entry }));
    setTodayMood(mood);
    
    // Trigger a small celebration animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-garden-bg">
      {/* Specs Modal */}
      {showSpecs && <SystemSpecs onClose={() => setShowSpecs(false)} />}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-green-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-green-100 p-2 rounded-full text-garden-accent">
                <Sprout size={24} />
             </div>
             <div>
                <h1 className="font-display font-bold text-xl text-slate-800">
                  {user.username}'s Garden
                </h1>
                <p className="text-xs text-slate-500 font-medium">Daily Mood Journal</p>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-50"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Today's Entry Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-green-900/5 border border-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-50 rounded-full opacity-50 pointer-events-none"></div>
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-garden-accent text-xs font-bold uppercase tracking-wider mb-2">Today</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                           {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h2>
                    </div>
                    {todayMood && (
                        <div className={`transition-all duration-500 ${isAnimating ? 'scale-125 rotate-12' : ''}`}>
                            <FlowerIcon mood={todayMood} size={60} />
                        </div>
                    )}
                </div>
                
                <MoodPicker 
                  onSelect={handleMoodSelect} 
                  selectedMood={todayMood} 
                />
             </div>
          </div>

          {/* History Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white shadow-lg shadow-green-900/5">
             <HistoryGrid history={history} />
          </div>

        </div>
      </main>

      <footer className="flex flex-col items-center py-8 text-slate-400 text-sm">
        <p>Your garden grows one day at a time.</p>
        <button 
          onClick={() => setShowSpecs(true)}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white rounded-full text-xs font-bold text-green-800 transition-all shadow-sm hover:shadow-md border border-green-100 group"
        >
          <Cpu size={16} className="text-green-600 group-hover:text-green-800" />
          <span>System Architecture</span>
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;