import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MoodEntry, MoodLevel } from "@/types";
import { MoodCard } from "@/components/mood/MoodCard";
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

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export default function MoodPage() {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>("protanni-mood", []);

  const today = getTodayISO();

  const todayMood = useMemo(
    () => moodEntries.find((m) => m.date === today),
    [moodEntries, today]
  );

  const handleMoodSelect = (level: MoodLevel) => {
    setMoodEntries((prev) => {
      const existingIndex = prev.findIndex((m) => m.date === today);
      if (existingIndex >= 0) {
        // Update existing
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], level };
        return updated;
      }
      // Add new
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          level,
          date: today,
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  const handleNoteChange = (note: string) => {
    setMoodEntries((prev) => {
      const existingIndex = prev.findIndex((m) => m.date === today);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], note };
        return updated;
      }
      return prev;
    });
  };

  return (
    <div className="px-1 py-6 space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-2xl font-semibold text-foreground">
          How are you feeling?
        </h1>
        <p className="text-sm text-muted-foreground">
          Take a moment to check in with yourself
        </p>
      </motion.header>

      {/* Mood Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-5 gap-3"
      >
        {(["great", "good", "neutral", "low", "bad"] as MoodLevel[]).map(
          (level) => (
            <motion.div key={level} variants={item}>
              <MoodCard
                level={level}
                isSelected={todayMood?.level === level}
                onSelect={() => handleMoodSelect(level)}
                size="large"
              />
            </motion.div>
          )
        )}
      </motion.div>

      {/* Note Input */}
      {todayMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-3"
        >
          <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Add a note (optional)
          </label>
          <Input
            type="text"
            placeholder="What's on your mind?"
            value={todayMood.note || ""}
            onChange={(e) => handleNoteChange(e.target.value)}
            className="bg-card border-border/50 shadow-card"
          />
        </motion.div>
      )}

      {/* Confirmation */}
      {todayMood && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center pt-4"
        >
          <p className="text-sm text-muted-foreground">
            Your mood has been recorded for today
          </p>
        </motion.div>
      )}
    </div>
  );
}
