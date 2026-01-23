import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Habit, LifeArea } from "@/types";
import { HabitItem } from "@/components/habits/HabitItem";
import { AreaTabs } from "@/components/shared/AreaTabs";
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

export default function HabitsPage() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("protanni-habits", []);
  const [newHabitName, setNewHabitName] = useState("");
  const [selectedArea, setSelectedArea] = useState<LifeArea>("all");

  const today = getTodayISO();

  // Filter habits by selected area
  const filteredHabits = useMemo(() => {
    if (selectedArea === "all") return habits;
    return habits.filter((h) => h.area === selectedArea);
  }, [habits, selectedArea]);

  const habitsWithStatus = useMemo(
    () =>
      filteredHabits.map((h) => ({
        ...h,
        completedToday: h.completedDates.includes(today),
      })),
    [filteredHabits, today]
  );

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: newHabitName.trim(),
      completedDates: [],
      area: selectedArea === "all" ? undefined : selectedArea,
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
  const totalCompletedToday = habits.filter((h) => h.completedDates.includes(today)).length;

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
          {totalCompletedToday} of {habits.length} completed today
        </p>
      </motion.header>

      {/* Area Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <AreaTabs selectedArea={selectedArea} onAreaChange={setSelectedArea} />
      </motion.div>

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
          placeholder={selectedArea === "all" ? "Add a new habit..." : `Add a ${selectedArea} habit...`}
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
                onToggle={() => handleToggle(habit.id)}
                onDelete={() => handleDelete(habit.id)}
                showDelete
                showProgress
                showArea={selectedArea === "all"}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div variants={item} className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              {selectedArea === "all"
                ? "No habits yet. Add one above."
                : `No ${selectedArea} habits yet.`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
