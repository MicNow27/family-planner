import type { ResendEmailTime } from "@/types/resendEmailTime.ts";

export const ONE_HOUR = 60;
export const ONE_MINUTE = 10;

const getNow = (): number => Math.floor(Date.now() / 1000);

export const setCooldownTime = (
  storageKey: string,
  secondsFromNow: number,
): void => {
  const unlockTime = getNow() + secondsFromNow;
  localStorage.setItem(storageKey, unlockTime.toString());
};

export const getInitialLevel = (storageKey: string): number => {
  const level: string | null = localStorage.getItem(`${storageKey}_level`);
  return level ? parseInt(level, 10) : 0;
};

export const getNextLevel = (
  currLevel: number,
  cooldownSequence: number[],
): number => Math.min(currLevel + 1, cooldownSequence.length - 1);

export const setNextLevel = (storageKey: string, level: number): void =>
  localStorage.setItem(`${storageKey}_level`, level.toString());

const getStoredTime = (storageKey: string): number | null => {
  const time: string | null = localStorage.getItem(storageKey);
  return time ? parseInt(time, 10) : null;
};

export const getRemainingCooldownTime = (
  storageKey: string,
  initialValue: number,
): number => {
  const storedTime = getStoredTime(storageKey);

  if (storedTime) return Math.max(0, storedTime - getNow());
  else {
    setCooldownTime(storageKey, initialValue);
    return initialValue;
  }
};

export const formatTime = (secs: number): ResendEmailTime => {
  if (secs >= 60) {
    const minutes: number = Math.floor(secs / 60);
    const seconds: number = secs % 60;
    return { minutes, seconds };
  }
  return { seconds: secs };
};
