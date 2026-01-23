import { LifeArea } from "@/types";
import { cn } from "@/lib/utils";

interface AreaTagProps {
  area: LifeArea;
  className?: string;
}

const areaLabels: Record<LifeArea, string> = {
  all: "All",
  health: "Health",
  work: "Work",
  personal: "Personal",
  mind: "Mind",
};

const areaColors: Record<LifeArea, string> = {
  all: "bg-muted text-muted-foreground",
  health: "bg-green-100/80 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  work: "bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  personal: "bg-amber-100/80 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  mind: "bg-purple-100/80 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export function AreaTag({ area, className }: AreaTagProps) {
  if (area === "all") return null;
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
        areaColors[area],
        className
      )}
    >
      {areaLabels[area]}
    </span>
  );
}
