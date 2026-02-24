import type { ResendEmailTime } from "@/types/resendEmailTime.ts";

const STORAGE_KEY = "checkEmailCooldown";
export const ONE_HOUR = 200;
const ONE_MINUTE = 60;

const getNow = (): number => Math.floor(Date.now() / 1000);

export const setCooldownTime = (secondsFromNow: number): void => {
  const unlockTime = getNow() + secondsFromNow;
  localStorage.setItem(STORAGE_KEY, unlockTime.toString());
};

const getStoredTime = (): string | null => localStorage.getItem(STORAGE_KEY);

export const getRemainingCooldownTime = (): number => {
  const storedTime = getStoredTime();

  if (storedTime) {
    const unlockTime = parseInt(storedTime, 10);
    return Math.max(0, unlockTime - getNow());
  } else {
    setCooldownTime(ONE_MINUTE);
    return ONE_MINUTE;
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
