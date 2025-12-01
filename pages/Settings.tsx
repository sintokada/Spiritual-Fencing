import React, { useState } from 'react';
import { AppData, Activity, AppSettings } from '../types';
import { Trash2, Plus, Pencil, Check, X, Bell, Clock, Moon, Sun } from 'lucide-react';

interface SettingsProps {
  data: AppData;
  onUpdateActivities: (activities: Activity[]) => void;
  onUpdateSettings: (settings: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ data, onUpdateActivities, onUpdateSettings }) => {
  const [newActivityName, setNewActivityName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (!newActivityName.trim()) return;
    const newActivity: Activity = {
      id: Date.now().toString(),
      name: newActivityName.trim(),
      order: data.activities.length
    };
    onUpdateActivities([...data.activities, newActivity]);
    setNewActivityName('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure? Previous data for this activity will remain but it will disappear from forms.')) {
      onUpdateActivities(data.activities.filter(a => a.id !== id));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newActivities = [...data.activities];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newActivities.length) {
      [newActivities[index], newActivities[targetIndex]] = [newActivities[targetIndex], newActivities[index]];
      onUpdateActivities(newActivities);
    }
  };

  const startEditing = (activity: Activity) => {
    setEditingId(activity.id);
    setEditName(activity.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const saveEditing = () => {
    if (!editName.trim() || !editingId) return;
    
    const updatedActivities = data.activities.map(act => 
      act.id === editingId ? { ...act, name: editName.trim() } : act
    );
    
    onUpdateActivities(updatedActivities);
    setEditingId(null);
    setEditName('');
  };

  const handleNotificationToggle = () => {
    if (!data.settings.notificationsEnabled) {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            onUpdateSettings({ ...data.settings, notificationsEnabled: true });
          } else {
            alert("Notification permission denied.");
          }
        });
      } else {
        alert("This browser does not support desktop notifications.");
      }
    } else {
      onUpdateSettings({ ...data.settings, notificationsEnabled: false });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...data.settings, notificationTime: e.target.value });
  };

  const handleDarkModeToggle = () => {
    onUpdateSettings({ ...data.settings, darkMode: !data.settings.darkMode });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-8 animate-slide-up">
      <div>
        <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 drop-shadow-sm">Settings</h2>
        <p className="text-stone-500 dark:text-stone-300 font-medium">Manage your spiritual fencing activities</p>
      </div>

      {/* Preferences Section (Glass) */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass">
         <h3 className="text-lg font-bold text-stone-700 dark:text-stone-200 mb-4">Preferences</h3>
         
         <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/5">
               <div className="flex items-center gap-3">
                  {data.settings.darkMode ? <Moon className="text-sacred-red w-6 h-6" /> : <Sun className="text-gold-accent w-6 h-6" />}
                  <div>
                    <h4 className="text-stone-700 dark:text-stone-200 font-bold">Dark Mode</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Adjust appearance for low light</p>
                  </div>
               </div>
               
               <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={!!data.settings.darkMode}
                      onChange={handleDarkModeToggle}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${data.settings.darkMode ? 'bg-indigo-900' : 'bg-stone-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform shadow-md ${data.settings.darkMode ? 'translate-x-6' : ''}`}></div>
                  </div>
               </label>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/5">
               <div className="flex items-center gap-3">
                  <Bell className="text-sacred-red w-6 h-6" />
                  <div>
                    <h4 className="text-stone-700 dark:text-stone-200 font-bold">Daily Reminders</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Get notified to enter your data</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  {data.settings.notificationsEnabled && (
                    <div className="flex items-center gap-2 border-r border-stone-300 dark:border-stone-600 pr-4">
                      <Clock className="w-4 h-4 text-stone-500" />
                      <input 
                        type="time" 
                        value={data.settings.notificationTime}
                        onChange={handleTimeChange}
                        className="bg-transparent border border-stone-300 dark:border-stone-600 rounded px-2 py-1 text-stone-700 dark:text-stone-200 focus:outline-none focus:border-sacred-red text-sm font-bold"
                      />
                    </div>
                  )}

                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={data.settings.notificationsEnabled}
                        onChange={handleNotificationToggle}
                      />
                      <div className={`block w-14 h-8 rounded-full transition-colors ${data.settings.notificationsEnabled ? 'bg-green-600' : 'bg-stone-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform shadow-md ${data.settings.notificationsEnabled ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>
               </div>
            </div>
         </div>
      </div>

      {/* Activities Section (Glass) */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass">
        <h3 className="text-lg font-bold text-stone-700 dark:text-stone-200 mb-4">Activities List</h3>
        
        <div className="space-y-3 mb-8">
          {data.activities.map((activity, index) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 bg-white/40 dark:bg-black/20 rounded-xl border border-white/20 dark:border-white/5 group transition-all duration-200 hover:bg-white/60">
               {editingId !== activity.id && (
                 <div className="flex flex-col gap-1 text-stone-400">
                   <button 
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="hover:text-sacred-red disabled:opacity-30 active:scale-90"
                   >
                     ▲
                   </button>
                   <button 
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === data.activities.length - 1}
                    className="hover:text-sacred-red disabled:opacity-30 active:scale-90"
                   >
                     ▼
                   </button>
                 </div>
               )}

               <div className="flex-1 font-bold text-stone-700 dark:text-stone-200">
                 {editingId === activity.id ? (
                   <input
                     type="text"
                     value={editName}
                     onChange={(e) => setEditName(e.target.value)}
                     className="w-full border border-stone-300 dark:border-stone-600 bg-white/80 dark:bg-stone-800 rounded px-2 py-1 focus:outline-none focus:border-sacred-red focus:ring-1 focus:ring-sacred-red"
                     autoFocus
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') saveEditing();
                       if (e.key === 'Escape') cancelEditing();
                     }}
                   />
                 ) : (
                   <span>{activity.name}</span>
                 )}
               </div>
               
               {editingId === activity.id ? (
                 <>
                    <button 
                      onClick={saveEditing}
                      className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded active:scale-90"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={cancelEditing}
                      className="text-stone-400 hover:text-stone-600 p-2 hover:bg-stone-200 rounded active:scale-90"
                    >
                      <X className="w-5 h-5" />
                    </button>
                 </>
               ) : (
                 <>
                   <button 
                    onClick={() => startEditing(activity)}
                    className="text-stone-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50/50 rounded active:scale-90"
                   >
                     <Pencil className="w-4 h-4" />
                   </button>
                   <button 
                    onClick={() => handleDelete(activity.id)}
                    className="text-stone-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50/50 rounded active:scale-90"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </>
               )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 border-t border-white/20 dark:border-white/10 pt-6">
          <input
            type="text"
            placeholder="New Activity Name..."
            value={newActivityName}
            onChange={(e) => setNewActivityName(e.target.value)}
            className="flex-1 border border-stone-200 dark:border-stone-600 bg-white/50 dark:bg-black/30 text-stone-800 dark:text-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sacred-red/50 placeholder-stone-400 font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="bg-sacred-red text-white px-6 py-2 rounded-xl hover:bg-red-900 transition-all shadow-lg active:scale-95 flex items-center gap-2 font-bold"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;