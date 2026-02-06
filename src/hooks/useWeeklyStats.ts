import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Task, Habit, MoodEntry, MoodLevel } from "@/types";

export interface WeeklyStats {
  daysShowedUp: number;
  habitCompletions: number;
  areasTouched: string[];
  dominantMood: MoodLevel | null;
}

export function useWeeklyStats(weekDates: string[]): WeeklyStats {
  const [tasks] = useLocalStorage<Task[]>("protanni-tasks", []);
  const [habits] = useLocalStorage<Habit[]>("protanni-habits", []);
  const [moodEntries] = useLocalStorage<MoodEntry[]>("protanni-mood", []);

  const daysShowedUp = useMemo(() => {
    const activeDays = new Set<string>();
    tasks.forEach((task) => {
      if (task.completed) {
        const createdDate = task.createdAt.split("T")[0];
        if (weekDates.includes(createdDate)) {
          activeDays.add(createdDate);
        }
      }
    });
    habits.forEach((habit) => {
      habit.completedDates.forEach((date) => {
        if (weekDates.includes(date)) {
          activeDays.add(date);
        }
      });
    });
    return activeDays.size;
  }, [tasks, habits, weekDates]);

  const habitCompletions = useMemo(() => {
    let count = 0;
    habits.forEach((habit) => {
      habit.completedDates.forEach((date) => {
        if (weekDates.includes(date)) {
          count++;
        }
      });
    });
    return count;
  }, [habits, weekDates]);

  const areasTouched = useMemo(() => {
    const areas = new Set<string>();
    tasks.forEach((task) => {
      if (task.area && task.area !== "all") {
        const createdDate = task.createdAt.split("T")[0];
        if (weekDates.includes(createdDate) || task.completed) {
          areas.add(task.area);
        }
      }
    });
    habits.forEach((habit) => {
      if (habit.area && habit.area !== "all") {
        const hasCompletionThisWeek = habit.completedDates.some((d) =>
          weekDates.includes(d)
        );
        if (hasCompletionThisWeek) {
          areas.add(habit.area);
        }
      }
    });
    return Array.from(areas);
  }, [tasks, habits, weekDates]);

  const dominantMood = useMemo(() => {
    const weekMoods = moodEntries.filter((m) => weekDates.includes(m.date));
    if (weekMoods.length === 0) return null;

    const moodCounts: Record<MoodLevel, number> = {
      great: 0, good: 0, neutral: 0, low: 0, bad: 0,
    };
    weekMoods.forEach((m) => { moodCounts[m.level]++; });

    let dominant: MoodLevel = "neutral";
    let maxCount = 0;
    (Object.keys(moodCounts) as MoodLevel[]).forEach((level) => {
      if (moodCounts[level] > maxCount) {
        maxCount = moodCounts[level];
        dominant = level;
      }
    });
    return dominant;
  }, [moodEntries, weekDates]);

  return { daysShowedUp, habitCompletions, areasTouched, dominantMood };
}
