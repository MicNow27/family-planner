import {
  getInitialLevel,
  getNextLevel,
  getRemainingCooldownTime,
  setCooldownTime,
  setNextLevel,
} from "@/hooks/useCooldown/timeLogic/timeLogic.ts";
import type { AuthError } from "@/types/auth.ts";
import { EMAIL_RESENT_ERROR } from "@copy/email.ts";
import { useEffect, useState } from "react";

type UseCooldownOptions = {
  action: () => Promise<AuthError>;
  storageKey: string;
  cooldownSequence: number[];
};

type UseCooldownReturn = {
  cooldown: number;
  run: () => Promise<void>;
  submitError: string | null;
  clearError: () => void;
};

type UseCooldownState = {
  level: number;
  cooldown: number;
};

export const useCooldown = ({ action, storageKey, cooldownSequence }: UseCooldownOptions): UseCooldownReturn => {
  const [state, setState] = useState<UseCooldownState>(() => {
    const level = getInitialLevel(storageKey);
    const cooldown = getRemainingCooldownTime(storageKey, cooldownSequence[level]);

    return { level, cooldown };
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearError = () => setSubmitError(null);

  useEffect(() => {
    if (state.cooldown <= 0) return;

    const timer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        cooldown: prev.cooldown - 1,
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.cooldown]);

  const run = async () => {
    clearError();

    const { error } = await action();

    if (error) setSubmitError(EMAIL_RESENT_ERROR);
    else {
      setState((prev) => {
        const nextLevel = getNextLevel(prev.level, cooldownSequence);
        const nextCooldown = cooldownSequence[nextLevel];

        setNextLevel(storageKey, nextLevel);
        setCooldownTime(storageKey, nextCooldown);

        return {
          level: nextLevel,
          cooldown: nextCooldown,
        };
      });
    }
  };

  return { cooldown: state.cooldown, run, submitError, clearError };
};
