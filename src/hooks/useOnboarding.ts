import { useCallback, useState, useEffect } from "react";

type OnboardingKey =
  | "onboarding_today_focus"
  | "onboarding_today_tasks"
  | "onboarding_today_mood"
  | "onboarding_tasks_breakdown"
  | "onboarding_tasks_smart"
  | "onboarding_habits_consistency"
  | "onboarding_habits_progress"
  | "onboarding_review_weekly"
  | "onboarding_review_areas";

const SKIP_ALL_KEY = "onboarding_skip_all";

function readFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeFlag(key: string, value: boolean) {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
}

export function useOnboarding(keys: OnboardingKey[]) {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [skippedAll, setSkippedAll] = useState(false);

  useEffect(() => {
    const skipAll = readFlag(SKIP_ALL_KEY);
    setSkippedAll(skipAll);
    const state: Record<string, boolean> = {};
    for (const k of keys) {
      state[k] = readFlag(k);
    }
    setDismissed(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDismissed = useCallback(
    (key: OnboardingKey) => skippedAll || !!dismissed[key],
    [skippedAll, dismissed]
  );

  const dismiss = useCallback((key: OnboardingKey) => {
    writeFlag(key, true);
    setDismissed((prev) => ({ ...prev, [key]: true }));
  }, []);

  const skipAll = useCallback(() => {
    writeFlag(SKIP_ALL_KEY, true);
    setSkippedAll(true);
  }, []);

  /** Returns the first non-dismissed key from the ordered list, or null */
  const activeHint = keys.find((k) => !isDismissed(k)) ?? null;

  return { isDismissed, dismiss, skipAll, activeHint };
}
