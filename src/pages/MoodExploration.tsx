import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Meh, Frown, ChevronRight, Home, CheckSquare, Repeat, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

type MoodLevel = "great" | "good" | "neutral" | "low" | "bad";
type MoodState = "empty" | "expanded" | "saved";

const moods: { level: MoodLevel; label: string; icon: typeof Smile; colorClass: string; bgClass: string }[] = [
  { level: "great", label: "Great", icon: Smile, colorClass: "text-mood-great-foreground", bgClass: "bg-mood-great" },
  { level: "good", label: "Good", icon: Smile, colorClass: "text-mood-good-foreground", bgClass: "bg-mood-good" },
  { level: "neutral", label: "Okay", icon: Meh, colorClass: "text-mood-neutral-foreground", bgClass: "bg-mood-neutral" },
  { level: "low", label: "Low", icon: Frown, colorClass: "text-mood-low-foreground", bgClass: "bg-mood-low" },
  { level: "bad", label: "Bad", icon: Frown, colorClass: "text-mood-bad-foreground", bgClass: "bg-mood-bad" },
];

const navItems = [
  { label: "Today", icon: Home, active: true },
  { label: "Tasks", icon: CheckSquare },
  { label: "Habits", icon: Repeat },
  { label: "Review", icon: CalendarDays },
  { label: "Account", icon: User },
];

/* ─── Phone shell with fixed bottom area ─── */
function PhoneShell({
  children,
  moodSlot,
  label,
}: {
  children: React.ReactNode;
  moodSlot: React.ReactNode;
  label: string;
}) {
  return (
    <div className="w-full max-w-[390px] mx-auto bg-background rounded-[2rem] border border-border shadow-xl overflow-hidden flex flex-col" style={{ height: 720 }}>
      {/* Scrollable content */}
      <div className="flex-1 overflow-auto px-5 py-6 space-y-5">
        {children}
      </div>

      {/* Mood interaction layer — fixed above nav */}
      <div className="flex-shrink-0">
        {moodSlot}
      </div>

      {/* Bottom nav */}
      <nav className="flex-shrink-0 border-t border-border bg-card">
        <div className="flex items-center justify-around h-14">
          {navItems.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} className="flex flex-col items-center gap-0.5">
                <Icon
                  className={cn("w-5 h-5", n.active ? "text-primary" : "text-muted-foreground")}
                  strokeWidth={n.active ? 2.5 : 2}
                />
                <span className={cn("text-[10px] font-medium", n.active ? "text-primary" : "text-muted-foreground")}>
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Label strip */}
      <div className="flex-shrink-0 bg-muted/40 text-center py-1.5 border-t border-border/30">
        <span className="text-[10px] text-muted-foreground font-medium tracking-wide">{label}</span>
      </div>
    </div>
  );
}

/* ─── Today content (shared placeholder) ─── */
function TodayContent() {
  return (
    <>
      <header className="space-y-1">
        <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">Daily Control Layer</p>
        <h1 className="text-xl font-semibold text-foreground">Good morning</h1>
        <p className="text-xs text-muted-foreground">Saturday, March 7</p>
      </header>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Daily Focus</p>
        <p className="text-sm text-foreground">Ship the mood exploration prototype</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-foreground">Today's Tasks</h2>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">All tasks <ChevronRight className="w-3 h-3" /></span>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border/50 divide-y divide-border/50">
          {["Review mood variants", "Finalize motion config", "Update weekly view"].map((t) => (
            <div key={t} className="flex items-center gap-3 px-4 py-3">
              <div className="w-4 h-4 rounded border border-border flex-shrink-0" />
              <span className="text-sm text-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-medium text-foreground">Today's Habits <span className="text-muted-foreground font-normal">1/3</span></h2>
        <div className="bg-card rounded-xl shadow-sm border border-border/50 divide-y divide-border/50">
          {["Morning stretch", "Read 15 min", "Journaling"].map((h) => (
            <div key={h} className="flex items-center gap-3 px-4 py-3">
              <div className="w-4 h-4 rounded-full border border-border flex-shrink-0" />
              <span className="text-sm text-foreground">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Mood check-in layer ─── */
function MoodLayer({
  state,
  selected,
  onTap,
  onSelect,
  onReset,
}: {
  state: MoodState;
  selected: MoodLevel | null;
  onTap: () => void;
  onSelect: (level: MoodLevel) => void;
  onReset: () => void;
}) {
  const selectedMood = moods.find((m) => m.level === selected);

  return (
    <div className="relative">
      {/* Expanded mood cards — slides up from bottom */}
      <AnimatePresence>
        {state === "expanded" && (
          <motion.div
            key="chooser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="px-5 pb-2 pt-3"
          >
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood, i) => {
                const Icon = mood.icon;
                return (
                  <motion.button
                    key={mood.level}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => onSelect(mood.level)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 rounded-xl transition-shadow",
                      mood.bgClass, "hover:shadow-md active:scale-95"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", mood.colorClass)} strokeWidth={1.5} />
                    <span className={cn("text-[10px] font-medium", mood.colorClass)}>{mood.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger / summary row — always present, sits right above nav */}
      <div className="border-t border-border/40">
        <AnimatePresence mode="wait">
          {(state === "empty" || state === "expanded") && (
            <motion.button
              key="trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={state === "empty" ? onTap : undefined}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 text-[13px] transition-colors",
                state === "empty"
                  ? "text-muted-foreground hover:text-foreground cursor-pointer"
                  : "text-muted-foreground/60 cursor-default"
              )}
            >
              <Smile className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium">How are you feeling today?</span>
            </motion.button>
          )}

          {state === "saved" && selectedMood && (
            <motion.button
              key="saved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <selectedMood.icon className={cn("w-3.5 h-3.5", selectedMood.colorClass)} strokeWidth={1.5} />
              <span className="font-medium">
                Mood: <span className={selectedMood.colorClass}>{selectedMood.label}</span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main exploration page ─── */
export default function MoodExploration() {
  const [s1, setS1] = useState<MoodState>("empty");
  const [sel1, setSel1] = useState<MoodLevel | null>(null);

  const [s2, setS2] = useState<MoodState>("expanded");
  const [sel2, setSel2] = useState<MoodLevel | null>(null);

  const [s3, setS3] = useState<MoodState>("saved");
  const [sel3, setSel3] = useState<MoodLevel | null>("good");

  const make = (set: (s: MoodState) => void, setSel: (l: MoodLevel | null) => void) => ({
    onTap: () => set("expanded"),
    onSelect: (level: MoodLevel) => { setSel(level); set("saved"); },
    onReset: () => { setSel(null); set("empty"); },
  });

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">UI Exploration</p>
          <h1 className="text-2xl font-semibold text-foreground">Mood Check-in · Above Nav</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The mood row lives between content and navigation — not inside the scroll area. Tap to interact.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide text-center">Three States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <PhoneShell label="State 1 — Empty" moodSlot={<MoodLayer state={s1} selected={sel1} {...make(setS1, setSel1)} />}>
              <TodayContent />
            </PhoneShell>
            <PhoneShell label="State 2 — Expanded" moodSlot={<MoodLayer state={s2} selected={sel2} {...make(setS2, setSel2)} />}>
              <TodayContent />
            </PhoneShell>
            <PhoneShell label="State 3 — Saved" moodSlot={<MoodLayer state={s3} selected={sel3} {...make(setS3, setSel3)} />}>
              <TodayContent />
            </PhoneShell>
          </div>
        </section>
      </div>
    </div>
  );
}
