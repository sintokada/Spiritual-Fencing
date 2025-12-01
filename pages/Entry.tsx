import React, { useState, useEffect } from 'react';
import { AppData, DailyLog } from '../types';
import { Calendar, Save, CheckCircle2, Sparkles } from 'lucide-react';

interface EntryProps {
  data: AppData;
  onSave: (date: string, scores: Record<string, number>) => void;
}

// Custom Slider Component for Micro-interactions
const RangeSlider = ({ value, onChange, min = 0, max = 10 }: { value: number, onChange: (val: number) => void, min?: number, max?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate percentage for bubble position
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div 
      className="relative w-full h-10 flex items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Track */}
      <div className="absolute w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-sacred-red/60 to-sacred-red transition-all duration-100 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Floating Bubble (Value Indicator) */}
      <div 
        className={`
          absolute -top-8 transition-all duration-300 ease-out pointer-events-none transform -translate-x-1/2 z-30
          ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'}
        `}
        style={{ left: `${percentage}%` }}
      >
        <div className="bg-sacred-red text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg relative">
          {value}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-sacred-red rotate-45"></div>
        </div>
      </div>

      {/* Native Input (Invisible but functional) */}
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0 p-0"
      />

      {/* Custom Thumb (Visual Only - follows percentage) */}
      <div 
        className={`
          absolute w-5 h-5 bg-white border-2 border-sacred-red rounded-full shadow-md z-10 pointer-events-none transition-all duration-200 transform -translate-x-1/2
          ${isHovered ? 'scale-150 border-4' : 'scale-100'}
        `}
        style={{ left: `${percentage}%` }}
      />
      
      {/* Ticks */}
      <div className="absolute top-4 w-full flex justify-between px-0.5">
         {[0, 5, 10].map(tick => (
           <div key={tick} className="flex flex-col items-center">
             <div className="w-0.5 h-1 bg-stone-300 dark:bg-stone-600 mb-1"></div>
             <span className="text-[10px] text-stone-400">{tick}</span>
           </div>
         ))}
      </div>
    </div>
  );
};

const Entry: React.FC<EntryProps> = ({ data, onSave }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [scores, setScores] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (data.logs[selectedDate]) {
      setScores(data.logs[selectedDate].scores);
    } else {
      const initial: Record<string, number> = {};
      data.activities.forEach(a => initial[a.id] = 0);
      setScores(initial);
    }
  }, [selectedDate, data]);

  useEffect(() => {
    setSaved(false);
    setShowSuccess(false);
  }, [selectedDate]);

  const handleScoreChange = (id: string, val: number) => {
    setScores(prev => ({ ...prev, [id]: val }));
    setSaved(false);
    setShowSuccess(false);
  };

  const handleSave = () => {
    onSave(selectedDate, scores);
    setSaved(true);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 6) return 'text-green-600 dark:text-green-500';
    if (score === 5) return 'text-amber-500 dark:text-amber-500';
    return 'text-red-600 dark:text-red-500';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header - Stagger 1 */}
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-0 animate-slide-up"
        style={{ animationDelay: '0ms' }}
      >
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 drop-shadow-sm">Daily Entry</h2>
          <p className="text-stone-600 dark:text-stone-300 font-medium">Rate your spiritual fencing (0-10)</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 shadow-sm">
          <Calendar className="text-sacred-red w-5 h-5" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="outline-none text-stone-700 dark:text-stone-200 bg-transparent font-bold font-sans cursor-pointer"
          />
        </div>
      </div>

      {/* Form Container - Stagger 2 (Glass) */}
      <div 
        className="glass-panel p-6 md:p-8 rounded-3xl shadow-glass opacity-0 animate-slide-up space-y-8"
        style={{ animationDelay: '150ms' }}
      >
        {data.activities.map((activity, idx) => {
          const score = scores[activity.id] || 0;
          return (
            <div key={activity.id} className="space-y-3 relative">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-stone-700 dark:text-stone-200 flex items-center gap-2">
                   {activity.name}
                </label>
                <span className={`text-lg font-bold w-8 text-right transition-colors duration-300 ${getScoreColorClass(score)}`}>
                  {score}
                </span>
              </div>
              
              {/* Custom Range Slider with Bubble */}
              <RangeSlider 
                value={score} 
                onChange={(val) => handleScoreChange(activity.id, val)} 
              />
            </div>
          );
        })}
      </div>

      {/* Floating Success Message & Button */}
      <div className="sticky bottom-4 mt-8 flex flex-col items-end z-20 pointer-events-none">
        {/* Success Popup */}
        <div className={`
           transition-all duration-500 ease-out transform mb-3 pointer-events-auto origin-bottom-right
           ${showSuccess ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
        `}>
          <div className="glass-panel bg-green-600/90 dark:bg-green-700/90 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold border border-green-400/50">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
            Entry Saved Successfully!
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSave}
          className={`
            pointer-events-auto flex items-center space-x-2 px-8 py-4 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 text-white font-bold tracking-wide
            ${saved 
              ? 'bg-green-600 hover:bg-green-700 ring-4 ring-green-200/50 dark:ring-green-900/50 scale-105' 
              : 'bg-gradient-to-r from-sacred-red to-red-700 hover:shadow-sacred-red/40 hover:-translate-y-1'
            }
          `}
        >
          {saved ? (
            <CheckCircle2 className="w-5 h-5 animate-[bounce_1s_infinite]" /> 
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{saved ? 'Submitted' : 'Save Entry'}</span>
        </button>
      </div>
      
      {/* Spacer for bottom nav */}
      <div className="h-24" />
    </div>
  );
};

export default Entry;