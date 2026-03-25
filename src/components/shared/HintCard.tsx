import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface HintCardProps {
  visible: boolean;
  title: string;
  description: string;
  onDismiss: () => void;
  onSkipAll: () => void;
}

export function HintCard({ visible, title, description, onDismiss, onSkipAll }: HintCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative max-w-[768px] w-full rounded-xl border border-border/60 bg-card/80 backdrop-blur-md shadow-lg p-4 z-50"
        >
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close hint"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <p className="text-xs font-semibold text-foreground mb-1">{title}</p>
          <p className="text-[11px] leading-relaxed text-muted-foreground mb-3 pr-4">
            {description}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onDismiss}
              className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Got it
            </button>
            <button
              onClick={onSkipAll}
              className="text-[11px] text-muted-foreground/70 hover:text-muted-foreground transition-colors"
            >
              Skip all tips
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
