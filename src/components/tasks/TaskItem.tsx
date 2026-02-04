import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Task } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { AreaTag } from "@/components/shared/AreaTag";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
  showArea?: boolean;
  disabled?: boolean;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  showDelete = false,
  showArea = false,
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
