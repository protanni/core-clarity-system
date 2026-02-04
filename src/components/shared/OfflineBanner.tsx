import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  return (
    <div className="bg-muted/80 backdrop-blur-sm border-b border-border/50 px-4 py-2.5 flex items-center gap-2">
      <WifiOff className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <p className="text-xs text-muted-foreground">
        You're offline. Changes won't be saved.
      </p>
    </div>
  );
}
