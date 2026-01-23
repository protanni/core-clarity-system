import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, Habit, MoodEntry, DailyFocus, MoodLevel } from "@/types";
import { MoodCard } from "@/components/mood/MoodCard";
import { TaskItem } from "@/components/tasks/TaskItem";
import { HabitItem } from "@/components/habits/HabitItem";
import { Input } from "@/components/ui/input";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export default function TodayPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("protanni-tasks", []);
  const [habits, setHabits] = useLocalStorage<Habit[]>("protanni-habits", []);
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>("protanni-mood", []);
  const [dailyFocus, setDailyFocus] = useLocalStorage<DailyFocus | null>("protanni-focus", null);
  
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [focusInput, setFocusInput] = useState("");

  const today = getTodayISO();
  const greeting = getGreeting();
  const dateString = formatDate();

  // Get incomplete tasks (max 3 for preview)
  const openTasks = useMemo(() => tasks.filter((t) => !t.completed).slice(0, 3), [tasks]);

  // Check if habits are completed today
  const habitsWithStatus = useMemo(
    () =>
      habits.slice(0, 3).map((h) => ({
        ...h,
        completedToday: h.completedDates.includes(today),
      })),
    [habits, today]
  );

  // Today's mood
  const todayMood = useMemo(
    () => moodEntries.find((m) => m.date === today),
    [moodEntries, today]
  );

  // Check if focus is for today
  const currentFocus = dailyFocus?.date === today ? dailyFocus.text : "";
  const hasFocus = currentFocus.trim().length > 0;

  const handleStartEditing = () => {
    setFocusInput(currentFocus);
    setIsEditingFocus(true);
  };

  const handleSaveFocus = () => {
    if (focusInput.trim()) {
      setDailyFocus({ text: focusInput.trim(), date: today });
    }
    setIsEditingFocus(false);
  };

  const handleFocusKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveFocus();
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleHabitToggle = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const isCompleted = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: isCompleted
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  const handleMoodSelect = (level: MoodLevel) => {
    setMoodEntries((prev) => {
      const filtered = prev.filter((m) => m.date !== today);
      return [
        ...filtered,
        {
          id: crypto.randomUUID(),
          level,
          date: today,
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  const completedHabitsCount = habitsWithStatus.filter((h) => h.completedToday).length;

  return (
    <motion.div
      className="px-1 py-6 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header with System Framing */}
      <motion.header variants={item} className="space-y-1">
        <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">
          Daily Control Layer
        </p>
        <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
        <p className="text-sm text-muted-foreground">{dateString}</p>
      </motion.header>

      {/* Daily Focus */}
      <motion.section
        variants={item}
        className="bg-card rounded-xl p-5 shadow-card border border-border/50"
      >
        <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Daily Focus
        </label>
        
        {!hasFocus && !isEditingFocus ? (
          <button
            onClick={handleStartEditing}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            <Plus className="w-4 h-4" />
            Set daily focus
          </button>
        ) : isEditingFocus ? (
          <Input
            type="text"
            placeholder="What matters most today?"
            value={focusInput}
            onChange={(e) => setFocusInput(e.target.value)}
            onBlur={handleSaveFocus}
            onKeyDown={handleFocusKeyDown}
            autoFocus
            className="border-0 bg-muted/50 placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        ) : (
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-foreground leading-relaxed">{currentFocus}</p>
            <button
              onClick={handleStartEditing}
              className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Edit focus"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.section>

      {/* Open Tasks */}
      <motion.section variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Open Tasks</h2>
          <Link
            to="/tasks"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border/50 divide-y divide-border/50">
          {openTasks.length > 0 ? (
            openTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleTaskToggle(task.id)}
                showArea
              />
            ))
          ) : (
            <div className="p-5 text-center">
              <p className="text-sm text-muted-foreground">No open tasks</p>
              <Link
                to="/tasks"
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Add a task
              </Link>
            </div>
          )}
        </div>
      </motion.section>

      {/* Habits for Today */}
      <motion.section variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">
            Today's Habits
            {habits.length > 0 && (
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                {completedHabitsCount}/{habitsWithStatus.length}
              </span>
            )}
          </h2>
          <Link
            to="/habits"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-card rounded-xl shadow-card border border-border/50 divide-y divide-border/50">
          {habitsWithStatus.length > 0 ? (
            habitsWithStatus.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                isCompletedToday={habit.completedToday}
                onToggle={() => handleHabitToggle(habit.id)}
                showProgress
              />
            ))
          ) : (
            <div className="p-5 text-center">
              <p className="text-sm text-muted-foreground">No habits yet</p>
              <Link
                to="/habits"
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Add a habit
              </Link>
            </div>
          )}
        </div>
      </motion.section>

      {/* Mood Check-in */}
      <motion.section variants={item} className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-foreground">
            How are you feeling?
          </h2>
          <p className="text-xs text-muted-foreground">
            Emotional signal for today
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {(["great", "good", "neutral", "low", "bad"] as MoodLevel[]).map(
            (level) => (
              <MoodCard
                key={level}
                level={level}
                isSelected={todayMood?.level === level}
                onSelect={() => handleMoodSelect(level)}
              />
            )
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
