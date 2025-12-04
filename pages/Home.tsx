import React, { useMemo, useState } from 'react';
import { ArrowRight, Sword, Zap, Heart, BookOpen, Shield, Flame, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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
  const todayLog = data.logs[today];
  const hasEntryToday = !!todayLog;

  const totalScore = todayLog
    ? Object.values(todayLog.scores).reduce((sum, score) => sum + (score as number), 0)
    : 0;

  const fencingScore = (hasEntryToday && data.activities.length > 0)
    ? totalScore / data.activities.length
    : 0;

  // Select a random verse on component mount
  const randomVerse = useMemo(() => {
    return FENCING_VERSES[Math.floor(Math.random() * FENCING_VERSES.length)];
  }, []);

  // Accordion state for the new section
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const benefits = [
    {
      title: "Block the Noise, Build True Freedom",
      icon: <Shield className="w-5 h-5 text-sacred-red" />,
      body: "Spiritual Fencing means consciously occupying your mind—rejecting wandering thoughts that lead to sin or stress (Mark 7:20-22). It's your daily shield against the world's chaos, turning vulnerability into victory.",
      challenge: "Spot one distraction today—what's invading your peace?",
      benefit: "Inner freedom like never before (Isaiah 26:3)."
    },
    {
      title: "Ignite Transformation in Every Moment",
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      body: "Renew your mind daily (Romans 12:2) by focusing on prayer, work, relationships, and more. Replace doubt with divine truth—watch holiness bloom.",
      challenge: "Pick one life area (e.g., meals or leisure) to \"fence\" for a week.",
      benefit: "Discernment sharpens; peace becomes your default."
    },
    {
      title: "Sustain the Win with Simple Habits",
      icon: <Zap className="w-5 h-5 text-gold-accent" />,
      body: "Use stages like Awareness (examine thoughts), Rejection (surrender to Christ), and Replacement (dwell on what's pure—Philippians 4:8). Add TAPPING: Thanksgiving, Adoration, Pardon, Praise, Intercession.",
      challenge: "Meditate 5 mins on God's Word tonight—start your streak strong!",
      benefit: "Habits stick, growth explodes—join thousands transforming."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Feature 1: Front-Side Invitation Hero Section (Glassmorphism Redesign) */}
      <section 
        className="relative rounded-[2.5rem] p-6 sm:p-8 overflow-hidden shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] transition-all duration-500 opacity-0 animate-slide-up group border border-gold-accent/30 bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl"
        style={{ animationDelay: '0ms' }}
      >
        {/* Subtle Decorative Glows instead of full gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sacred-red/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Iconography: Dynamic Sword */}
          <div className="mb-4 relative group-hover:scale-105 transition-transform duration-500">
             <div className="absolute inset-0 bg-gold-accent/20 blur-xl rounded-full animate-pulse-slow"></div>
             {/* Sword pulsing animation */}
             <Sword className="w-14 h-14 text-gold-accent drop-shadow-sm animate-[pulse_3s_ease-in-out_infinite]" strokeWidth={2} />
             {/* Sparkle */}
             <div className="absolute -top-1 -right-1">
               <div className="w-3 h-3 bg-sacred-red rounded-full animate-ping opacity-75"></div>
             </div>
          </div>

          <h1 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-3 leading-tight drop-shadow-sm">
            Ignite Your<br/> <span className="text-sacred-red">Spiritual Armor</span>
          </h1>
          
          <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-medium mb-4 leading-relaxed max-w-md">
            🛡️ Stop Drifting, Start Designing. A life of victory isn't an accident—it’s defended. When you pick up the sword of focus, you stop being a victim of your thoughts and become the architect of your destiny. The transformation begins the moment you start.
          </p>

          <div className="bg-stone-50/80 dark:bg-stone-800/80 backdrop-blur-md rounded-xl p-3 mb-6 border border-stone-200 dark:border-stone-700 w-full max-w-xs shadow-inner">
             <p className="text-xs text-stone-600 dark:text-stone-300 italic font-medium">
               "Don't just read about it. Live it. Tap below to start your new reality."
             </p>
          </div>

          <div className="w-full max-w-xs space-y-3">
            <button
              onClick={() => onNavigate('entry')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] hover:scale-[1.05] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border-t border-orange-400/50 relative overflow-hidden group/btn"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Arm Up Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="https://voxdivini.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10px] text-stone-400 hover:text-sacred-red transition-colors font-medium"
            >
              Inspired by Vox Divini: Read the Full Call to Arms
            </a>
          </div>
        </div>
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

      {/* 4. NEW SECTION: Why Spiritual Fencing? (Accordion) */}
      <section 
        className="glass-panel rounded-3xl p-6 opacity-0 animate-slide-up relative overflow-hidden"
        style={{ animationDelay: '450ms' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-sacred-red/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center shadow-sm mb-3">
            <span className="text-2xl">🗡️</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100 leading-tight mb-2">
            Why Fence Your Spirit?
          </h2>
          <p className="text-sm font-bold text-sacred-red mb-3">
            Unlock a Life of Unshakable Peace & Power
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-xs">
            "Guard your mind: Thoughts are the seedbed of sin or sanctity—fence them consciously!"
          </p>
        </div>

        {/* Benefits Accordion */}
        <div className="space-y-3">
           {benefits.map((benefit, index) => {
             const isExpanded = expandedIndex === index;
             return (
               <div 
                 key={index}
                 className={`
                   rounded-2xl border transition-all duration-300 overflow-hidden
                   ${isExpanded 
                     ? 'bg-white/60 dark:bg-stone-800/60 border-sacred-red/30 shadow-md' 
                     : 'bg-white/30 dark:bg-stone-800/30 border-stone-200 dark:border-stone-700 hover:bg-white/50'}
                 `}
               >
                 <button
                   onClick={() => setExpandedIndex(isExpanded ? null : index)}
                   className="w-full flex items-center justify-between p-4 text-left"
                 >
                   <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full ${isExpanded ? 'bg-stone-100 dark:bg-stone-700' : 'bg-transparent'}`}>
                       {benefit.icon}
                     </div>
                     <h3 className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                       {benefit.title}
                     </h3>
                   </div>
                   {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                 </button>
                 
                 {isExpanded && (
                   <div className="px-4 pb-4 pt-0 text-sm text-stone-600 dark:text-stone-300 space-y-3 animate-slide-up" style={{ animationDuration: '0.2s' }}>
                     <p className="leading-relaxed border-l-2 border-stone-200 dark:border-stone-600 pl-3">
                       {benefit.body}
                     </p>
                     
                     <div className="flex flex-col gap-2">
                       <div className="bg-gold-accent/10 p-2.5 rounded-lg">
                         <span className="font-bold text-stone-700 dark:text-stone-200 text-xs uppercase tracking-wider block mb-0.5">Challenge</span>
                         <p className="font-medium italic text-xs">{benefit.challenge}</p>
                       </div>
                       <div className="p-2.5">
                         <span className="font-bold text-stone-700 dark:text-stone-200 text-xs uppercase tracking-wider block mb-0.5">Benefit</span>
                         <p className="font-medium text-xs">{benefit.benefit}</p>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             );
           })}
        </div>

        {/* Section Footer */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 text-center space-y-3">
          <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
            The Call: Don't drift. Take every thought captive.
          </p>
          <a 
            href="https://voxdivini.in/2025/09/01/the-importance-of-spiritual-fencing-consciously-occupying-the-mind-for-a-transformative-spiritual-journey/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-sacred-red hover:text-red-700 transition-colors"
          >
            Read the Vox Divini Guide <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Footer Spacer for Fixed Nav */}
      <div className="h-4" />
    </div>
  );
};

export default Home;