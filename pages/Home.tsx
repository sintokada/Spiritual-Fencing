import React, { useMemo, useState } from 'react';
import { ArrowRight, Sword, Zap, Heart, BookOpen, Shield, Flame, ChevronDown, ChevronUp, ExternalLink, Hand, X, Minus, Plus, Type, Check } from 'lucide-react';
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

  const totalScore: number = todayLog
    ? (Object.values(todayLog.scores) as number[]).reduce((sum: number, score: number) => sum + score, 0)
    : 0;

  const fencingScore = (hasEntryToday && data.activities.length > 0)
    ? totalScore / data.activities.length
    : 0;

  // Select a random verse on component mount
  const randomVerse = useMemo(() => {
    return FENCING_VERSES[Math.floor(Math.random() * FENCING_VERSES.length)];
  }, []);

  // Calculate last 7 days for streak visualization
  const last7Days = useMemo(() => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    return dates;
  }, []);

  // Accordion state for the new section
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Tapping Modal State
  const [showTappingModal, setShowTappingModal] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 28));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 12));

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
        {/* Streak Card - Modified for 7 Day Progress */}
        <div className="glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between h-36 relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Zap className="w-20 h-20 text-stone-800 dark:text-stone-200" />
           </div>
           
           <div className="flex items-center gap-2 text-gold-accent mb-2">
             <div className="p-1.5 bg-gold-accent/10 rounded-full">
               <Zap className="w-4 h-4 fill-current" />
             </div>
             <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Last 7 Days</span>
           </div>

           <div className="flex justify-between items-end w-full z-10 px-1">
             {last7Days.map((dateObj, index) => {
                const dateStr = dateObj.toISOString().split('T')[0];
                const hasEntry = !!data.logs[dateStr];
                const isTodayDate = dateStr === today;
                const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'narrow' }); // M, T, W

                return (
                   <div key={dateStr} className="flex flex-col items-center gap-1.5">
                      <div 
                        className={`
                          w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-bold border
                          transition-all duration-300
                          ${hasEntry 
                            ? 'bg-gold-accent text-white border-gold-accent shadow-[0_0_8px_rgba(212,175,55,0.4)]' 
                            : 'bg-stone-200/50 dark:bg-stone-700/50 text-stone-400 border-transparent'}
                          ${isTodayDate && !hasEntry ? 'animate-pulse ring-1 ring-sacred-red/50' : ''}
                        `}
                      >
                        {hasEntry ? <Check className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} /> : (
                          <span className="text-[8px] opacity-0">.</span>
                        )}
                      </div>
                      <span className={`text-[8px] sm:text-[9px] font-bold ${isTodayDate ? 'text-sacred-red' : 'text-stone-400'}`}>
                        {dayLabel}
                      </span>
                   </div>
                );
             })}
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

      {/* 3. Practices (Side by Side) - Moved from Guide */}
      <section 
        className="grid grid-cols-2 gap-4 opacity-0 animate-slide-up"
        style={{ animationDelay: '225ms' }} 
      >
        {/* Tapping Card */}
        <div 
          onClick={() => setShowTappingModal(true)}
          className="glass-panel p-4 rounded-2xl shadow-sm cursor-pointer relative group overflow-hidden border-2 border-transparent hover:border-sacred-red/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="mb-3 p-2 bg-sacred-red/10 w-fit rounded-lg">
              <Hand className="w-5 h-5 text-sacred-red" />
            </div>
            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm mb-1">
              TAPPING
            </h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight font-medium mb-3">
              Surrender distractions instantly. "Wash me in your blood, Jesus."
            </p>
          </div>
          <div className="pt-2 border-t border-sacred-red/10 flex">
            <span className="flex-1 text-center text-[10px] font-bold text-sacred-red bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-sacred-red/10 group-hover:bg-sacred-red group-hover:text-white transition-colors whitespace-nowrap">
              Read Prayer
            </span>
          </div>
        </div>

        {/* Vox Divini Card */}
        <a 
          href="https://voxdivini.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-panel p-4 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform border-2 border-transparent hover:border-gold-accent/30 group flex flex-col justify-between"
        >
           <div>
             <div className="mb-3 p-2 bg-gold-accent/10 w-fit rounded-lg">
               <BookOpen className="w-5 h-5 text-gold-accent" />
            </div>
            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm mb-1">Vox Divini</h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight font-medium mb-3">
              Dwell on God's Word. Let Scripture shape your inner voice.
            </p>
           </div>
           <div className="flex items-center justify-between pt-2 border-t border-gold-accent/10">
              <span className="text-[10px] font-bold text-gold-accent bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full border border-gold-accent/10 group-hover:bg-gold-accent group-hover:text-white transition-colors">
                Visit Site
              </span>
              <span className="text-[9px] font-medium text-stone-400 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                 Click here <ExternalLink className="w-3 h-3" />
              </span>
           </div>
        </a>
      </section>

      {/* 4. Word of God (Glass + Stagger 3) */}
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

      {/* 5. NEW SECTION: Why Spiritual Fencing? (Accordion) */}
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

      {/* TAPPING PRAYER MODAL */}
      {showTappingModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowTappingModal(false)}></div>
          {/* Maximized height class: h-full on mobile, h-[95vh] on desktop */}
          <div className="relative w-full max-w-2xl h-full md:h-[95vh] bg-[#F5F5DC] dark:bg-stone-900 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-slide-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sacred-red/10 rounded-full">
                  <Hand className="w-5 h-5 text-sacred-red" />
                </div>
                <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100 hidden sm:block">Let Us Do Tapping</h2>
                <h2 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-100 sm:hidden">Tapping Prayer</h2>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Font Controls */}
                <div className="flex items-center gap-1 bg-white/60 dark:bg-black/30 rounded-lg p-1 border border-stone-200 dark:border-stone-700">
                   <button 
                     onClick={decreaseFont}
                     className="p-1.5 hover:bg-white dark:hover:bg-stone-600 rounded-md transition-colors text-stone-600 dark:text-stone-300 disabled:opacity-30"
                     disabled={fontSize <= 12}
                     title="Decrease Font Size"
                   >
                     <Minus className="w-3 h-3" />
                   </button>
                   <div className="w-6 text-center flex items-center justify-center">
                     <Type className="w-3 h-3 text-stone-400" />
                   </div>
                   <button 
                     onClick={increaseFont}
                     className="p-1.5 hover:bg-white dark:hover:bg-stone-600 rounded-md transition-colors text-stone-600 dark:text-stone-300 disabled:opacity-30"
                     disabled={fontSize >= 28}
                     title="Increase Font Size"
                   >
                     <Plus className="w-3 h-3" />
                   </button>
                </div>

                <button onClick={() => setShowTappingModal(false)} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full transition-colors">
                  <X className="w-6 h-6 text-stone-500" />
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div 
              className="overflow-y-auto p-6 space-y-8 text-stone-700 dark:text-stone-300"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            >
              
              {/* THANKSGIVING */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                  <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                  THANKSGIVING
                </h3>
                <p className="leading-relaxed text-justify">
                  God, our loving Father, I praise and thank you for this blessed moment. Thank you, Jesus for calling me to be here as your loving daughter/son. Dear Heavenly Father, in this sacred moment, I offer my praise and gratitude to you. I thank you, Jesus, for calling me to be your beloved child. I am grateful for the precious gift of my parents, siblings, relatives, friends and all those who are dear to me.
                </p>
                <p className="leading-relaxed text-justify">
                  Lord, with my whole heart, I want to express my gratitude for every single blessing you have bestowed upon me up to this day. I am filled with thankfulness for the pleasant memories that remind me of your constant presence in my life. I acknowledge that it is only because of your love and grace that I have experienced such blessings. I am certain that every grace-filled experience I have had is a result of your guiding hand and your divine intervention. I am especially thankful for the individuals in my life who have been a reflection of your presence and love. They have been a manifestation of your goodness, kindness and compassion. Their presence has brought me joy, support and encouragement and I am grateful for the ways in which they have touched my life.
                </p>
                <p className="leading-relaxed text-justify">
                  Gracious Lord, I offer my heartfelt gratitude for your unwavering protection even when I stayed away from you. Despite my shortcomings and mistakes, you have always been there to safeguard me. I am deeply thankful for those moments in the past when I could have caused irreparable harm to myself, but your loving hand protected me and kept me safe. In times of sicknesses, failures and accidents, you have been my shield, surrounding me with your divine protection. Your presence has been my refuge, giving me strength and healing. I am grateful for your watchful care and for guiding me through these challenging times.
                </p>
                <p className="leading-relaxed text-justify">
                  Thank you, Lord, for the countless instances where you saved me from shame and humiliation. Your mercy and grace have shielded me from the consequences of my actions and I am humbled by your loving intervention. Without your infinite compassion and forgiveness, I would not be standing here today, experiencing your grace and mercy.
                </p>
                <p className="leading-relaxed italic border-l-2 border-gold-accent pl-3 text-justify">
                  Thank you, Father! Thank you, Jesus! Thank you, Holy Spirit! Thank you, Lord, for the food I eat, water I drink and the air I breathe. Thank you, Lord, for my parents, brothers and sisters. Thank you, Lord, for all that happened today.... (keep on recalling to our minds the wonderful things that the Lord has done for us and keep thanking the Lord. We may also sing a hymn of thanksgiving while trying to recall all that we have received from the Lord.)
                </p>
              </section>

              {/* ADORATION */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   ADORATION
                </h3>
                <p className="leading-relaxed text-justify">
                  Oh, Lord, your love knows no bounds and your blessings are beyond measure. I am in awe of your endless mercy and grace. How can I ever thank you sufficiently for all that you have done? As I reflect on the blessings of today, I am humbled by their abundance. Your love is evident in every moment, in every breath I take. The blessings you bestow upon me are countless, too numerous to recount. Your generosity knows no limits and your provision exceeds all expectations.
                </p>
                <p className="leading-relaxed text-justify">
                  Recalling the blessings that I have received today, I realize that I can't remember all of them; I cannot finish counting all of them. All what I can do is to come before you, join with all the angels and saints and bow before you and say, 'Lord, I worship you.' (Let us see ourselves prostrated in worship before Jesus who is on the cross.)
                </p>
                <p className="leading-relaxed text-justify">
                  Jesus, my most adorable loving God, as I see you hanging on the cross in the company of my dearest saints and angels, I see myself totally prostrated before you. I realize that you are such a mighty God who created the sun, the moon, the stars and everything that I see around. You created everything with a word. You divided the Red Sea to save your people. You brought water from the rock for your people. Lord, you are such a mighty God and yet you say that you love me. Though I am only a little creature, yet you say that my name is written on your palm and you knew me even before I was born. I worship you, Lord, with my entire being.
                </p>
                <p className="italic text-stone-500" style={{ fontSize: '0.9em' }}>(We may sing a few lines of a worship hymn)</p>
                <p className="leading-relaxed text-justify">
                  As I lay prostrate before You in humble adoration and worship, I also want to surrender my entire being to you at the foot of the Cross.
                </p>
                <div className="bg-white/50 dark:bg-stone-800/50 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-stone-600 dark:text-stone-300">I surrender:</p>
                  <ul className="list-disc pl-5 space-y-1 marker:text-gold-accent text-justify">
                    <li>My entire body, mind and spirit, my past, present and future. I take each part of my body and place it before you, Jesus.</li>
                    <li>I take my left and right eyes along with everything I have seen till today and place them before you. I surrender in every manner all that I have used my eyes for.</li>
                    <li>I surrender my lips and tongue along with everything I have spoken till today. I surrender every word that I have spoken to encourage as well as hurt others. I surrender every use of my tongue and lips.</li>
                    <li>Lord, I surrender my ears along with every single word that I have listened to, every word that made me realize your love and every hurt feeling and insult which brings tears in my eyes when I recall.</li>
                    <li>I surrender the left and the right portions of my brain along with my intellect and all that you had helped me to plan and execute today. I surrender every imagination and desire that crossed my mind as well as the painful memories in connection with various people and situations.</li>
                    <li>Lord, I surrender my neck, left and right shoulders and hands along with every single action that I have done: worked/typed/texted/browsed.</li>
                    <li>I surrender my chest along with all my heart's desires. I surrender all that I have: my possessions, good friendships. I also surrender all attachments and distractions.</li>
                    <li>I surrender my entire heart, back, stomach, all my internal organs, waist, thighs, left and right legs and all the bodily ailments with which I am struggling.</li>
                    <li>Lord, I surrender from the crown of my head to the sole of my feet, every single cell of my body.</li>
                    <li>Lord, I surrender everything that happened today. (We surrender every event of that day, both positive and negative, along with everything that we want the Lord to touch and transform. A hymn of surrendering may be sung. If we are praying for a particular need of the community or society, we surrender that situation and the people involved at the foot the cross.)</li>
                  </ul>
                </div>
              </section>

              {/* PARDON */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   PARDON
                </h3>
                <p className="leading-relaxed text-justify">
                  Lord, I believe that you will give me the strength that I need to let go of all that I have surrendered and make a difference in my life. With a sincere heart, I ask your pardon, Lord. I have made mistakes and messed up my life. I have failed in achieving the goal for my ministry that you have in your mind. Lord, I am sorry for the thoughts, words and deeds that did not align with your plan. I have hurt you in many ways. I have also hurt and wounded my neighbour. I failed to recognize the individuals as your messengers in my life. With all my brokenness, I ask for your forgiveness, Lord. I am sorry for taking my life lightly.
                </p>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                  <p className="italic text-justify">
                    "As I ask for your pardon, Lord, I forgive all those persons who have hurt me in one way or another. I know it is not easy, but it is going to be made easy with your power. In the name of Jesus, I forgive everyone who has hurt me since my birth till this moment. If I fail to forgive those individuals, I will fail to experience your power in my life and it will prevent me from becoming a channel of your grace. I take the risk of forgiving every individual. In your name, my loving Lord, I forgive every individual who has hurt me till today. In your name, my Lord, I forgive. May your precious blood come upon me, wash and cleanse me, Lord."
                  </p>
                </div>
                <p className="leading-relaxed text-justify">
                  There is power, healing, forgiveness and renewal in your precious blood, Jesus. May your most precious blood that you shed on the cross come with its mighty anointing power upon me. Let it fall upon my forehead and flow down like a mighty rain. Let it fall upon me and flow to my eyes... ears... nose... cheeks... lips... tongue... brain... neck... shoulders... hands... elbows... inner palm... fingers... chest... back... stomach... waist... thighs... knees... legs... into all my attachments... friendships... and to every single cell of my entire being.
                </p>
                <p className="leading-relaxed text-justify">
                  May I be drenched in your precious blood, Lord. May I be healed from everything that I have seen, heard and spoken. May I be cleansed from improper conversations, thoughts, painful memories, insults, disappointments and addictions. May my sinful past be cleansed with your precious blood, Lord. May your precious blood mingle with my blood, both externally and internally. May your precious blood enter into all those areas in which I am struggling, and heal everything.
                </p>
                <p className="leading-relaxed italic border-l-2 border-sacred-red pl-3 text-justify">
                  Trusting in the power of your Most Precious Blood, I say, 'In the name of Jesus, in the most precious blood of Jesus, through the intercession and assistance of Mother Mary, Saint Michael, Saint Gabriel and all the saints and angels, every form of evil powers and bondages that are trying to afflict me, get out of me and my surroundings and get lost into the eternal fire of hell and never to return to me again. May your precious blood, O Lord, protect me by surrounding me totally. May I be healed and sealed in the blood of Jesus.' (We may say it three times making the sign of the cross on our forehead, eyes, mouth, hands, chest, etc.)
                </p>
                <div className="bg-stone-50 dark:bg-stone-800 p-3 rounded-lg">
                  <p className="font-bold mt-2">Renunciations:</p>
                  <p className="mb-2">My dear Jesus, trusting in your name, I wish to renounce everything in my life that prevents me from being united with you.</p>
                  <ul className="list-none space-y-1 pl-2 mb-4">
                     <li>• In the name of Jesus, and through the power of his most precious blood, I renounce my attachment to............</li>
                     <li>• In the name of Jesus, and through the power of his most precious blood, I renounce my habit of.............</li>
                     <li>• In the name of Jesus, and through the power of his most precious blood, I renounce my fear of.............</li>
                  </ul>
                  <p className="font-bold mt-2">Forgiveness:</p>
                  <p className="mb-2">My loving Jesus, as I ask your forgiveness for my failures, I also forgive everyone who hurt me or put me down till today. (Though it may not be easy to forgive some people, trusting in the power of God, we extend forgiveness to those who hurt us.)</p>
                  <ul className="list-none space-y-1 pl-2">
                     <li>• In the name of Jesus, and through the power of his most precious blood, I forgive (mention the name of the person) who hurt me.</li>
                     <li>• In the name of Jesus, and through the power of his most precious blood, I forgive (mention the name of the person) who insulted me.</li>
                     <li>• In the name of Jesus, and through the power of his most precious blood, I forgive (mention the name of the person) who betrayed me.</li>
                     <li>• And so on....</li>
                  </ul>
                </div>
              </section>

              {/* PRAISE */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   PRAISE
                </h3>
                <p className="leading-relaxed text-justify">
                  Lord, you have washed, renewed and cleansed me of so many struggles with which I was struggling. Being aware of the blessings that you have given me and experiencing the joy within, I lift up my hands and praise you, Lord.
                </p>
                <p className="italic text-stone-500 text-justify">
                  Alleluia.... Praise you, Jesus... Thank you, Jesus... Praise the Lord ... Alleluia. May each cell in my body praise you, Jesus. Lord, I praise you, I worship you... Alleluia.... (We shall spend a few moments praising the Lord spontaneously. Those of us who have the gift of tongues may praise the Lord in tongues. A hymn of praise may be sung.
                </p>
                <p className="leading-relaxed text-justify">
                   Lord, I want to praise you more, but I am not able to praise you. Holy Spirit Lord, come upon me powerfully. Breathe into me... come with your anointing power... come Holy Spirit, Lord, with your fruits, gifts and charisms.
                </p>
              </section>

              {/* INTERCESSION */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   INTERCESSION
                </h3>
                <p className="leading-relaxed text-justify">
                  Lord, I surrender those persons whom I have hurt and who have hurt me. Bless them, Lord. Heal and cleanse them. May they know your holy will in their lives and put it into practice. May they turn out to be your channels of grace. Lord, I surrender them and pray for their well-being.
                </p>
                <p className="leading-relaxed font-medium text-justify">
                  Lord, today in a special way, I remember and pray for.... (We shall place before the Lord those for whom we wish to pray and continue to praise the Lord).
                </p>
              </section>

              {/* NEW LIFE */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   NEW LIFE
                </h3>
                <p className="leading-relaxed text-justify">
                  Jesus, I love you with all my heart. I know you love me very deeply, and I trust that your plan for me is full of goodness and grace. Lord, I want to live my life for you. I want to be the person you created me to be.
                </p>
                <p className="leading-relaxed text-justify">
                   With your grace, I am ready to start fresh. Tomorrow, I will walk in your light, living in your presence, always remembering your love for me. I want every moment of my day to reflect my gratitude to you. Like the psalmist, I will proclaim your love each morning as I wake up, and your praise will remain on my lips throughout the day.
                </p>
                <p className="leading-relaxed text-justify">
                   At night, as I lay down to rest, I will think of you and your faithfulness. You will abide in my thoughts and my heart will find peace in your presence. Lord, I want every breath I take to be my offering of thanksgiving and every step I take to be in tune with your will.
                </p>
                <p className="italic text-stone-500" style={{ fontSize: '0.9em' }}>
                   (We shall spend some time discussing with Jesus, the newness we wish to bring into our life the following day, based on what we have surrendered and asked pardon for.)
                </p>
              </section>

              {/* GOOD ACTION / GIFT */}
              <section className="space-y-3">
                <h3 className="font-bold text-sacred-red flex items-center gap-2" style={{ fontSize: '1.2em' }}>
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   GOOD ACTION
                </h3>
                <p className="leading-relaxed text-justify">
                  Thank you, Jesus, for renewing my heart and giving me the strength to begin again. With you by my side, I will live each day in love, praising you, and trusting your grace to guide me. I am yours, Lord—today, tomorrow, and forever.
                </p>
                <p className="italic text-stone-500 text-justify" style={{ fontSize: '0.9em' }}>
                  (We will choose one specific action from the various intentions we reflected on in the previous step and offer it as a promise to Jesus. This will be our small gift to Him, something we will strive to carry out the following day. In the evening, at the beginning of TAPPING, we will bring this offering before Him, sharing it as an expression of our love and dedication.)
                </p>
                <div className="glass-panel p-4 rounded-xl bg-gold-accent/5 border border-gold-accent/20">
                   <p className="font-bold text-stone-800 dark:text-stone-200 mb-2">My Promise to Jesus:</p>
                   <p className="italic leading-relaxed">
                     "Lord, I promise to do this good action, i.e. ... and bring it to you tomorrow as a loving gift. Thank you, Lord."
                   </p>
                </div>
              </section>

            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-md text-center">
               <button 
                 onClick={() => setShowTappingModal(false)}
                 className="bg-sacred-red text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors active:scale-95"
               >
                 Close Prayer
               </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer for bottom nav */}
      <div className="h-4" />
    </div>
  );
};

export default Home;