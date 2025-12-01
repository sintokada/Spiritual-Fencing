import { AppData, Activity } from './types';

export const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'holymass', name: 'Holymass', order: 0 },
  { id: 'bible', name: '30 Minutes Bible Reading', order: 1 },
  { id: 'tapping', name: 'TAPPING', order: 2 },
  { id: 'rosary', name: 'Rosary', order: 3 },
  { id: 'meditation', name: 'Meditation (writing)', order: 4 },
  { id: 'protection', name: 'Protection Prayers', order: 5 },
  { id: 'helping', name: 'Helping A Person', order: 6 },
  { id: 'reading', name: 'Spiritual Reading/Listening (Min 15 Minutes)', order: 7 },
  { id: 'physical', name: 'Physical Activity', order: 8 },
  { id: 'learning', name: 'Learning a New Thing (Min 15 Minutes)', order: 9 },
];

// Helper to seed the specific sample data provided in the prompt
export const INITIAL_LOGS: Record<string, any> = {
  // June 2025 Data
  '2025-06-23': { holymass: 6, bible: 0, tapping: 5, rosary: 5, meditation: 0, protection: 2, helping: 0, reading: 0, physical: 0, learning: 0 },
  '2025-06-24': { holymass: 7, bible: 7, tapping: 7, rosary: 5, meditation: 0, protection: 8, helping: 1, reading: 0, physical: 0, learning: 2 },
  '2025-06-25': { holymass: 8, bible: 1, tapping: 3, rosary: 5, meditation: 0, protection: 8, helping: 0, reading: 0, physical: 0, learning: 8 },
  '2025-06-26': { holymass: 5, bible: 8, tapping: 0, rosary: 6, meditation: 0, protection: 5, helping: 5, reading: 9, physical: 0, learning: 0 },
  '2025-06-27': { holymass: 7, bible: 8, tapping: 8, rosary: 8, meditation: 0, protection: 7, helping: 0, reading: 0, physical: 0, learning: 9 },
  '2025-06-28': { holymass: 7, bible: 3, tapping: 8, rosary: 7, meditation: 0, protection: 8, helping: 0, reading: 0, physical: 0, learning: 1 },
  '2025-06-29': { holymass: 7, bible: 0, tapping: 0, rosary: 5, meditation: 0, protection: 1, helping: 0, reading: 0, physical: 0, learning: 0 },
  '2025-06-30': { holymass: 7, bible: 0, tapping: 0, rosary: 5, meditation: 0, protection: 2, helping: 0, reading: 0, physical: 0, learning: 8 }, 

  // July 2025 Data (Expanded for Export testing)
  '2025-07-01': { holymass: 7, bible: 7, tapping: 1, rosary: 1, meditation: 0, protection: 2, helping: 0, reading: 0, physical: 0, learning: 1 },
  '2025-07-02': { holymass: 7, bible: 7, tapping: 1, rosary: 5, meditation: 0, protection: 5, helping: 0, reading: 0, physical: 0, learning: 0 },
  '2025-07-03': { holymass: 8, bible: 8, tapping: 2, rosary: 6, meditation: 1, protection: 5, helping: 2, reading: 5, physical: 1, learning: 1 },
  '2025-07-04': { holymass: 7, bible: 6, tapping: 2, rosary: 6, meditation: 0, protection: 6, helping: 1, reading: 5, physical: 2, learning: 1 },
};

export const INITIAL_DATA: AppData = {
  activities: DEFAULT_ACTIVITIES,
  logs: {}, 
  reflections: {},
  settings: {
    notificationsEnabled: false,
    notificationTime: "20:00",
    darkMode: false
  }
};