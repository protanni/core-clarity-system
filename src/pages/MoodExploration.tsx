import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Meh, Frown, ChevronRight, Plus, Pencil, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type MoodLevel = "great" | "good" | "neutral" | "low" | "bad";
type ExplorationState = "empty" | "expanded" | "saved";

const moods: { level: MoodLevel; label: string; icon: typeof Smile; colorClass: string; bgClass: string }[] = [
  { level: "great", label: "Great", icon: Smile, colorClass: "text-mood-great-foreground", bgClass: "bg-mood-great" },
  { level: "good", label: "Good", icon: Smile, colorClass: "text-mood-good-foreground", bgClass: "bg-mood-good" },
  { level: "neutral", label: "Okay", icon: Meh, colorClass: "text-mood-neutral-foreground", bgClass: "bg-mood-neutral" },
  { level: "low", label: "Low", icon: Frown, colorClass: "text-mood-low-foreground", bgClass: "bg-mood-low" },
  { level: "bad", label: "Bad", icon: Frown, colorClass: "text-mood-bad-foreground", bgClass: "bg-mood-bad" },
];

/* ───────────────────────── Variant A: Subtle text link ─── */
function VariantA({ state, selected, onTap, onSelect, onReset }: VariantProps) {
  const selectedMood = moods.find((m) => m.level === selected);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "empty" && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            onClick={onTap}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Smile className="w-4 h-4" strokeWidth={1.5} />
            <span className="font-medium">How are you feeling today?</span>
          </motion.button>
        )}

        {state === "expanded" && (
          <motion.div
            key="chooser"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="py-3 space-y-3"
          >
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wide">
              How are you feeling?
            </p>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood, i) => {
                const Icon = mood.icon;
                return (
                  <motion.button
                    key={mood.level}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => onSelect(mood.level)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all",
                      mood.bgClass, "hover:shadow-md"
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

        {state === "saved" && selectedMood && (
          <motion.button
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground"
          >
            <selectedMood.icon className={cn("w-4 h-4", selectedMood.colorClass)} strokeWidth={1.5} />
            <span className="font-medium">
              Mood: <span className={selectedMood.colorClass}>{selectedMood.label}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Variant B: Pill / chip trigger ─── */
function VariantB({ state, selected, onTap, onSelect, onReset }: VariantProps) {
  const selectedMood = moods.find((m) => m.level === selected);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "empty" && (
          <motion.div
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-3"
          >
            <button
              onClick={onTap}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Smile className="w-4 h-4" strokeWidth={1.5} />
              How are you feeling?
            </button>
          </motion.div>
        )}

        {state === "expanded" && (
          <motion.div
            key="chooser"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="py-3 space-y-3"
          >
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wide">
              How are you feeling?
            </p>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood, i) => {
                const Icon = mood.icon;
                return (
                  <motion.button
                    key={mood.level}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => onSelect(mood.level)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all",
                      mood.bgClass, "hover:shadow-md"
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

        {state === "saved" && selectedMood && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-3"
          >
            <button
              onClick={onReset}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedMood.bgClass, selectedMood.colorClass
              )}
            >
              <selectedMood.icon className="w-4 h-4" strokeWidth={1.5} />
              {selectedMood.label}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Variant C: Inline dot row ─── */
function VariantC({ state, selected, onTap, onSelect, onReset }: VariantProps) {
  const selectedMood = moods.find((m) => m.level === selected);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "empty" && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onTap}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="font-medium">How are you feeling?</span>
            <div className="flex gap-1.5">
              {moods.map((m) => (
                <div key={m.level} className={cn("w-2 h-2 rounded-full", m.bgClass)} />
              ))}
            </div>
          </motion.button>
        )}

        {state === "expanded" && (
          <motion.div
            key="chooser"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="py-3 space-y-3"
          >
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wide">
              How are you feeling?
            </p>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood, i) => {
                const Icon = mood.icon;
                return (
                  <motion.button
                    key={mood.level}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => onSelect(mood.level)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all",
                      mood.bgClass, "hover:shadow-md"
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

        {state === "saved" && selectedMood && (
          <motion.button
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onReset}
            className="w-full flex items-center justify-between px-4 py-3 text-sm"
          >
            <span className="text-muted-foreground font-medium">Mood</span>
            <div className="flex items-center gap-1.5">
              <selectedMood.icon className={cn("w-4 h-4", selectedMood.colorClass)} strokeWidth={1.5} />
              <span className={cn("font-medium text-xs", selectedMood.colorClass)}>{selectedMood.label}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Shared types ─── */
interface VariantProps {
  state: ExplorationState;
  selected: MoodLevel | null;
  onTap: () => void;
  onSelect: (level: MoodLevel) => void;
  onReset: () => void;
}

/* ───────────────────────── Fake Today shell ─── */
function TodayShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="w-full max-w-[390px] mx-auto bg-background rounded-2xl border border-border shadow-lg overflow-hidden flex flex-col" style={{ height: 680 }}>
      {/* Screen content */}
      <div className="flex-1 overflow-auto px-5 py-6 space-y-5">
        <header className="space-y-1">
          <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">Daily Control Layer</p>
          <h1 className="text-xl font-semibold text-foreground">Good morning</h1>
          <p className="text-xs text-muted-foreground">Saturday, March 7</p>
        </header>

        {/* Focus placeholder */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Daily Focus</p>
          <p className="text-sm text-foreground">Ship the mood exploration prototype</p>
        </div>

        {/* Tasks placeholder */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-foreground">Today's Tasks</h2>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">All tasks <ChevronRight className="w-3 h-3" /></span>
          </div>
          <div className="bg-card rounded-xl shadow-sm border border-border/50 divide-y divide-border/50">
            {["Review mood variants", "Finalize motion config"].map((t) => (
              <div key={t} className="flex items-center gap-3 px-4 py-3">
                <div className="w-4 h-4 rounded border border-border" />
                <span className="text-sm text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Habits placeholder */}
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-foreground">Today's Habits <span className="text-muted-foreground font-normal">1/3</span></h2>
          <div className="bg-card rounded-xl shadow-sm border border-border/50 divide-y divide-border/50">
            {["Morning stretch", "Read 15 min"].map((h) => (
              <div key={h} className="flex items-center gap-3 px-4 py-3">
                <div className="w-4 h-4 rounded-full border border-border" />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood slot */}
        {children}
      </div>

      {/* Bottom nav */}
      <div className="border-t border-border bg-card">
        <div className="flex items-center justify-around h-14">
          {[
            { label: "Today", icon: "⌂", active: true },
            { label: "Tasks", icon: "☑" },
            { label: "Habits", icon: "↻" },
            { label: "Review", icon: "📅" },
            { label: "Account", icon: "👤" },
          ].map((n) => (
            <div key={n.label} className="flex flex-col items-center gap-0.5">
              <span className={cn("text-base", n.active ? "text-primary" : "text-muted-foreground")}>{n.icon}</span>
              <span className={cn("text-[10px] font-medium", n.active ? "text-primary" : "text-muted-foreground")}>{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Label */}
      <div className="bg-muted/50 text-center py-2">
        <span className="text-[10px] text-muted-foreground font-medium">{title}</span>
      </div>
    </div>
  );
}

/* ───────────────────────── Main exploration page ─── */
export default function MoodExploration() {
  // State per mockup
  const [s1, setS1] = useState<ExplorationState>("empty");
  const [sel1, setSel1] = useState<MoodLevel | null>(null);

  const [s2, setS2] = useState<ExplorationState>("expanded");
  const [sel2, setSel2] = useState<MoodLevel | null>(null);

  const [s3, setS3] = useState<ExplorationState>("saved");
  const [sel3, setSel3] = useState<MoodLevel | null>("good");

  // Variant explorations
  const [vA, setVA] = useState<ExplorationState>("empty");
  const [selA, setSelA] = useState<MoodLevel | null>(null);
  const [vB, setVB] = useState<ExplorationState>("empty");
  const [selB, setSelB] = useState<MoodLevel | null>(null);
  const [vC, setVC] = useState<ExplorationState>("empty");
  const [selC, setSelC] = useState<MoodLevel | null>(null);

  const makeHandlers = (
    setState: (s: ExplorationState) => void,
    setSelected: (l: MoodLevel | null) => void
  ) => ({
    onTap: () => setState("expanded"),
    onSelect: (level: MoodLevel) => { setSelected(level); setState("saved"); },
    onReset: () => { setSelected(null); setState("empty"); },
  });

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">UI Exploration</p>
          <h1 className="text-2xl font-semibold text-foreground">Mood Check-in · Today Tab</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Three states + three trigger row variants. Tap to interact.
          </p>
        </header>

        {/* ── 3 States ── */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide text-center">Three States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            <TodayShell title="State 1 — Empty">
              <VariantA state={s1} selected={sel1} {...makeHandlers(setS1, setSel1)} />
            </TodayShell>
            <TodayShell title="State 2 — Expanded">
              <VariantA state={s2} selected={sel2} {...makeHandlers(setS2, setSel2)} />
            </TodayShell>
            <TodayShell title="State 3 — Saved">
              <VariantA state={s3} selected={sel3} {...makeHandlers(setS3, setSel3)} />
            </TodayShell>
          </div>
        </section>

        {/* ── Trigger Variants ── */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wide text-center">Trigger Row Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            <TodayShell title="A — Subtle text link">
              <VariantA state={vA} selected={selA} {...makeHandlers(setVA, setSelA)} />
            </TodayShell>
            <TodayShell title="B — Pill / chip">
              <VariantB state={vB} selected={selB} {...makeHandlers(setVB, setSelB)} />
            </TodayShell>
            <TodayShell title="C — Inline dot row">
              <VariantC state={vC} selected={selC} {...makeHandlers(setVC, setSelC)} />
            </TodayShell>
          </div>
        </section>
      </div>
    </div>
  );
}
