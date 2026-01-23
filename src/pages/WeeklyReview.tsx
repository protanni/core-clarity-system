import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, Habit, MoodEntry, MoodLevel, WeeklyReflection } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Pencil } from "lucide-react";

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

function getWeekDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

function getWeekStartISO(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split("T")[0];
}

const moodLabels: Record<MoodLevel, string> = {
  great: "Great",
  good: "Good",
  neutral: "Neutral",
  low: "Low",
  bad: "Bad",
};

export default function WeeklyReviewPage() {
  const [tasks] = useLocalStorage<Task[]>("protanni-tasks", []);
  const [habits] = useLocalStorage<Habit[]>("protanni-habits", []);
  const [moodEntries] = useLocalStorage<MoodEntry[]>("protanni-mood", []);
  const [reflections, setReflections] = useLocalStorage<WeeklyReflection[]>(
    "protanni-weekly-reflections",
    []
  );
  
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const weekDates = useMemo(() => getWeekDates(), []);
  const weekStart = getWeekStartISO();

  // Current week's reflection
  const currentReflection = useMemo(
    () => reflections.find((r) => r.weekStartDate === weekStart),
    [reflections, weekStart]
  );
  
  const hasContent = (currentReflection?.wentWell?.trim() || currentReflection?.nextWeekFocus?.trim());

  // Days with any activity (task completed or habit done)
  const daysShowedUp = useMemo(() => {
    const activeDays = new Set<string>();
    
    tasks.forEach((task) => {
      if (task.completed) {
        // Check if task was created this week
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

  // Total habit completions this week
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

  // Life areas touched this week
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

  // Dominant mood this week
  const dominantMood = useMemo(() => {
    const weekMoods = moodEntries.filter((m) => weekDates.includes(m.date));
    if (weekMoods.length === 0) return null;

    const moodCounts: Record<MoodLevel, number> = {
      great: 0,
      good: 0,
      neutral: 0,
      low: 0,
      bad: 0,
    };

    weekMoods.forEach((m) => {
      moodCounts[m.level]++;
    });

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

  const handleReflectionChange = (field: "wentWell" | "nextWeekFocus", value: string) => {
    // Reset saved state when editing
    if (isSaved) {
      setIsSaved(false);
    }
    
    setReflections((prev) => {
      const existingIndex = prev.findIndex((r) => r.weekStartDate === weekStart);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], [field]: value };
        return updated;
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          weekStartDate: weekStart,
          [field]: value,
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };
  
  const handleSaveReview = () => {
    setIsSaved(true);
    setIsEditing(false);
  };
  
  const handleEditReview = () => {
    setIsEditing(true);
    setIsSaved(false);
  };

  const areaLabels: Record<string, string> = {
    work: "Work",
    personal: "Personal",
    mind: "Mind",
    body: "Body",
    relationships: "Relationships",
  };

  return (
    <motion.div
      className="px-1 py-6 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.header variants={item} className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Weekly Review</h1>
        <p className="text-sm text-muted-foreground">
          Reflect, realign, and prepare for the next week.
        </p>
      </motion.header>

      {/* Consistency Overview */}
      <motion.section
        variants={item}
        className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-3"
      >
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Consistency Overview
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            You showed up <span className="font-medium text-primary">{daysShowedUp}</span> of 7 days.
          </p>
          <p className="text-sm text-foreground">
            Habits practiced: <span className="font-medium text-primary">{habitCompletions}</span> times.
          </p>
        </div>
      </motion.section>

      {/* Life Areas Touched */}
      <motion.section
        variants={item}
        className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-3"
      >
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Life Areas Touched
        </h2>
        {areasTouched.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {["work", "personal", "mind", "body", "relationships"].map((area) => {
              const isTouched = areasTouched.includes(area);
              return (
                <div
                  key={area}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isTouched
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-muted/50 text-muted-foreground/50 border border-transparent"
                  }`}
                >
                  {areaLabels[area]}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Assign areas to tasks and habits to see your life balance.
          </p>
        )}
        {areasTouched.length > 0 && (
          <p className="text-xs text-muted-foreground pt-1">
            Your life is being touched across {areasTouched.length} area{areasTouched.length !== 1 ? "s" : ""}.
          </p>
        )}
      </motion.section>

      {/* Emotional Summary */}
      <motion.section
        variants={item}
        className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-3"
      >
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Emotional Summary
        </h2>
        {dominantMood ? (
          <p className="text-sm text-foreground">
            Your mood this week was mostly:{" "}
            <span className="font-medium text-primary">{moodLabels[dominantMood]}</span>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            No mood entries this week. Check in daily to see your emotional patterns.
          </p>
        )}
      </motion.section>

      {/* Gentle Reflection */}
      <motion.section
        variants={item}
        className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Gentle Reflection
          </h2>
          {isSaved && !isEditing && (
            <button
              onClick={handleEditReview}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          )}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-foreground">What went well this week?</label>
            <Textarea
              placeholder="Take a moment to acknowledge your wins..."
              value={currentReflection?.wentWell || ""}
              onChange={(e) => handleReflectionChange("wentWell", e.target.value)}
              disabled={isSaved && !isEditing}
              className="min-h-[80px] bg-muted/50 border-border/50 resize-none disabled:opacity-70 disabled:cursor-default"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground">What matters most next week?</label>
            <Textarea
              placeholder="Set your intention for the week ahead..."
              value={currentReflection?.nextWeekFocus || ""}
              onChange={(e) => handleReflectionChange("nextWeekFocus", e.target.value)}
              disabled={isSaved && !isEditing}
              className="min-h-[80px] bg-muted/50 border-border/50 resize-none disabled:opacity-70 disabled:cursor-default"
            />
          </div>
        </div>
      </motion.section>

      {/* Save Button / Confirmation */}
      <motion.div variants={item} className="pt-2 pb-4">
        <AnimatePresence mode="wait">
          {isSaved && !isEditing ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center justify-center gap-2 text-sm text-primary"
            >
              <Check className="w-4 h-4" />
              Review saved
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              <Button
                onClick={handleSaveReview}
                disabled={!hasContent}
                className="w-full"
                variant="default"
              >
                Save review
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
