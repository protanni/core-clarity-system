import { motion } from "framer-motion";
import { Smile, Meh, Frown } from "lucide-react";
import { MoodLevel } from "@/types";
import { cn } from "@/lib/utils";

interface MoodCardProps {
  level: MoodLevel;
  isSelected: boolean;
  onSelect: () => void;
  size?: "small" | "large";
}

const moodConfig: Record<
  MoodLevel,
  { label: string; icon: typeof Smile; bgClass: string; textClass: string }
> = {
  great: {
    label: "Great",
    icon: Smile,
    bgClass: "bg-mood-great",
    textClass: "text-mood-great-foreground",
  },
  good: {
    label: "Good",
    icon: Smile,
    bgClass: "bg-mood-good",
    textClass: "text-mood-good-foreground",
  },
  neutral: {
    label: "Okay",
    icon: Meh,
    bgClass: "bg-mood-neutral",
    textClass: "text-mood-neutral-foreground",
  },
  low: {
    label: "Low",
    icon: Frown,
    bgClass: "bg-mood-low",
    textClass: "text-mood-low-foreground",
  },
  bad: {
    label: "Bad",
    icon: Frown,
    bgClass: "bg-mood-bad",
    textClass: "text-mood-bad-foreground",
  },
};

export function MoodCard({ level, isSelected, onSelect, size = "small" }: MoodCardProps) {
  const config = moodConfig[level];
  const Icon = config.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "w-full flex flex-col items-center justify-center rounded-xl transition-all duration-200",
        config.bgClass,
        size === "large" ? "p-4 gap-2" : "p-3 gap-1.5",
        isSelected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg"
          : "hover:shadow-md"
      )}
    >
      <Icon
        className={cn(
          config.textClass,
          size === "large" ? "w-6 h-6" : "w-5 h-5"
        )}
        strokeWidth={1.5}
      />
      <span
        className={cn(
          "font-medium",
          config.textClass,
          size === "large" ? "text-xs" : "text-[10px]"
        )}
      >
        {config.label}
      </span>
    </motion.button>
  );
}
