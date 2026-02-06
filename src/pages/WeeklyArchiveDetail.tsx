import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WeeklyReflection } from "@/types";
import { useWeeklyStats } from "@/hooks/useWeeklyStats";
import { formatWeekLabel, getWeekDatesFromStart } from "@/lib/weekUtils";
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

export default function WeeklyArchiveDetailPage() {
  const { weekStart } = useParams<{ weekStart: string }>();
  const [reflections] = useLocalStorage<WeeklyReflection[]>("protanni-weekly-reflections", []);

  const weekDates = useMemo(
    () => (weekStart ? getWeekDatesFromStart(weekStart) : []),
    [weekStart]
  );

  const stats = useWeeklyStats(weekDates);

  const reflection = useMemo(
    () => reflections.find((r) => r.weekStartDate === weekStart),
    [reflections, weekStart]
  );

  const weekLabel = weekStart ? formatWeekLabel(weekStart) : "";

  return (
    <motion.div
      className="px-1 py-6 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.header variants={item} className="space-y-3">
        <Link
          to="/weekly/archive"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Archive
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">{weekLabel}</h1>
          <p className="text-sm text-muted-foreground">Read-only summary</p>
        </div>
      </motion.header>

      {/* Cards — same layout as current Weekly Review */}
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
          wentWell={reflection?.wentWell}
          nextWeekFocus={reflection?.nextWeekFocus}
          readOnly
        />
      </motion.div>
    </motion.div>
  );
}
