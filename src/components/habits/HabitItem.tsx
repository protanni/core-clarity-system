import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Habit } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface HabitItemProps {
  habit: Habit;
  isCompletedToday: boolean;
  streak?: number;
  onToggle: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export function HabitItem({
  habit,
  isCompletedToday,
  streak = 0,
  onToggle,
  onDelete,
  showDelete = false,
}: HabitItemProps) {
  return (
    <motion.div
      layout
      className="flex items-center gap-3 p-4 group"
    >
      <Checkbox
        checked={isCompletedToday}
        onCheckedChange={onToggle}
        className={cn(
          "h-5 w-5 rounded-full border-2 transition-colors",
          isCompletedToday
            ? "border-primary bg-primary data-[state=checked]:bg-primary"
            : "border-muted-foreground/30 hover:border-primary/50"
        )}
      />
      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "text-sm transition-all duration-200",
            isCompletedToday ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {habit.name}
        </span>
        {streak > 0 && (
          <span className="ml-2 text-xs text-muted-foreground">
            {streak} day{streak !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}
