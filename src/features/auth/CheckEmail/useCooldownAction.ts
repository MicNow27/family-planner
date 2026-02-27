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

export const useCooldownAction = ({
  action,
  storageKey,
  cooldownSequence,
}: UseCooldownActionOptions): UseCooldownActionReturn => {
  const [level, setLevel] = useState<number>(getInitialLevel(storageKey));
  const [cooldown, setCooldown] = useState<number>(
    getRemainingCooldownTime(storageKey, cooldownSequence[level]),
  );

  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const run = async () => {
    setSubmitError(null);

    const { error } = await action();

    if (error) setSubmitError(EMAIL_RESENT_ERROR);
    else {
      setLevel((prevLevel) => {
        const nextLevel = getNextLevel(prevLevel, cooldownSequence);
        const nextCooldown = cooldownSequence[nextLevel];

        setNextLevel(storageKey, nextLevel);
        setCooldownTime(storageKey, nextCooldown);
        setCooldown(nextCooldown);

        return nextLevel;
      });
    }
  };

  return { cooldown, run, submitError, setSubmitError };
};
