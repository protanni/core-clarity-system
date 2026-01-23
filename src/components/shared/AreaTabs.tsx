import { LifeArea } from "@/types";
import { cn } from "@/lib/utils";

interface AreaTabsProps {
  selectedArea: LifeArea;
  onAreaChange: (area: LifeArea) => void;
  className?: string;
}

const areas: { value: LifeArea; label: string }[] = [
  { value: "all", label: "All" },
  { value: "health", label: "Health" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "mind", label: "Mind" },
];

export function AreaTabs({ selectedArea, onAreaChange, className }: AreaTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 bg-muted/50 rounded-lg overflow-x-auto",
        className
      )}
    >
      {areas.map((area) => (
        <button
          key={area.value}
          onClick={() => onAreaChange(area.value)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
            selectedArea === area.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {area.label}
        </button>
      ))}
    </div>
  );
}
