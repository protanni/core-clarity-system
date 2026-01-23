import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-sm space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Logo / Brand */}
        <motion.div variants={item} className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            PROTANNI
          </h1>
          <p className="text-sm text-muted-foreground">
            Your Personal Operating System
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={item} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border/50"
            />
          </div>

          <Button className="w-full" size="lg">
            Continue
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={item}
          className="text-xs text-center text-muted-foreground"
        >
          By continuing, you agree to our terms and privacy policy.
        </motion.p>
      </motion.div>
    </div>
  );
}
