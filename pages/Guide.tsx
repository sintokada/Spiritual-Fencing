import React from 'react';
import { 
  BookOpen, Shield, Sword, Brain, Lock, RefreshCw, 
  AlertTriangle, Eye, XCircle, Lightbulb, Link as LinkIcon, 
  Hand, ExternalLink, Heart 
} from 'lucide-react';

const Guide: React.FC = () => {
  return (
    <div className="space-y-8 pb-8 animate-slide-up">
      
      {/* 1. Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-sacred-red/10 backdrop-blur-sm rounded-full mb-2 border border-sacred-red/20 animate-pulse-slow">
          <Sword className="w-8 h-8 text-sacred-red" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 leading-tight drop-shadow-sm">
          Spiritual Fencing:<br />
          <span className="text-sacred-red">Guarding Your Mind</span>
        </h1>
        <p className="text-xs font-bold text-gold-accent uppercase tracking-widest">
          Fr. Jerry VM SDB • Sept 1, 2025
        </p>
      </div>

      {/* 2. Why Essential (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            icon: Shield, 
            title: "Mind as Battleground", 
            text: "Thoughts seed sin or holiness. Guard them.",
            ref: "Matt 5:21-28",
            color: "text-red-600"
          },
          { 
            icon: Lock, 
            title: "Build Defenses", 
            text: "Be vigilant in 10 daily areas (prayer, work, etc).",
            ref: "Daily Examen",
            color: "text-amber-600"
          },
          { 
            icon: Heart, 
            title: "Align with God", 
            text: "Prevent chaos, foster peace within.",
            ref: "Col 3:15",
            color: "text-rose-600"
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl shadow-glass border-t-4 border-gold-accent flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
            <item.icon className={`w-8 h-8 ${item.color} mb-3 drop-shadow-sm`} />
            <h3 className="font-bold text-stone-800 dark:text-stone-200 mb-1">{item.title}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2 font-medium">{item.text}</p>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded-full">{item.ref}</span>
          </div>
        ))}
      </div>

      {/* 3. Scriptural Perspectives (Stacked Cards) */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-accent" />
          Scriptural Perspectives
        </h2>
        
        <div className="grid gap-3">
          {[
            { icon: Brain, title: "Origin of Thoughts", text: "Evil comes from the heart.", ref: "Mk 7:20-22" },
            { icon: Lock, title: "Guard Commands", text: "Take every thought captive.", ref: "2 Cor 10:5" },
            { icon: RefreshCw, title: "Renewal", text: "Transform by renewing mind.", ref: "Rom 12:2" },
            { icon: AlertTriangle, title: "Consequences", text: "Flesh vs. Spirit warfare.", ref: "Gal 5:17" }
          ].map((card, idx) => (
            <div key={idx} className="glass-panel flex items-center gap-4 p-4 rounded-xl border-l-4 border-sacred-red shadow-sm hover:bg-white/50 transition-colors">
              <div className="p-2 bg-stone-100 dark:bg-stone-700 rounded-full">
                <card.icon className="w-5 h-5 text-stone-600 dark:text-stone-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">{card.title}</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{card.text}</p>
              </div>
              <span className="text-[10px] font-bold text-gold-accent bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                {card.ref}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Stages Timeline */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass">
        <h2 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-100 mb-6 text-center">
          The 4 Stages of Fencing
        </h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-stone-200 dark:bg-stone-700"></div>
          
          <div className="space-y-8">
            {[
              { icon: Eye, title: "1. Awareness", desc: "Recognize the thought entering.", color: "bg-blue-100 text-blue-600" },
              { icon: XCircle, title: "2. Rejection", desc: "Say NO immediately to sin.", color: "bg-red-100 text-red-600" },
              { icon: Lightbulb, title: "3. Replacement", desc: "Switch focus to God's Word.", color: "bg-yellow-100 text-yellow-600" },
              { icon: LinkIcon, title: "4. Maintenance", desc: "Build habits of holiness.", color: "bg-green-100 text-green-600" }
            ].map((stage, i) => (
              <div key={i} className="relative flex items-center gap-4 group">
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-stone-800 ${stage.color} transform group-hover:scale-110 transition-transform`}>
                  <stage.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 dark:text-stone-200">{stage.title}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Practices (Side by Side) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
          <div className="mb-3 p-2 bg-sacred-red/10 w-fit rounded-lg">
             <Hand className="w-5 h-5 text-sacred-red" />
          </div>
          <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm mb-1">TAPPING</h3>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight font-medium">
            Surrender distractions instantly. "Wash me in your blood, Jesus."
          </p>
        </div>
        <div className="glass-panel p-4 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
           <div className="mb-3 p-2 bg-gold-accent/10 w-fit rounded-lg">
             <BookOpen className="w-5 h-5 text-gold-accent" />
          </div>
          <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm mb-1">Vox Divini</h3>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight font-medium">
            Dwell on God's Word. Let Scripture shape your inner voice.
          </p>
        </div>
      </div>

      {/* 6. Conclusion & Link */}
      <div className="bg-sacred-red text-white p-6 rounded-3xl shadow-xl shadow-sacred-red/20 text-center relative overflow-hidden group">
        {/* Background shine */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
        
        <p className="font-serif italic text-lg mb-6 relative z-10">
          "Do not be conformed to this world, but be transformed by the renewal of your mind."
          <br /><span className="text-xs font-sans not-italic opacity-80 mt-2 block font-bold">— Romans 12:2</span>
        </p>

        <a 
          href="https://voxdivini.in/2025/09/01/the-importance-of-spiritual-fencing-consciously-occupying-the-mind-for-a-transformative-spiritual-journey/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-sacred-red px-6 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Read Full Guide
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Guide;