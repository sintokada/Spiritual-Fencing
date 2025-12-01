export interface Activity {
  id: string;
  name: string;
  order: number;
}

export interface DailyLog {
  date: string; // ISO Date string YYYY-MM-DD
  scores: Record<string, number>; // activityId -> score (0-10)
}

export interface AppSettings {
  notificationsEnabled: boolean;
  notificationTime: string; // HH:mm format
  darkMode: boolean;
}

export interface AppData {
  activities: Activity[];
  logs: Record<string, DailyLog>; // Keyed by date string
  reflections: Record<string, string>; // Keyed by Month string (YYYY-MM)
  settings: AppSettings;
}