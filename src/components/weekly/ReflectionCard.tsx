import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ReflectionCardProps {
  wentWell?: string;
  nextWeekFocus?: string;
  readOnly?: boolean;
  isSaved?: boolean;
  onWentWellChange?: (value: string) => void;
  onNextWeekFocusChange?: (value: string) => void;
  onEdit?: () => void;
}

export function ReflectionCard({
  wentWell = "",
  nextWeekFocus = "",
  readOnly = false,
  isSaved = false,
  onWentWellChange,
  onNextWeekFocusChange,
  onEdit,
}: ReflectionCardProps) {
  const isDisabled = readOnly || (isSaved && !readOnly);

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Gentle Reflection
        </h2>
        {isSaved && !readOnly && onEdit && (
          <button
            onClick={onEdit}
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
          {readOnly ? (
            <p className="text-sm text-muted-foreground leading-relaxed min-h-[40px]">
              {wentWell || "—"}
            </p>
          ) : (
            <Textarea
              placeholder="Take a moment to acknowledge your wins..."
              value={wentWell}
              onChange={(e) => onWentWellChange?.(e.target.value)}
              disabled={isDisabled}
              className="min-h-[80px] bg-muted/50 border-border/50 resize-none disabled:opacity-70 disabled:cursor-default"
            />
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-foreground">What matters most next week?</label>
          {readOnly ? (
            <p className="text-sm text-muted-foreground leading-relaxed min-h-[40px]">
              {nextWeekFocus || "—"}
            </p>
          ) : (
            <Textarea
              placeholder="Set your intention for the week ahead..."
              value={nextWeekFocus}
              onChange={(e) => onNextWeekFocusChange?.(e.target.value)}
              disabled={isDisabled}
              className="min-h-[80px] bg-muted/50 border-border/50 resize-none disabled:opacity-70 disabled:cursor-default"
            />
          )}
        </div>
      </div>
    </div>
  );
}
