import { MoodLevel } from "@/types";
import { moodLabels } from "@/lib/weekUtils";

interface EmotionalSummaryCardProps {
  dominantMood: MoodLevel | null;
}

export function EmotionalSummaryCard({ dominantMood }: EmotionalSummaryCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-3">
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
    </div>
  );
}
