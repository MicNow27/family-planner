import {
  getInitialLevel,
  getNextLevel,
  getRemainingCooldownTime,
  setCooldownTime,
  setNextLevel,
} from "@/features/auth/CheckEmail/timeLogic.ts";
import type { AuthError } from "@/types/auth.ts";
import { EMAIL_RESENT_ERROR } from "@copy/email.ts";
import { useEffect, useState } from "react";

type UseCooldownActionOptions = {
  action: () => Promise<AuthError>;
  storageKey: string;
  cooldownSequence: number[];
};

type UseCooldownActionReturn = {
  cooldown: number;
  run: () => Promise<void>;
  submitError: string | null;
  setSubmitError: (error: string | null) => void;
};

type UseCooldownActionState = {
  level: number;
  cooldown: number;
};

export const useCooldownAction = ({
  action,
  storageKey,
  cooldownSequence,
}: UseCooldownActionOptions): UseCooldownActionReturn => {
  const [state, setState] = useState<UseCooldownActionState>(() => {
    const level = getInitialLevel(storageKey);
    const cooldown = getRemainingCooldownTime(
      storageKey,
      cooldownSequence[level],
    );

    return { level, cooldown };
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);

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

  return { cooldown: state.cooldown, run, submitError, setSubmitError };
};
