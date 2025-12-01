import { AppData, DailyLog } from '../types';
import { INITIAL_DATA, INITIAL_LOGS } from '../constants';

const STORAGE_KEY = 'eucharistic_fencing_data_v1';

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with INITIAL_DATA to ensure new fields like 'settings' exist
      return {
        ...INITIAL_DATA,
        ...parsed,
        // Ensure nested objects exist
        logs: parsed.logs || {},
        reflections: parsed.reflections || {},
        // Deep merge settings to ensure new keys (like darkMode) are picked up if missing
        settings: {
          ...INITIAL_DATA.settings,
          ...(parsed.settings || {})
        }
      };
    }
    
    // Seed with sample data if fresh load
    const seededLogs: Record<string, DailyLog> = {};
    Object.entries(INITIAL_LOGS).forEach(([date, scores]) => {
      seededLogs[date] = { date, scores };
    });

    const seededData = {
      ...INITIAL_DATA,
      logs: seededLogs,
      reflections: {},
      settings: INITIAL_DATA.settings
    };
    
    saveData(seededData);
    return seededData;
  } catch (e) {
    console.error("Failed to load data", e);
    return INITIAL_DATA;
  }
};

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};