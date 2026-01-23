export type LifeArea = "all" | "work" | "personal" | "mind" | "body" | "relationships";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  area?: LifeArea;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // ISO date strings
  area?: LifeArea;
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

export interface WeeklyReflection {
  id: string;
  weekStartDate: string; // ISO date of week start
  wentWell?: string;
  nextWeekFocus?: string;
  createdAt: string;
}
