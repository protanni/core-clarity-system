import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Archive, Check } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WeeklyReflection } from "@/types";
import { useWeeklyStats } from "@/hooks/useWeeklyStats";
import { getWeekDates, getWeekStartISO } from "@/lib/weekUtils";
import { Button } from "@/components/ui/button";
import { ConsistencyCard } from "@/components/weekly/ConsistencyCard";
import { LifeAreasCard } from "@/components/weekly/LifeAreasCard";
import { EmotionalSummaryCard } from "@/components/weekly/EmotionalSummaryCard";
import { ReflectionCard } from "@/components/weekly/ReflectionCard";

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

export default function WeeklyReviewPage() {
  const [reflections, setReflections] = useLocalStorage<WeeklyReflection[]>(
    "protanni-weekly-reflections",
    []
  );

  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const weekDates = useMemo(() => getWeekDates(), []);
  const weekStart = getWeekStartISO();
  const stats = useWeeklyStats(weekDates);

  // Current week's reflection
  const currentReflection = useMemo(
    () => reflections.find((r) => r.weekStartDate === weekStart),
    [reflections, weekStart]
  );

  const hasContent = !!(
    currentReflection?.wentWell?.trim() || currentReflection?.nextWeekFocus?.trim()
  );

  const handleReflectionChange = (
    field: "wentWell" | "nextWeekFocus",
    value: string
  ) => {
    if (isSaved) setIsSaved(false);

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

  return (
    <motion.div
      className="px-1 py-6 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.header variants={item} className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Weekly Review</h1>
          <Link
            to="/weekly/archive"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Archive className="w-3.5 h-3.5" />
            Archive
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Reflect, realign, and prepare for the next week.
        </p>
      </motion.header>

      {/* Cards */}
      <motion.div variants={item}>
        <ConsistencyCard
          daysShowedUp={stats.daysShowedUp}
          habitCompletions={stats.habitCompletions}
        />
      </motion.div>

      <motion.div variants={item}>
        <LifeAreasCard areasTouched={stats.areasTouched} />
      </motion.div>

      <motion.div variants={item}>
        <EmotionalSummaryCard dominantMood={stats.dominantMood} />
      </motion.div>

      <motion.div variants={item}>
        <ReflectionCard
          wentWell={currentReflection?.wentWell}
          nextWeekFocus={currentReflection?.nextWeekFocus}
          isSaved={isSaved && !isEditing}
          onWentWellChange={(v) => handleReflectionChange("wentWell", v)}
          onNextWeekFocusChange={(v) => handleReflectionChange("nextWeekFocus", v)}
          onEdit={handleEditReview}
        />
      </motion.div>

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
