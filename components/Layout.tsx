import React from 'react';
import { Activity, Settings, Home, Shield, BookOpen, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

// Vector Sacred Heart Logo Component
const SacredHeartLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    {/* Flames */}
    <path d="M50 20C50 20 40 10 35 15C30 20 45 25 45 25" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
    <path d="M50 15C50 15 60 5 65 10C70 15 55 20 55 20" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
    <path d="M50 28V5" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
    {/* Cross */}
    <path d="M50 5V25" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"/>
    <path d="M42 12H58" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"/>
    {/* Heart Body */}
    <path d="M50 90C50 90 85 65 85 45C85 30 70 25 50 40C30 25 15 30 15 45C15 65 50 90 50 90Z" fill="#C8102E" stroke="#880808" strokeWidth="2"/>
    {/* Shine */}
    <path d="M25 45C25 45 30 35 40 38" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'guide', label: 'Guide', icon: BookOpen },
    { id: 'entry', label: '', icon: Shield, isFab: true },
    { id: 'reports', label: 'Reports', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      {/* 1. Background Layer */}
      <div className="fixed inset-0 z-[-1]">
        {/* CSS Gradient: Beige top to Red bottom - Dark mode: Dark Stone to Deep Red */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5DC] to-[#C8102E] dark:from-stone-950 dark:to-[#4a0410] transition-colors duration-500" />
        
        {/* Blurred Jesus Overlay */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-[0.15] mix-blend-multiply dark:mix-blend-overlay dark:opacity-[0.1]"
          style={{ 
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/The_Divine_Mercy_painting.jpg/640px-The_Divine_Mercy_painting.jpg')",
            filter: 'blur(5px)',
            backgroundPosition: 'center 20%' 
          }} 
        />
      </div>

      {/* 2. Header (Fixed Top - Glass) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/30 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/5 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative">
          {/* Absolute Positioned Logo Left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <SacredHeartLogo />
          </div>
          
          {/* Centered Title */}
          <div className="w-full text-center">
             <h1 className="text-lg font-bold text-stone-800 dark:text-stone-100 tracking-wide drop-shadow-sm">Spiritual Fencing</h1>
          </div>

          {/* Spacer/Menu Right (Optional) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 flex justify-end">
            <Menu className="w-6 h-6 text-sacred-dark-red dark:text-sacred-red opacity-0 md:opacity-100" />
          </div>
        </div>
      </header>

      {/* 3. Main Content Area */}
      <main className="flex-1 pt-20 pb-32 px-4 w-full max-w-lg md:max-w-4xl mx-auto">
        {children}
      </main>

      {/* 4. Bottom Navigation (Glassmorphism) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        {/* Curved Glass Background Container */}
        <div className="absolute bottom-0 left-0 right-0 h-24 
          bg-white/70 dark:bg-stone-900/80 
          backdrop-blur-xl border-t border-white/50 dark:border-white/10
          shadow-[0_-8px_32px_rgba(0,0,0,0.1)] rounded-t-[2.5rem]
        "></div>
        
        {/* Navigation Items */}
        <div className="relative flex justify-between items-end px-6 pb-6 h-28 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            
            // Special Rendering for Floating Action Button (Entry)
            if (item.isFab) {
              return (
                <div key={item.id} className="relative -top-6 flex justify-center w-1/5">
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 
                      transition-all duration-300 transform active:scale-95
                      ${isActive 
                        ? 'bg-sacred-red text-gold-accent scale-110 shadow-sacred-red/50 border-[#F5F5DC] dark:border-stone-800' 
                        : 'bg-gradient-to-br from-sacred-red to-red-700 text-white hover:scale-105 border-white/80 dark:border-stone-700'}
                    `}
                  >
                    <item.icon className="w-8 h-8 fill-current drop-shadow-md" />
                  </button>
                </div>
              );
            }

            // Standard Navigation Item with Tactile Feedback
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center w-1/5 pb-1 group active:scale-95 transition-transform duration-150"
              >
                <div className={`
                  p-2 rounded-2xl transition-all duration-300 relative
                  ${isActive ? 'bg-white/50 dark:bg-white/10 shadow-sm' : 'hover:bg-white/30 dark:hover:bg-white/5'}
                `}>
                  <item.icon 
                    className={`w-6 h-6 transition-all duration-300 
                    ${isActive ? 'text-sacred-red dark:text-sacred-red scale-110' : 'text-stone-500 dark:text-stone-400 group-hover:text-gold-accent'}`} 
                  />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sacred-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sacred-red"></span>
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium mt-1 transition-all duration-300
                  ${isActive ? 'text-sacred-red font-bold translate-y-0' : 'text-stone-500 dark:text-stone-500 translate-y-0.5'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;