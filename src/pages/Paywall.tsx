import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const benefits = [
  "Unlimited tasks and habits",
  "Weekly reviews and reflections",
  "Full life area organization",
  "Sync across all your devices",
  "Priority support",
];

export default function PaywallPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-sm space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-3">
          <p className="text-xs font-medium text-primary uppercase tracking-widest">
            Upgrade
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Unlock Your Full Potential
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A calm, focused system to manage your entire life — one day at a time.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          variants={item}
          className="bg-card rounded-2xl p-6 shadow-card border border-border/50 space-y-6"
        >
          {/* Price */}
          <div className="text-center space-y-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-semibold text-foreground">$7</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Billed monthly. Cancel anytime.
            </p>
          </div>

          {/* Benefits */}
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button className="w-full" size="lg">
            Start Your Journey
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={item}
          className="text-xs text-center text-muted-foreground"
        >
          Questions? We're here to help.
        </motion.p>
      </motion.div>
    </div>
  );
}
