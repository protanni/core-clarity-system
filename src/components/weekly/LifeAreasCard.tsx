import { areaLabels } from "@/lib/weekUtils";

const allAreas = ["work", "personal", "mind", "body", "relationships"];

interface LifeAreasCardProps {
  areasTouched: string[];
}

export function LifeAreasCard({ areasTouched }: LifeAreasCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-3">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Life Areas Touched
      </h2>
      {areasTouched.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2">
            {allAreas.map((area) => {
              const isTouched = areasTouched.includes(area);
              return (
                <div
                  key={area}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isTouched
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-muted/50 text-muted-foreground/50 border border-transparent"
                  }`}
                >
                  {areaLabels[area]}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            Your life is being touched across {areasTouched.length} area
            {areasTouched.length !== 1 ? "s" : ""}.
          </p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Assign areas to tasks and habits to see your life balance.
        </p>
      )}
    </div>
  );
}
