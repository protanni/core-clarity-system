import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Plus,
  Check,
  Eye,
  Heart,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ─── Miniature App Mockups ─── */

function MockBottomNav({ active, dark = false }: { active: string; dark?: boolean }) {
  const items = [
    { label: "Today", icon: Home },
    { label: "Tasks", icon: CheckSquare },
    { label: "Habits", icon: Repeat },
    { label: "Review", icon: CalendarDays },
    { label: "Account", icon: User },
  ];
  return (
    <div
      className={`flex items-center justify-around h-10 border-t px-2 ${
        dark
          ? "bg-[hsl(220,16%,11%)] border-[hsl(220,12%,18%)]"
          : "bg-card/80 border-border/50"
      }`}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === active;
        return (
          <div key={item.label} className="flex flex-col items-center gap-0.5">
            <Icon
              className={`w-3.5 h-3.5 ${
                isActive
                  ? dark ? "text-[hsl(158,32%,52%)]" : "text-primary"
                  : dark ? "text-[hsl(220,8%,40%)]" : "text-muted-foreground/50"
              }`}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span
              className={`text-[7px] font-medium ${
                isActive
                  ? dark ? "text-[hsl(158,32%,52%)]" : "text-primary"
                  : dark ? "text-[hsl(220,8%,40%)]" : "text-muted-foreground/50"
              }`}
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
      className={`rounded-2xl overflow-hidden border flex flex-col ${
        dark
          ? "bg-[hsl(220,18%,9%)] border-[hsl(220,12%,20%)]"
          : "bg-card border-border/50 shadow-card"
      }`}
      style={{ width: 220, height: 380 }}
    >
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="space-y-0.5">
          <p
            className={`text-[7px] font-medium uppercase tracking-widest ${
              dark ? "text-[hsl(158,32%,48%)]/70" : "text-primary/70"
            }`}
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
              : "bg-primary/5 border border-primary/10"
          }`}
        >
          <div className="flex items-center gap-1">
            <Sparkles className={`w-2.5 h-2.5 ${dark ? "text-[hsl(158,32%,48%)]" : "text-primary"}`} strokeWidth={1.5} />
            <p
              className={`text-[7px] font-medium uppercase tracking-wide ${
                dark ? "text-[hsl(220,8%,55%)]" : "text-muted-foreground"
              }`}
            >
              Daily Focus
            </p>
          </div>
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
          <p className={`text-[8px] font-medium ${dark ? "text-[hsl(40,15%,92%)]" : "text-foreground"}`}>
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
                className={`flex-1 rounded-md py-1 flex flex-col items-center ${
                  m.selected ? "ring-1 ring-primary" : ""
                }`}
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
      <MockBottomNav active="Today" dark={dark} />
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
        <div className="flex gap-1 flex-wrap">
          {["All", "Work", "Personal", "Mind"].map((a, i) => (
            <div
              key={a}
              className={`px-2 py-0.5 rounded-full text-[7px] font-medium ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {a}
            </div>
          ))}
        </div>
        <div className="space-y-0.5">
          {["Prepare weekly report", "Book dentist appointment", "Read 20 pages", "Reply to emails"].map(
            (t) => (
              <div
                key={t}
                className="flex items-center gap-1.5 py-1.5 border-b border-border/30 last:border-0"
              >
                <div className="w-2.5 h-2.5 rounded-sm border border-border flex-shrink-0" />
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
          <div key={h} className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0">
            <div
              className={`w-3 h-3 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
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
                  className={`w-1 h-1 rounded-full ${d < (i < 2 ? 5 : 3) ? "bg-primary/60" : "bg-border"}`}
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
        <div className="rounded-lg p-2.5 bg-muted/50 border border-border/30 space-y-1">
          <p className="text-[7px] font-medium text-muted-foreground uppercase tracking-wide">Consistency</p>
          <p className="text-[8px] text-foreground">
            Showed up <span className="text-primary font-medium">5</span> of 7 days
          </p>
          <p className="text-[8px] text-foreground">
            Habits: <span className="text-primary font-medium">18</span> completions
          </p>
        </div>
        <div className="rounded-lg p-2.5 bg-muted/50 border border-border/30 space-y-1">
          <p className="text-[7px] font-medium text-muted-foreground uppercase tracking-wide">
            Emotional Summary
          </p>
          <p className="text-[8px] text-foreground">
            Mostly: <span className="text-primary font-medium">Good</span>
          </p>
        </div>
        <div className="rounded-lg p-2.5 bg-muted/50 border border-border/30 space-y-1">
          <p className="text-[7px] font-medium text-muted-foreground uppercase tracking-wide">
            Reflection
          </p>
          <p className="text-[8px] text-muted-foreground italic">"Felt more focused this week…"</p>
        </div>
      </div>
      <MockBottomNav active="Review" />
    </div>
  );
}

/* ─── Main Landing Page ─── */
export default function LandingPage() {
  const navigate = useNavigate();

  /* Scroll-linked parallax for hero mockups */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY1 = useTransform(heroProgress, [0, 1], [0, -20]); // center
  const heroY2 = useTransform(heroProgress, [0, 1], [0, -12]); // sides

  /* Scroll-linked horizontal drift for product preview */
  const previewRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: previewProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "end start"],
  });
  const previewX = useTransform(previewProgress, [0, 1], [24, -24]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40">
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
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-40 md:pb-32">

          {/* Text block */}
          <motion.div
            className="max-w-xl mx-auto text-center space-y-6"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]"
            >
              Personal Operating System
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]"
            >
              Your life.
              <br />
              Organized with clarity.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Protanni is a personal operating system for tasks, habits and reflection.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 pt-2">
              <Button size="lg" onClick={() => navigate("/login")}>
                Start free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works
              </Button>
            </motion.div>
          </motion.div>

          {/* Mockup trio with parallax */}
          <div className="mt-20 flex justify-center">
            <div className="flex items-end gap-5 md:gap-8">

              {/* Left */}
              <motion.div
                className="hidden md:block"
                style={{ y: heroY2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="-translate-y-6">
                  <MockTasksScreen />
                </div>
              </motion.div>

              {/* Center – Today (featured) */}
              <motion.div
                style={{ y: heroY1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <MockTodayScreen />
                <div className="absolute -inset-8 bg-primary/6 rounded-3xl blur-3xl -z-10" />
              </motion.div>

              {/* Right */}
              <motion.div
                className="hidden md:block"
                style={{ y: heroY2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="-translate-y-6">
                  <MockHabitsScreen />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT PREVIEW ─── */}
      <section className="py-24 md:py-32 bg-muted/30" ref={previewRef}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 space-y-3"
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
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground max-w-md mx-auto">
              Tasks, habits, reflection and review — connected in one simple system.
            </motion.p>
          </motion.div>

          {/* Horizontal drift wrapper */}
          <div className="overflow-hidden">
            <motion.div
              style={{ x: previewX }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center"
            >
              {[
                { label: "Today", comp: <MockTodayScreen />, delay: 0 },
                { label: "Tasks", comp: <MockTasksScreen />, delay: 0.07 },
                { label: "Habits", comp: <MockHabitsScreen />, delay: 0.14 },
                { label: "Review", comp: <MockReviewScreen />, delay: 0.21 },
              ].map((screen) => (
                <motion.div
                  key={screen.label}
                  className="space-y-3 flex flex-col items-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: screen.delay, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="transform scale-[0.82] md:scale-100 origin-top">
                    {screen.comp}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">{screen.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 space-y-3"
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
            className="grid md:grid-cols-3 gap-10 md:gap-12"
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
                  "Capture tasks, habits and priorities so everything that matters lives in one place.",
                icon: Plus,
              },
              {
                step: "02",
                title: "Act",
                description: "Focus on what matters today and move tasks into action.",
                icon: CheckSquare,
              },
              {
                step: "03",
                title: "Reflect",
                description:
                  "Review your week and understand patterns in your work and life.",
                icon: Eye,
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  variants={fadeUp}
                  className="text-center md:text-left space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-medium text-primary/55 uppercase tracking-widest">
                      Step {s.step}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── AI ASSISTANCE ─── */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14 space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
              </div>
              <p className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]">
                AI Assistance
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Thoughtful assistance,
              <br className="hidden md:block" /> when you need it
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto"
            >
              Protanni can use your own data — tasks, habits, mood and history — to help you decide what
              matters most today. Generate a personalized Daily Focus based on your current context so you
              always know where to start.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Sparkles,
                title: "Daily Focus",
                desc: "Create a personalized daily focus using your tasks, habits and recent activity.",
              },
              {
                icon: Wand2,
                title: "Smart task breakdown",
                desc: "Turn overwhelming tasks into clear next steps. Protanni can break complex tasks into smaller, actionable subtasks so you can start moving forward immediately.",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-card rounded-xl p-6 border border-border/50 shadow-card space-y-3 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CORE FEATURES ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 space-y-3"
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
                icon: Sparkles,
                title: "Daily Focus",
                desc: "One intention per day, informed by your habits, tasks, and recent activity.",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-card rounded-xl p-6 shadow-card border border-border/50 space-y-3 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
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
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center space-y-4 mb-14"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-background border border-border/60 flex items-center justify-center shadow-sm">
                <Sun className="w-3.5 h-3.5 text-foreground" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[hsl(220,18%,9%)] flex items-center justify-center shadow-sm">
                <Moon className="w-3.5 h-3.5 text-[hsl(40,15%,70%)]" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Designed for day and night
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto"
            >
              Choose the interface that feels best for you. Protanni supports both light and dark mode
              while keeping the same calm, clear experience.
            </motion.p>
          </motion.div>

          {/* Light dominant, dark secondary */}
          <motion.div
            className="flex justify-center items-end gap-8 md:gap-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Light – primary */}
            <div className="flex flex-col items-center gap-3">
              <MockTodayScreen />
              <div className="flex items-center gap-1.5">
                <Sun className="w-3 h-3 text-muted-foreground" />
                <p className="text-[10px] font-medium text-muted-foreground">Light — default</p>
              </div>
            </div>

            {/* Dark – secondary */}
            <div className="flex flex-col items-center gap-3">
              <div className="transform scale-[0.78] origin-bottom opacity-70">
                <MockTodayScreen dark />
              </div>
              <div className="flex items-center gap-1.5">
                <Moon className="w-3 h-3 text-muted-foreground" />
                <p className="text-[10px] font-medium text-muted-foreground">Dark — also available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            className="text-center space-y-8"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-[10px] font-medium text-primary uppercase tracking-[0.2em]">
                Philosophy
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Clarity, not pressure
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <p className="text-sm text-muted-foreground leading-[1.9]">
                Protanni isn't about squeezing more out of every day. It's about seeing your life clearly
                — what you're doing, how you're feeling, and where your attention goes.
              </p>
              <p className="text-sm text-muted-foreground leading-[1.9]">
                There are no streaks to protect, no gamification to chase, no dashboards designed to make
                you feel behind. Just a calm system that helps you stay aware, consistent, and intentional.
              </p>
              <p className="text-sm leading-[1.9]">
                <span className="text-muted-foreground">
                  Because the goal isn't to optimize your life.{" "}
                </span>
                <span className="text-foreground font-medium">It's to understand it.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 md:py-32 bg-muted/30">
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
              Choose your plan
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              Simple, honest plans.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-5 max-w-xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Free */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-xl p-7 shadow-card border border-border/50 space-y-5 flex flex-col"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground">Free</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-foreground">$0</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1">
                {["Up to 20 tasks", "3 habits", "Daily mood check-in", "Basic weekly review"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full text-xs h-10"
                onClick={() => navigate("/login")}
              >
                Get started free
              </Button>
            </motion.div>

            {/* Pro */}
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-xl p-7 shadow-card border-2 border-primary/25 space-y-5 relative flex flex-col"
            >
              <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-[9px] font-medium rounded-full">
                Recommended
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Pro</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-foreground">$7</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Unlimited tasks & habits",
                  "Full life area organization",
                  "Review archive & history",
                  "AI Daily Focus & task breakdown",
                  "Sync across devices",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full text-xs h-10" onClick={() => navigate("/login")}>
                Start free trial
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-7"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight"
            >
              Start building
              <br />
              your life system.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              Free to start. No credit card required.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button size="lg" className="px-8" onClick={() => navigate("/login")}>
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
