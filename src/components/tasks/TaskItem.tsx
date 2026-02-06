import { motion } from "framer-motion";
import { Trash2, ArrowUpRight, X, Sun } from "lucide-react";
import { Task } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { AreaTag } from "@/components/shared/AreaTag";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete?: () => void;
  onBringToToday?: () => void;
  onRemoveFromToday?: () => void;
  showDelete?: boolean;
  showArea?: boolean;
  showTodayBadge?: boolean;
  isInToday?: boolean;
  disabled?: boolean;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onBringToToday,
  onRemoveFromToday,
  showDelete = false,
  showArea = false,
  showTodayBadge = false,
  isInToday = false,
  disabled = false,
}: TaskItemProps) {
  return (
    <motion.div
      layout
      className={cn("flex items-center gap-3 p-4 group", disabled && "opacity-60")}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={onToggle}
        disabled={disabled}
        className={cn(
          "h-5 w-5 rounded-full border-2 transition-colors",
          disabled && "cursor-not-allowed",
          task.completed
            ? "border-primary bg-primary data-[state=checked]:bg-primary"
            : "border-muted-foreground/30 hover:border-primary/50"
        )}
      />
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span
          className={cn(
            "text-sm transition-all duration-200",
            task.completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          )}
        >
          {task.text}
        </span>
        {showArea && task.area && <AreaTag area={task.area} />}
        {showTodayBadge && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">
            <Sun className="w-2.5 h-2.5" />
            Today
          </span>
        )}
        {isInToday && !showTodayBadge && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">
            <Sun className="w-2.5 h-2.5" />
            Today
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {/* Bring to Today action */}
        {onBringToToday && !task.completed && (
          <button
            onClick={onBringToToday}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            title="Bring to Today"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        )}
        {/* Remove from Today action */}
        {onRemoveFromToday && !task.completed && (
          <button
            onClick={onRemoveFromToday}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-muted-foreground/70 hover:bg-muted transition-all"
            title="Remove from Today"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {showDelete && onDelete && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
