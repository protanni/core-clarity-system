export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // ISO date strings
  createdAt: string;
}

export type MoodLevel = "great" | "good" | "neutral" | "low" | "bad";

export interface MoodEntry {
  id: string;
  level: MoodLevel;
  note?: string;
  date: string; // ISO date string
  createdAt: string;
}

export interface DailyFocus {
  text: string;
  date: string; // ISO date string
}
