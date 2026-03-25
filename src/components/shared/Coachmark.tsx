import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface CoachmarkProps {
  visible: boolean;
  title: string;
  description: string;
  onDismiss: () => void;
  onSkipAll: () => void;
  /** Ref to the anchor element. If null, falls back to fixed bottom positioning. */
  anchorRef?: React.RefObject<HTMLElement | null>;
  /** Preferred placement relative to anchor */
  placement?: "top" | "bottom";
}

interface Position {
  top: number;
  left: number;
  arrowLeft: number;
  arrowSide: "top" | "bottom";
}

const COACHMARK_GAP = 10;
const ARROW_SIZE = 7;

function computePosition(
  anchor: DOMRect,
  card: { width: number; height: number },
  placement: "top" | "bottom"
): Position {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  // Horizontal centering relative to anchor, clamped to viewport
  let left = anchor.left + anchor.width / 2 - card.width / 2;
  left = Math.max(12, Math.min(left, viewportW - card.width - 12));

  const arrowLeft = Math.max(
    16,
    Math.min(anchor.left + anchor.width / 2 - left, card.width - 16)
  );

  // Try preferred placement first
  if (placement === "top") {
    const top = anchor.top - card.height - COACHMARK_GAP - ARROW_SIZE;
    if (top > 8) return { top, left, arrowLeft, arrowSide: "bottom" };
  }

  // Bottom placement
  const bottomTop = anchor.bottom + COACHMARK_GAP + ARROW_SIZE;
  if (bottomTop + card.height < viewportH - 8) {
    return { top: bottomTop, left, arrowLeft, arrowSide: "top" };
  }

  // Fallback to top even if tight
  return {
    top: anchor.top - card.height - COACHMARK_GAP - ARROW_SIZE,
    left,
    arrowLeft,
    arrowSide: "bottom",
  };
}

export function Coachmark({
  visible,
  title,
  description,
  onDismiss,
  onSkipAll,
  anchorRef,
  placement = "bottom",
}: CoachmarkProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position | null>(null);
  const [fallback, setFallback] = useState(false);

  const recalculate = useCallback(() => {
    if (!anchorRef?.current || !cardRef.current) {
      setFallback(true);
      return;
    }
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    setPos(
      computePosition(anchorRect, { width: cardRect.width, height: cardRect.height }, placement)
    );
    setFallback(false);
  }, [anchorRef, placement]);

  // Position calculation
  useEffect(() => {
    if (!visible) return;
    // Wait one frame for the card to be in DOM
    const raf = requestAnimationFrame(recalculate);
    window.addEventListener("resize", recalculate);
    window.addEventListener("scroll", recalculate, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate, true);
    };
  }, [visible, recalculate]);

  // Click outside
  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 120);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [visible, onDismiss]);

  const content = (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed z-[9999] w-[280px] sm:w-[320px]"
          style={
            pos && !fallback
              ? { top: pos.top, left: pos.left }
              : { bottom: 88, left: "50%", transform: "translateX(-50%)" }
          }
        >
          {/* Arrow */}
          {pos && !fallback && (
            <div
              className="absolute w-0 h-0"
              style={{
                left: pos.arrowLeft,
                ...(pos.arrowSide === "top"
                  ? {
                      top: -ARROW_SIZE,
                      borderLeft: `${ARROW_SIZE}px solid transparent`,
                      borderRight: `${ARROW_SIZE}px solid transparent`,
                      borderBottom: `${ARROW_SIZE}px solid hsl(var(--primary) / 0.9)`,
                    }
                  : {
                      bottom: -ARROW_SIZE,
                      borderLeft: `${ARROW_SIZE}px solid transparent`,
                      borderRight: `${ARROW_SIZE}px solid transparent`,
                      borderTop: `${ARROW_SIZE}px solid hsl(var(--primary) / 0.9)`,
                    }),
              }}
            />
          )}

          {/* Card body */}
          <div className="rounded-xl px-4 py-3.5 shadow-[0_8px_32px_-4px_hsl(var(--primary)/0.25)] backdrop-blur-md bg-[hsl(var(--primary)/0.9)]">
            <p className="text-[13px] font-semibold text-primary-foreground mb-1">
              {title}
            </p>
            <p className="text-[11px] leading-relaxed text-primary-foreground/80 mb-3">
              {description}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onDismiss}
                className="text-[11px] font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors"
              >
                Got it
              </button>
              <button
                onClick={() => {
                  onSkipAll();
                  onDismiss();
                }}
                className="text-[11px] text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                Skip all tips
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
