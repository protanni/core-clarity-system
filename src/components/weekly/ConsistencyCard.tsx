interface ConsistencyCardProps {
  daysShowedUp: number;
  habitCompletions: number;
}

export function ConsistencyCard({ daysShowedUp, habitCompletions }: ConsistencyCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-3">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Consistency Overview
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-foreground">
          You showed up <span className="font-medium text-primary">{daysShowedUp}</span> of 7 days.
        </p>
        <p className="text-sm text-foreground">
          Habits practiced: <span className="font-medium text-primary">{habitCompletions}</span> times.
        </p>
      </div>
    </div>
  );
}
