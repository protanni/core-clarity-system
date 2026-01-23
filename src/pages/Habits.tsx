import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Habit } from "@/types";
import { HabitItem } from "@/components/habits/HabitItem";
import { Input } from "@/components/ui/input";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sorted = [...completedDates].sort().reverse();
  const today = getTodayISO();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Check if streak is active (completed today or yesterday)
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;
  let currentDate = new Date(sorted[0]);

  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(currentDate.getTime() - 86400000);
    const prevDateStr = prevDate.toISOString().split("T")[0];

    if (sorted[i] === prevDateStr) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}

export default function HabitsPage() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("protanni-habits", []);
  const [newHabitName, setNewHabitName] = useState("");

  const today = getTodayISO();

  const habitsWithStatus = useMemo(
    () =>
      habits.map((h) => ({
        ...h,
        completedToday: h.completedDates.includes(today),
        streak: calculateStreak(h.completedDates),
      })),
    [habits, today]
  );

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: newHabitName.trim(),
      completedDates: [],
      createdAt: new Date().toISOString(),
    };

    setHabits((prev) => [...prev, newHabit]);
    setNewHabitName("");
  };

  const handleToggle = (habitId: string) => {
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

  const handleDelete = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  const completedCount = habitsWithStatus.filter((h) => h.completedToday).length;

  return (
    <div className="px-1 py-6 space-y-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-semibold text-foreground">Habits</h1>
        <p className="text-sm text-muted-foreground">
          {completedCount} of {habits.length} completed today
        </p>
      </motion.header>

      {/* Add Habit */}
      <motion.form
        onSubmit={handleAddHabit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Input
          type="text"
          placeholder="Add a new habit..."
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          className="pr-10 bg-card border-border/50 shadow-card"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </motion.form>

      {/* Habit List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {habitsWithStatus.length > 0 ? (
          <motion.div
            variants={item}
            className="bg-card rounded-xl shadow-card border border-border/50 divide-y divide-border/50"
          >
            {habitsWithStatus.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                isCompletedToday={habit.completedToday}
                streak={habit.streak}
                onToggle={() => handleToggle(habit.id)}
                onDelete={() => handleDelete(habit.id)}
                showDelete
              />
            ))}
          </motion.div>
        ) : (
          <motion.div variants={item} className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No habits yet. Add one above.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
