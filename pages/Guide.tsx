
import React, { useState } from 'react';
import { 
  BookOpen, Shield, Sword, Brain, Lock, RefreshCw, 
  AlertTriangle, Eye, XCircle, Lightbulb, Link as LinkIcon, 
  Hand, ExternalLink, Heart, X, MousePointerClick
} from 'lucide-react';

const Guide: React.FC = () => {
  const [showTappingModal, setShowTappingModal] = useState(false);

  return (
    <div className="space-y-8 pb-8 animate-slide-up relative">
      
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
        {/* Tapping Card - Interactive */}
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
          
          {/* Footer Action */}
          <div className="pt-2 border-t border-sacred-red/10 flex">
            <span className="flex-1 text-center text-[10px] font-bold text-sacred-red bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-sacred-red/10 group-hover:bg-sacred-red group-hover:text-white transition-colors whitespace-nowrap">
              Read Prayer
            </span>
          </div>
        </div>

        {/* Vox Divini Card - Link */}
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

           {/* Footer Action */}
           <div className="flex items-center justify-between pt-2 border-t border-gold-accent/10">
              <span className="text-[10px] font-bold text-gold-accent bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full border border-gold-accent/10 group-hover:bg-gold-accent group-hover:text-white transition-colors">
                Visit Site
              </span>
              <span className="text-[9px] font-medium text-stone-400 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                 Click here <ExternalLink className="w-3 h-3" />
              </span>
           </div>
        </a>
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

      {/* TAPPING PRAYER MODAL */}
      {showTappingModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowTappingModal(false)}></div>
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#F5F5DC] dark:bg-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-slide-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sacred-red/10 rounded-full">
                  <Hand className="w-5 h-5 text-sacred-red" />
                </div>
                <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100">Let Us Do Tapping</h2>
              </div>
              <button onClick={() => setShowTappingModal(false)} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto p-6 space-y-8 text-stone-700 dark:text-stone-300">
              
              {/* THANKSGIVING */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                  THANKSGIVING
                </h3>
                <p className="text-sm leading-relaxed">
                  God, our loving Father, I praise and thank you for this blessed moment. Thank you, Jesus for calling me to be here as your loving daughter/son. Dear Heavenly Father, in this sacred moment, I offer my praise and gratitude to you. I thank you, Jesus, for calling me to be your beloved child. I am grateful for the precious gift of my parents, siblings, relatives, friends and all those who are dear to me.
                </p>
                <p className="text-sm leading-relaxed">
                  Lord, with my whole heart, I want to express my gratitude for every single blessing you have bestowed upon me up to this day. I am filled with thankfulness for the pleasant memories that remind me of your constant presence in my life. I acknowledge that it is only because of your love and grace that I have experienced such blessings. I am certain that every grace-filled experience I have had is a result of your guiding hand and your divine intervention. I am especially thankful for the individuals in my life who have been a reflection of your presence and love. They have been a manifestation of your goodness, kindness and compassion. Their presence has brought me joy, support and encouragement and I am grateful for the ways in which they have touched my life.
                </p>
                <p className="text-sm leading-relaxed">
                  Gracious Lord, I offer my heartfelt gratitude for your unwavering protection even when I stayed away from you. Despite my shortcomings and mistakes, you have always been there to safeguard me. I am deeply thankful for those moments in the past when I could have caused irreparable harm to myself, but your loving hand protected me and kept me safe. In times of sicknesses, failures and accidents, you have been my shield, surrounding me with your divine protection. Your presence has been my refuge, giving me strength and healing. I am grateful for your watchful care and for guiding me through these challenging times.
                </p>
                <p className="text-sm leading-relaxed">
                  Thank you, Lord, for the countless instances where you saved me from shame and humiliation. Your mercy and grace have shielded me from the consequences of my actions and I am humbled by your loving intervention. Without your infinite compassion and forgiveness, I would not be standing here today, experiencing your grace and mercy.
                </p>
                <p className="text-sm leading-relaxed italic border-l-2 border-gold-accent pl-3">
                  Thank you, Father! Thank you, Jesus! Thank you, Holy Spirit! Thank you, Lord, for the food I eat, water I drink and the air I breathe. Thank you, Lord, for my parents, brothers and sisters. Thank you, Lord, for all that happened today...
                </p>
              </section>

              {/* ADORATION */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   ADORATION
                </h3>
                <p className="text-sm leading-relaxed">
                  Oh, Lord, your love knows no bounds and your blessings are beyond measure. I am in awe of your endless mercy and grace. How can I ever thank you sufficiently for all that you have done? As I reflect on the blessings of today, I am humbled by their abundance. Your love is evident in every moment, in every breath I take. The blessings you bestow upon me are countless, too numerous to recount. Your generosity knows no limits and your provision exceeds all expectations.
                </p>
                <p className="text-sm leading-relaxed">
                  Recalling the blessings that I have received today, I realize that I can't remember all of them; I cannot finish counting all of them. All what I can do is to come before you, join with all the angels and saints and bow before you and say, 'Lord, I worship you.'
                </p>
                <p className="text-sm leading-relaxed font-medium text-sacred-red/80">
                  (Let us see ourselves prostrated in worship before Jesus who is on the Eucharistic Heart of Jesus.)
                </p>
                <div className="bg-white/50 dark:bg-stone-800/50 p-4 rounded-xl space-y-3">
                  <p className="text-sm font-bold text-stone-600 dark:text-stone-300">Surrender at the foot of the Eucharistic Heart:</p>
                  <ul className="list-disc pl-5 text-sm space-y-1 marker:text-gold-accent">
                    <li>My entire body, mind and spirit.</li>
                    <li>Left and right eyes, all I have seen.</li>
                    <li>Lips, tongue, words spoken.</li>
                    <li>Ears, everything heard.</li>
                    <li>Brain, intellect, imagination, memories.</li>
                    <li>Neck, shoulders, hands, work done.</li>
                    <li>Chest, heart's desires, possessions.</li>
                    <li>Heart, back, stomach, organs, legs.</li>
                    <li>From crown of head to sole of feet, every single cell.</li>
                    <li>Everything that happened today.</li>
                  </ul>
                </div>
              </section>

              {/* PARDON */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   PARDON
                </h3>
                <p className="text-sm leading-relaxed">
                  Lord, I believe that you will give me the strength that I need to let go of all that I have surrendered and make a difference in my life. With a sincere heart, I ask your pardon, Lord. I have made mistakes and messed up my life. I have failed in achieving the goal for my ministry that you have in your mind. Lord, I am sorry for the thoughts, words and deeds that did not align with your plan. I have hurt you in many ways. I have also hurt and wounded my neighbour. I failed to recognize the individuals as your messengers in my life. With all my brokenness, I ask for your forgiveness, Lord.
                </p>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                  <p className="text-sm italic">
                    "In the name of Jesus, I forgive everyone who has hurt me since my birth till this moment. If I fail to forgive those individuals, I will fail to experience your power in my life..."
                  </p>
                </div>
                <p className="text-sm leading-relaxed">
                  There is power, healing, forgiveness and renewal in your precious blood, Jesus. May your most precious blood come with its mighty anointing power upon me. Let it fall upon my forehead and flow down like a mighty rain... into every single cell of my entire being.
                </p>
                <p className="text-sm font-bold mt-2">Renunciations:</p>
                <ul className="list-none space-y-1 text-sm pl-2">
                   <li>• In the name of Jesus, I renounce my attachment to...</li>
                   <li>• In the name of Jesus, I renounce my habit of...</li>
                   <li>• In the name of Jesus, I renounce my fear of...</li>
                </ul>
              </section>

              {/* PRAISE */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   PRAISE
                </h3>
                <p className="text-sm leading-relaxed">
                  Lord, you have washed, renewed and cleansed me of so many struggles. Being aware of the blessings that you have given me and experiencing the joy within, I lift up my hands and praise you, Lord.
                </p>
                <p className="text-sm italic text-stone-500">
                  Alleluia.... Praise you, Jesus... Thank you, Jesus... Praise the Lord...
                </p>
              </section>

              {/* INTERCESSION */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   INTERCESSION
                </h3>
                <p className="text-sm leading-relaxed">
                  Lord, I surrender those persons whom I have hurt and who have hurt me. Bless them, Lord. Heal and cleanse them. May they know your holy will in their lives and put it into practice.
                </p>
                <p className="text-sm leading-relaxed font-medium">
                  Lord, today in a special way, I remember and pray for... (Place intentions here)
                </p>
              </section>

              {/* NEW LIFE */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   NEW LIFE
                </h3>
                <p className="text-sm leading-relaxed">
                  Jesus, I love you with all my heart. I know you love me very deeply, and I trust that your plan for me is full of goodness and grace. Lord, I want to live my life for you. I want to be the person you created me to be. With your grace, I am ready to start fresh.
                </p>
              </section>

              {/* GOOD ACTION / GIFT */}
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-sacred-red flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                   GOOD ACTION / GIFT
                </h3>
                <div className="glass-panel p-4 rounded-xl bg-gold-accent/5 border border-gold-accent/20">
                   <p className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">My Promise to Jesus:</p>
                   <p className="text-sm italic leading-relaxed">
                     "Lord, I promise to do this good action [mention action] and bring it to you tomorrow as a loving gift. Thank you, Lord."
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
    </div>
  );
};

export default Guide;
