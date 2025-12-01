import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Entry from './pages/Entry';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Guide from './pages/Guide';
import { loadData, saveData } from './services/storageService';
import { AppData, Activity, AppSettings } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [data, setData] = useState<AppData | null>(null);
  const notificationInterval = useRef<number | null>(null);

  // Initial Load
  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
  }, []);

  // Persist whenever data changes
  useEffect(() => {
    if (data) {
      saveData(data);
    }
  }, [data]);

  // Dark Mode Logic
  useEffect(() => {
    if (data?.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data?.settings.darkMode]);

  // Notification Logic
  useEffect(() => {
    if (data?.settings.notificationsEnabled) {
      // Clear existing interval
      if (notificationInterval.current) window.clearInterval(notificationInterval.current);

      notificationInterval.current = window.setInterval(() => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        
        // Simple check: if current time matches setting, and we haven't notified in the last minute (avoid spam)
        // Note: For a robust app, we'd store "lastNotifiedDate" in localStorage
        const lastNotified = localStorage.getItem('last_notification_date');
        const today = now.toDateString();

        if (currentTime === data.settings.notificationTime && lastNotified !== today) {
           if (Notification.permission === "granted") {
             new Notification("Spiritual Fencing", {
               body: "It is time to rate your spiritual activities for today.",
               icon: "/favicon.ico" // Browser default if missing
             });
             localStorage.setItem('last_notification_date', today);
           }
        }
      }, 30000); // Check every 30 seconds
    }

    return () => {
      if (notificationInterval.current) window.clearInterval(notificationInterval.current);
    };
  }, [data?.settings]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSaveEntry = (date: string, scores: Record<string, number>) => {
    if (!data) return;
    setData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        logs: {
          ...prev.logs,
          [date]: { date, scores }
        }
      };
    });
  };

  const handleUpdateReflection = (month: string, text: string) => {
    if (!data) return;
    setData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        reflections: {
          ...prev.reflections,
          [month]: text
        }
      };
    });
  };

  const handleUpdateActivities = (activities: Activity[]) => {
    if (!data) return;
    setData(prev => {
      if (!prev) return null;
      return { ...prev, activities };
    });
  };

  const handleUpdateSettings = (settings: AppSettings) => {
    if (!data) return;
    setData(prev => {
      if (!prev) return null;
      return { ...prev, settings };
    });
  };

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 text-sacred-red font-serif animate-pulse">Loading Spiritual Fencing...</div>;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home data={data} onNavigate={handleNavigate} />;
      case 'guide':
        return <Guide />;
      case 'entry':
        return <Entry data={data} onSave={handleSaveEntry} />;
      case 'reports':
        return <Reports data={data} onUpdateReflection={handleUpdateReflection} />;
      case 'settings':
        return <Settings data={data} onUpdateActivities={handleUpdateActivities} onUpdateSettings={handleUpdateSettings} />;
      default:
        return <Home data={data} onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;