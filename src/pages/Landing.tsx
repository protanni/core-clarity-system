import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckSquare,
  Repeat,
  Smile,
  Layers,
  CalendarDays,
  ArrowRight,
  Sun,
  Moon,
  Home,
  User,
  Pencil,
  Plus,
  ChevronRight,
  Check,
  Meh,
  Frown,
  Heart,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ─── Miniature App Mockups ─── */

function MockBottomNav({ active }: { active: string }) {
  const items = [
    { label: "Today", icon: Home },
    { label: "Tasks", icon: CheckSquare },
    { label: "Habits", icon: Repeat },
    { label: "Review", icon: CalendarDays },
    { label: "Account", icon: User },
  ];
  return (
    <div className="flex items-center justify-around h-10 border-t border-border/50 bg-card/80 px-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === active;
        return (
          <div key={item.label} className="flex flex-col items-center gap-0.5">
            <Icon
              className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-muted-foreground/50"}`}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span
              className={`text-[7px] font-medium ${isActive ? "text-primary" : "text-muted-foreground/50"}`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MockTodayScreen({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-card border flex flex-col ${
        dark
          ? "bg-[hsl(220,18%,9%)] border-[hsl(220,12%,20%)] text-[hsl(40,15%,92%)]"
          : "bg-card border-border/50 text-foreground"
      }`}
      style={{ width: 220, height: 380 }}
    >
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="space-y-0.5">
          <p
            className={`text-[7px] font-medium uppercase tracking-widest ${dark ? "text-[hsl(158,32%,48%)]/70" : "text-primary/70"}`}
          >
            Daily Control Layer
          </p>
          <p className={`text-sm font-semibold ${dark ? "text-[hsl(40,15%,92%)]" : "text-foreground"}`}>
            Good morning
          </p>
          <p className={`text-[9px] ${dark ? "text-[hsl(220,8%,55%)]" : "text-muted-foreground"}`}>
            Monday, March 8
          </p>
        </div>

        {/* Focus card */}
        <div
          className={`rounded-lg p-3 space-y-1.5 ${
            dark
              ? "bg-[hsl(220,16%,13%)] border border-[hsl(220,12%,20%)]/50"
              : "bg-card border border-border/50 shadow-sm"
          }`}
        >
          <p
            className={`text-[7px] font-medium uppercase tracking-wide ${dark ? "text-[hsl(220,8%,55%)]" : "text-muted-foreground"}`}
          >
            Daily Focus
          </p>
          <p className={`text-[9px] ${dark ? "text-[hsl(40,15%,92%)]" : "text-foreground"}`}>
            Ship landing page v1
          </p>
        </div>

        {/* Tasks */}
        <div className="space-y-1">
          <p className={`text-[8px] font-medium ${dark ? "text-[hsl(40,15%,92%)]" : "text-foreground"}`}>
            Today's Tasks
          </p>
          {["Review designs", "Write copy", "Test flow"].map((t, i) => (
            <div key={t} className="flex items-center gap-1.5">
              <div
                className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center ${
                  i === 0
                    ? dark
                      ? "bg-[hsl(158,32%,48%)] border-[hsl(158,32%,48%)]"
                      : "bg-primary border-primary"
                    : dark
                      ? "border-[hsl(220,12%,20%)]"
                      : "border-border"
                }`}
              >
                {i === 0 && <Check className="w-1.5 h-1.5 text-white" />}
              </div>
              <span
                className={`text-[8px] ${
                  i === 0
                    ? dark
                      ? "text-[hsl(220,8%,55%)] line-through"
                      : "text-muted-foreground line-through"
                    : dark
                      ? "text-[hsl(40,15%,92%)]"
                      : "text-foreground"
                }`}
              >
                {t}
              </span>
            </div>
          ))}
        </div>

        {/* Mood */}
        <div className="space-y-1">
          <p
            className={`text-[8px] font-medium ${dark ? "text-[hsl(40,15%,92%)]" : "text-foreground"}`}
          >
            How are you feeling?
          </p>
          <div className="flex gap-1">
            {[
              { label: "Great", color: dark ? "hsl(158,30%,26%)" : "hsl(158,40%,85%)" },
              { label: "Good", color: dark ? "hsl(180,25%,25%)" : "hsl(180,35%,85%)", selected: true },
              { label: "Okay", color: dark ? "hsl(45,22%,24%)" : "hsl(45,30%,88%)" },
              { label: "Low", color: dark ? "hsl(25,28%,24%)" : "hsl(25,40%,88%)" },
              { label: "Bad", color: dark ? "hsl(0,28%,24%)" : "hsl(0,35%,88%)" },
            ].map((m) => (
              <div
                key={m.label}
                className={`flex-1 rounded-md py-1 flex flex-col items-center ${m.selected ? "ring-1 ring-primary" : ""}`}
                style={{ backgroundColor: m.color }}
              >
                <span className={`text-[6px] font-medium ${dark ? "opacity-80" : "opacity-70"}`}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MockBottomNav active="Today" />
    </div>
  );
}

function MockTasksScreen() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-card border border-border/50 bg-card flex flex-col"
      style={{ width: 220, height: 380 }}
    >
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-foreground">Tasks</p>
          <p className="text-[8px] text-muted-foreground">4 open · 2 completed</p>
        </div>
        <div className="flex gap-1">
          {["All", "Work", "Personal", "Mind"].map((a, i) => (
            <div
              key={a}
              className={`px-2 py-0.5 rounded-full text-[7px] font-medium ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {a}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {["Prepare weekly report", "Book dentist appointment", "Read 20 pages", "Reply to emails"].map(
            (t, i) => (
              <div
                key={t}
                className="flex items-center gap-1.5 py-1 border-b border-border/30 last:border-0"
              >
                <div className="w-2.5 h-2.5 rounded-sm border border-border" />
                <span className="text-[8px] text-foreground">{t}</span>
              </div>
            )
          )}
        </div>
      </div>
      <MockBottomNav active="Tasks" />
    </div>
  );
}

function MockHabitsScreen() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-card border border-border/50 bg-card flex flex-col"
      style={{ width: 220, height: 380 }}
    >
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-foreground">Habits</p>
          <p className="text-[8px] text-muted-foreground">2 of 4 completed today</p>
        </div>
        {["Meditate 10 min", "Exercise", "Read", "Journal"].map((h, i) => (
          <div key={h} className="flex items-center gap-2 py-1 border-b border-border/30 last:border-0">
            <div
              className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                i < 2 ? "bg-primary border-primary" : "border-border"
              }`}
            >
              {i < 2 && <Check className="w-2 h-2 text-primary-foreground" />}
            </div>
            <div className="flex-1">
              <p className={`text-[8px] ${i < 2 ? "text-muted-foreground" : "text-foreground"}`}>{h}</p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 7 }).map((_, d) => (
                <div
                  key={d}
                  className={`w-1 h-1 rounded-full ${
                    d < (i < 2 ? 5 : 3) ? "bg-primary/60" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <MockBottomNav active="Habits" />
    </div>
  );
}

function MockReviewScreen() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-card border border-border/50 bg-card flex flex-col"
      style={{ width: 220, height: 380 }}
    >
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div>
          <p className="text-sm font-semibold text-foreground">Weekly Review</p>
          <p className="text-[8px] text-muted-foreground">Reflect, realign, prepare.</p>
        </div>
        {/* Consistency */}
        <div className="rounded-lg p-2.5 bg-muted/50 border border-border/30 space-y-1">
          <p className="text-[7px] font-medium text-muted-foreground uppercase tracking-wide">
            Consistency
          </p>
          <p className="text-[8px] text-foreground">
            Showed up <span className="text-primary font-medium">5</span> of 7 days
          </p>
          <p className="text-[8px] text-foreground">
            Habits: <span className="text-primary font-medium">18</span> completions
          </p>
        </div>
        {/* Emotional */}
        <div className="rounded-lg p-2.5 bg-muted/50 border border-border/30 space-y-1">
          <p className="text-[7px] font-medium text-muted-foreground uppercase tracking-wide">
            Emotional Summary
          </p>
          <p className="text-[8px] text-foreground">
            Mostly: <span className="text-primary font-medium">Good</span>
          </p>
        </div>
        {/* Reflection */}
        <div className="rounded-lg p-2.5 bg-muted/50 border border-border/30 space-y-1">
          <p className="text-[7px] font-medium text-muted-foreground uppercase tracking-wide">
            Reflection
          </p>
          <p className="text-[8px] text-muted-foreground italic">
            "Felt more focused this week…"
          </p>
        </div>
      </div>
      <MockBottomNav active="Review" />
    </div>
  );
}

/* ─── Main Landing Page ─── */
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-foreground">PROTANNI</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button size="sm" className="text-xs" onClick={() => navigate("/login")}>
              Start free
            </Button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <motion.div
            className="max-w-2xl mx-auto text-center space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              Personal Operating System
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight"
            >
              Your life.
              <br />
              Organized with clarity.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
            >
              Protanni is a personal operating system designed to help you manage tasks, track habits,
              and reflect with intention.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 pt-2">
              <Button size="lg" onClick={() => navigate("/login")}>
                Start free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}>
                See how it works
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero device mockup */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-end gap-4 md:gap-6">
              <div className="hidden md:block opacity-60 -translate-y-4">
                <MockTasksScreen />
              </div>
              <div className="relative">
                <MockTodayScreen />
                {/* Glow */}
                <div className="absolute -inset-8 bg-primary/5 rounded-3xl blur-2xl -z-10" />
              </div>
              <div className="hidden md:block opacity-60 -translate-y-4">
                <MockHabitsScreen />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRODUCT PREVIEW ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-14 space-y-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              Product Preview
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Everything you need, nothing you don't
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { label: "Today", comp: <MockTodayScreen /> },
              { label: "Tasks", comp: <MockTasksScreen /> },
              { label: "Habits", comp: <MockHabitsScreen /> },
              { label: "Review", comp: <MockReviewScreen /> },
            ].map((screen) => (
              <motion.div key={screen.label} variants={fadeUp} className="space-y-3 flex flex-col items-center">
                <div className="transform scale-[0.85] md:scale-100 origin-top">{screen.comp}</div>
                <p className="text-xs font-medium text-muted-foreground">{screen.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Light + Dark side-by-side */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-muted-foreground">Light & Dark themes included</p>
            <div className="flex items-center gap-4">
              <div className="transform scale-75 origin-center">
                <MockTodayScreen />
              </div>
              <div className="transform scale-75 origin-center">
                <MockTodayScreen dark />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14 space-y-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Three steps. Every day.
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Capture",
                description:
                  "Add tasks, set habits, and define what matters. Your system holds everything so your mind doesn't have to.",
                icon: Plus,
              },
              {
                step: "02",
                title: "Act",
                description:
                  "Focus on today. Bring tasks to your daily view, check off habits, and track your emotional state.",
                icon: CheckSquare,
              },
              {
                step: "03",
                title: "Reflect",
                description:
                  "Review your week. See patterns, acknowledge progress, and set intentions for what's next.",
                icon: Eye,
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.step} variants={fadeUp} className="text-center md:text-left space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">
                    Step {s.step}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CORE FEATURES ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-14 space-y-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              Core Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Built for the whole picture
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: CheckSquare,
                title: "Task Management",
                desc: "Organize tasks by life area. Bring only what matters to your daily view.",
              },
              {
                icon: Repeat,
                title: "Habit Tracking",
                desc: "Build consistency with simple daily check-offs and weekly progress dots.",
              },
              {
                icon: Smile,
                title: "Mood Check-in",
                desc: "A gentle daily signal. Track how you feel without overthinking it.",
              },
              {
                icon: Layers,
                title: "Life Areas",
                desc: "Separate work, personal, mind, body, and relationships. See the full picture.",
              },
              {
                icon: CalendarDays,
                title: "Weekly Review",
                desc: "Reflect on consistency, mood patterns, and intentions. Close the week with clarity.",
              },
              {
                icon: Heart,
                title: "Daily Focus",
                desc: "One intention per day. A grounding anchor for everything else.",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── LIGHT & DARK MODE ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Sun className="w-4 h-4 text-foreground" />
              </div>
              <div className="w-8 h-8 rounded-full bg-[hsl(220,18%,9%)] flex items-center justify-center">
                <Moon className="w-4 h-4 text-[hsl(40,15%,92%)]" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Designed for your rhythm,
              <br />
              day and night
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto"
            >
              Choose the interface that feels best for you. Protanni supports both light and dark mode
              while keeping the same calm, clear experience.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <MockTodayScreen />
              <p className="text-center text-[10px] text-muted-foreground mt-3 font-medium">Light</p>
            </div>
            <div className="relative">
              <MockTodayScreen dark />
              <p className="text-center text-[10px] text-muted-foreground mt-3 font-medium">Dark</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            className="text-center space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              Philosophy
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Clarity, not pressure
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Protanni isn't about squeezing more out of every day. It's about seeing your life clearly —
                what you're doing, how you're feeling, and where your attention goes.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                There are no streaks to protect, no gamification to chase, no dashboards designed to make
                you feel behind. Just a calm system that helps you stay aware, consistent, and intentional.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Because the goal isn't to optimize your life.
                <br />
                <span className="text-foreground font-medium">It's to understand it.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14 space-y-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              Pricing
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Simple, honest plans
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Free */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-foreground">$0</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2">
                {["Up to 20 tasks", "3 habits", "Daily mood check-in", "Basic weekly review"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full text-xs" onClick={() => navigate("/login")}>
                Get started
              </Button>
            </motion.div>

            {/* Pro */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-card border-2 border-primary/30 space-y-4 relative"
            >
              <div className="absolute -top-2.5 left-6 px-2.5 py-0.5 bg-primary text-primary-foreground text-[9px] font-medium rounded-full">
                Recommended
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Pro</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-foreground">$7</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "Unlimited tasks & habits",
                  "Full life area organization",
                  "Review archive & history",
                  "Sync across devices",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full text-xs" onClick={() => navigate("/login")}>
                Start free trial
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Start building your life system.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-muted-foreground"
            >
              Free to start. No credit card required.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button size="lg" onClick={() => navigate("/login")}>
                Start free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-semibold tracking-tight text-foreground">PROTANNI</span>
          <p className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} Protanni. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
