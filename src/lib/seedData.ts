import { Task, Habit, MoodEntry, MoodLevel, WeeklyReflection } from "@/types";

function pastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function pastISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

function mondayOfWeeksAgo(weeksAgo: number): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today);
  monday.setDate(diff - weeksAgo * 7);
  return monday.toISOString().split("T")[0];
}

export function seedDemoData() {
  // Only seed if no past reflections exist
  const existing = localStorage.getItem("protanni-weekly-reflections");
  const parsed = existing ? JSON.parse(existing) : [];
  if (parsed.length > 1) return; // already seeded

  // --- Weekly Reflections ---
  const reflections: WeeklyReflection[] = [
    ...parsed,
    {
      id: "seed-r1",
      weekStartDate: mondayOfWeeksAgo(1),
      wentWell: "Finished the project proposal ahead of schedule. Had three good gym sessions.",
      nextWeekFocus: "Start the new client onboarding flow and keep up the exercise momentum.",
      createdAt: pastISO(3),
    },
    {
      id: "seed-r2",
      weekStartDate: mondayOfWeeksAgo(2),
      wentWell: "Great conversations with the team. Meditation streak hit 10 days.",
      nextWeekFocus: "Focus on deep work blocks in the morning. Call parents more often.",
      createdAt: pastISO(10),
    },
    {
      id: "seed-r3",
      weekStartDate: mondayOfWeeksAgo(3),
      wentWell: "Read two chapters of the design book. Cooked healthy meals all week.",
      nextWeekFocus: "Prioritize the quarterly review. Try a new yoga class.",
      createdAt: pastISO(17),
    },
    {
      id: "seed-r4",
      weekStartDate: mondayOfWeeksAgo(4),
      createdAt: pastISO(24),
      // Draft — no reflection content
    },
  ];

  localStorage.setItem("protanni-weekly-reflections", JSON.stringify(reflections));

  // --- Tasks ---
  const existingTasks = localStorage.getItem("protanni-tasks");
  const currentTasks: Task[] = existingTasks ? JSON.parse(existingTasks) : [];
  const seedTasks: Task[] = [
    { id: "seed-t1", text: "Write project proposal", completed: true, area: "work", createdAt: pastISO(8) },
    { id: "seed-t2", text: "Review design mockups", completed: true, area: "work", createdAt: pastISO(9) },
    { id: "seed-t3", text: "Buy groceries", completed: true, area: "personal", createdAt: pastISO(10) },
    { id: "seed-t4", text: "Schedule dentist appointment", completed: false, area: "body", createdAt: pastISO(12) },
    { id: "seed-t5", text: "Read design book ch. 3-4", completed: true, area: "mind", createdAt: pastISO(18) },
    { id: "seed-t6", text: "Plan weekend hike", completed: true, area: "body", createdAt: pastISO(20) },
    { id: "seed-t7", text: "Send thank-you notes", completed: true, area: "relationships", createdAt: pastISO(15) },
    { id: "seed-t8", text: "Update portfolio site", completed: false, area: "work", createdAt: pastISO(22) },
    { id: "seed-t9", text: "Meal prep Sunday", completed: true, area: "body", createdAt: pastISO(25) },
    { id: "seed-t10", text: "Call parents", completed: true, area: "relationships", createdAt: pastISO(26) },
  ];
  localStorage.setItem("protanni-tasks", JSON.stringify([...currentTasks, ...seedTasks]));

  // --- Habits ---
  const existingHabits = localStorage.getItem("protanni-habits");
  const currentHabits: Habit[] = existingHabits ? JSON.parse(existingHabits) : [];
  const seedHabits: Habit[] = [
    {
      id: "seed-h1", name: "Meditate 10 min", area: "mind", createdAt: pastISO(28),
      completedDates: [pastDate(3), pastDate(4), pastDate(5), pastDate(8), pastDate(9), pastDate(10), pastDate(11), pastDate(15), pastDate(16), pastDate(17), pastDate(18), pastDate(19), pastDate(22), pastDate(24), pastDate(25)],
    },
    {
      id: "seed-h2", name: "Exercise", area: "body", createdAt: pastISO(28),
      completedDates: [pastDate(4), pastDate(6), pastDate(9), pastDate(11), pastDate(13), pastDate(16), pastDate(18), pastDate(20), pastDate(23), pastDate(25), pastDate(27)],
    },
    {
      id: "seed-h3", name: "Read 20 pages", area: "mind", createdAt: pastISO(28),
      completedDates: [pastDate(3), pastDate(5), pastDate(8), pastDate(10), pastDate(15), pastDate(17), pastDate(22), pastDate(24)],
    },
    {
      id: "seed-h4", name: "Journal", area: "personal", createdAt: pastISO(28),
      completedDates: [pastDate(4), pastDate(5), pastDate(9), pastDate(10), pastDate(11), pastDate(16), pastDate(17), pastDate(23), pastDate(24), pastDate(25)],
    },
  ];
  localStorage.setItem("protanni-habits", JSON.stringify([...currentHabits, ...seedHabits]));

  // --- Mood Entries ---
  const existingMood = localStorage.getItem("protanni-mood");
  const currentMood: MoodEntry[] = existingMood ? JSON.parse(existingMood) : [];
  const moods: { daysAgo: number; level: MoodLevel }[] = [
    { daysAgo: 3, level: "good" }, { daysAgo: 4, level: "great" }, { daysAgo: 5, level: "good" },
    { daysAgo: 6, level: "neutral" }, { daysAgo: 8, level: "good" }, { daysAgo: 9, level: "great" },
    { daysAgo: 10, level: "great" }, { daysAgo: 11, level: "good" }, { daysAgo: 12, level: "neutral" },
    { daysAgo: 15, level: "good" }, { daysAgo: 16, level: "neutral" }, { daysAgo: 17, level: "low" },
    { daysAgo: 18, level: "good" }, { daysAgo: 19, level: "good" }, { daysAgo: 22, level: "neutral" },
    { daysAgo: 23, level: "low" }, { daysAgo: 24, level: "neutral" }, { daysAgo: 25, level: "good" },
    { daysAgo: 26, level: "bad" },
  ];
  const seedMood: MoodEntry[] = moods.map((m, i) => ({
    id: `seed-m${i}`,
    level: m.level,
    date: pastDate(m.daysAgo),
    createdAt: pastISO(m.daysAgo),
  }));
  localStorage.setItem("protanni-mood", JSON.stringify([...currentMood, ...seedMood]));
}
