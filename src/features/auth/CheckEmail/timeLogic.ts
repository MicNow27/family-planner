import type { ResendEmailTime } from "@/types/resendEmailTime.ts";

export const ONE_HOUR = 15;
export const ONE_MINUTE = 5;

const getNow = (): number => Math.floor(Date.now() / 1000);

export const setCooldownTime = (key: string, secondsFromNow: number): void => {
  const unlockTime = getNow() + secondsFromNow;
  localStorage.setItem(key, unlockTime.toString());
};

export const getInitialLevel = (key: string): number => {
  const level: string | null = localStorage.getItem(`${key}_level`);
  return level ? parseInt(level, 10) : 0;
};

export const getNextLevel = (
  currLevel: number,
  cooldownSequence: number[],
): number => Math.min(currLevel + 1, cooldownSequence.length - 1);

export const setNextLevel = (key: string, level: number): void =>
  localStorage.setItem(`${key}_level`, level.toString());

const getStoredTime = (key: string): number | null => {
  const time: string | null = localStorage.getItem(key);
  return time ? parseInt(time, 10) : null;
};

export const getRemainingCooldownTime = (
  key: string,
  initialValue: number,
): number => {
  const storedTime = getStoredTime(key);

  if (storedTime) return Math.max(0, storedTime - getNow());
  else {
    setCooldownTime(key, initialValue);
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
