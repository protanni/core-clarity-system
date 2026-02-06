import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, Habit, MoodEntry, MoodLevel, WeeklyReflection } from "@/types";
import { formatWeekLabel, getWeekDatesFromStart, moodLabels } from "@/lib/weekUtils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

interface WeekSummary {
  weekStart: string;
  label: string;
  status: "Saved" | "Draft";
  summary: string;
}

export default function WeeklyArchivePage() {
  const [reflections] = useLocalStorage<WeeklyReflection[]>("protanni-weekly-reflections", []);
  const [tasks] = useLocalStorage<Task[]>("protanni-tasks", []);
  const [habits] = useLocalStorage<Habit[]>("protanni-habits", []);
  const [moodEntries] = useLocalStorage<MoodEntry[]>("protanni-mood", []);

  const weeks = useMemo((): WeekSummary[] => {
    // Sort reflections by weekStartDate descending
    const sorted = [...reflections].sort(
      (a, b) => b.weekStartDate.localeCompare(a.weekStartDate)
    );

    return sorted.map((reflection) => {
      const weekDates = getWeekDatesFromStart(reflection.weekStartDate);

      // Status
      const hasContent = !!(reflection.wentWell?.trim() || reflection.nextWeekFocus?.trim());
      const status: "Saved" | "Draft" = hasContent ? "Saved" : "Draft";

      // Dominant mood
      const weekMoods = moodEntries.filter((m) => weekDates.includes(m.date));
      let moodStr = "";
      if (weekMoods.length > 0) {
        const counts: Record<MoodLevel, number> = { great: 0, good: 0, neutral: 0, low: 0, bad: 0 };
        weekMoods.forEach((m) => { counts[m.level]++; });
        let dominant: MoodLevel = "neutral";
        let maxCount = 0;
        (Object.keys(counts) as MoodLevel[]).forEach((level) => {
          if (counts[level] > maxCount) { maxCount = counts[level]; dominant = level; }
        });
        moodStr = `Mood: Mostly ${moodLabels[dominant]}`;
      }

      // Task count for the week
      const taskCount = tasks.filter((t) => {
        const createdDate = t.createdAt.split("T")[0];
        return weekDates.includes(createdDate);
      }).length;

      // Habit completions for the week
      let habitCount = 0;
      habits.forEach((h) => {
        h.completedDates.forEach((d) => {
          if (weekDates.includes(d)) habitCount++;
        });
      });

      const parts: string[] = [];
      if (moodStr) parts.push(moodStr);
      parts.push(`Tasks: ${taskCount}`);
      parts.push(`Habits: ${habitCount}`);

      return {
        weekStart: reflection.weekStartDate,
        label: formatWeekLabel(reflection.weekStartDate),
        status,
        summary: parts.join(" · "),
      };
    });
  }, [reflections, tasks, habits, moodEntries]);

  return (
    <div className="px-1 py-6 space-y-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <Link
          to="/weekly"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Review
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Review Archive</h1>
          <p className="text-sm text-muted-foreground">Browse past weekly summaries.</p>
        </div>
      </motion.header>

      {/* Archive List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {weeks.length > 0 ? (
          weeks.map((week) => (
            <motion.div key={week.weekStart} variants={item}>
              <Link
                to={`/weekly/archive/${week.weekStart}`}
                className="block bg-card rounded-xl p-4 shadow-card border border-border/50 hover:border-border transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {week.label}
                      </span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          week.status === "Saved"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {week.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {week.summary}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex-shrink-0 mt-0.5" />
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.div variants={item} className="text-center py-12">
            <p className="text-sm text-muted-foreground">
              No past reviews yet. Complete a weekly review to see it here.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
