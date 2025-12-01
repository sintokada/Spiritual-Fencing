import React, { useMemo } from 'react';
import { ArrowRight, Sword, Zap, Heart, BookOpen } from 'lucide-react';
import { AppData } from '../types';

interface HomeProps {
  data: AppData;
  onNavigate: (page: string) => void;
}

const FENCING_VERSES = [
  { text: "Do not be conformed to this world, but be transformed by the renewal of your mind.", ref: "Romans 12:2" },
  { text: "We take captive every thought to make it obedient to Christ.", ref: "2 Corinthians 10:5" },
  { text: "Above all else, guard your heart, for everything you do flows from it.", ref: "Proverbs 4:23" },
  { text: "Put on the whole armor of God, that you may be able to stand against the schemes of the devil.", ref: "Ephesians 6:11" },
  { text: "Whatever is true, whatever is honorable, whatever is just... think about these things.", ref: "Philippians 4:8" },
  { text: "Set your minds on things that are above, not on things that are on earth.", ref: "Colossians 3:2" },
  { text: "Watch and pray that you may not enter into temptation. The spirit is willing, but the flesh is weak.", ref: "Matthew 26:41" },
  { text: "Prepare your minds for action, and being sober-minded, set your hope fully on the grace to be brought to you.", ref: "1 Peter 1:13" }
];

const Home: React.FC<HomeProps> = ({ data, onNavigate }) => {
  const today = new Date().toISOString().split('T')[0];
  const hasEntryToday = !!data.logs[today];
  const fencingScore = data.logs[today] 
    ? Object.values(data.logs[today].scores).reduce((a, b) => a + b, 0) / data.activities.length 
    : 0;

  // Select a random verse on component mount
  const randomVerse = useMemo(() => {
    return FENCING_VERSES[Math.floor(Math.random() * FENCING_VERSES.length)];
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 1. Hero Card (Glass + Stagger 1) */}
      <section 
        className="glass-panel rounded-3xl p-6 relative overflow-hidden text-center shadow-glass transition-all duration-500 opacity-0 animate-slide-up"
        style={{ animationDelay: '0ms' }}
      >
        {/* Decorative background blurbs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
        
        {/* Icon Composition */}
        <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-sacred-light to-white dark:from-stone-700 dark:to-stone-600 rounded-full shadow-lg scale-110 animate-pulse-slow" />
            <Sword className="w-10 h-10 text-gold-accent relative z-10 transform -rotate-45 drop-shadow-md" />
            <div className="absolute top-1 right-1 bg-white dark:bg-stone-800 rounded-full p-1 shadow-sm">
               <Heart className="w-4 h-4 text-sacred-red fill-current" />
            </div>
        </div>

        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2 drop-shadow-sm">
          Daily Protection
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm mb-8 leading-relaxed max-w-xs mx-auto font-medium">
          Fence against the distractions of the world. Put on the armor of God today.
        </p>

        <button
          onClick={() => onNavigate('entry')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-sacred-red to-[#D97706] text-white font-bold shadow-lg shadow-sacred-red/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
        >
          {/* Button Shine Effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10">{hasEntryToday ? "Edit Today's Entry" : "Start Daily Entry"}</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* 2. Info Grid (Glass + Stagger 2) */}
      <section 
        className="grid grid-cols-2 gap-4 opacity-0 animate-slide-up"
        style={{ animationDelay: '150ms' }}
      >
        {/* Streak Card */}
        <div className="glass-panel rounded-3xl p-5 flex flex-col justify-between h-36 relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-20 h-20 text-stone-800 dark:text-stone-200" />
           </div>
           <div className="flex items-center gap-2 text-gold-accent mb-2">
             <div className="p-1.5 bg-gold-accent/10 rounded-full">
               <Zap className="w-4 h-4 fill-current" />
             </div>
             <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Streak</span>
           </div>
           <div>
             <span className="text-4xl font-bold text-stone-800 dark:text-stone-100">{Object.keys(data.logs).length}</span>
             <span className="text-sm text-stone-500 dark:text-stone-400 ml-1 font-medium">days</span>
           </div>
        </div>

        {/* Today's Score Card */}
        <div className="rounded-3xl p-5 flex flex-col justify-between h-36 relative overflow-hidden bg-gradient-to-br from-sacred-red to-sacred-dark-red shadow-xl text-white group">
           {/* Subtle texture overlay */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
           
           <div className="flex items-center gap-2 mb-2 text-red-100/90 relative z-10">
             <div className="p-1.5 bg-white/10 rounded-full">
                <Heart className="w-4 h-4 fill-current" />
             </div>
             <span className="text-xs font-bold uppercase tracking-wider">Today</span>
           </div>
           <div className="relative z-10">
             {hasEntryToday ? (
               <>
                 <span className="text-4xl font-bold tracking-tight">{fencingScore.toFixed(1)}</span>
                 <span className="text-sm text-red-100 ml-1 font-medium">avg</span>
               </>
             ) : (
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold opacity-50">--</span>
                  <span className="text-xs font-medium opacity-90 text-red-200">
                    Awaiting entry...
                  </span>
                </div>
             )}
           </div>
        </div>
      </section>

      {/* 3. Word of God (Glass + Stagger 3) */}
      <section 
        className="glass-panel rounded-3xl p-6 border-l-4 border-gold-accent opacity-0 animate-slide-up"
        style={{ animationDelay: '300ms' }}
      >
        <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
          Word of God
        </h3>
        <p className="text-stone-800 dark:text-stone-200 italic font-medium leading-relaxed mb-4 text-lg">
          "{randomVerse.text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-600 flex items-center justify-center text-stone-500">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-sacred-red tracking-wide">{randomVerse.ref}</span>
        </div>
      </section>

      {/* Footer Spacer for Fixed Nav */}
      <div className="h-4" />
    </div>
  );
};

export default Home;