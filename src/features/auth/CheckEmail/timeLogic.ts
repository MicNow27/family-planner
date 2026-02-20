import type { ResendEmailTime } from "@/types/resendEmailTime.ts";

const STORAGE_KEY = "checkEmailCooldown";
export const ONE_HOUR = 200;
const ONE_MINUTE = 60;

const getNow = (): number => Date.now() / 1000;

const timeLogic = (): string => {
  const nowPlusHour: number = Math.floor(getNow()) + ONE_HOUR;
  return nowPlusHour.toString();
};

export const setOneHour = (): void =>
  localStorage.setItem(STORAGE_KEY, timeLogic());

const inOneMinute = (): string => {
  const nowPlusMinute: number = Math.floor(getNow()) + ONE_MINUTE;
  return nowPlusMinute.toString();
};

const setOneMinute = (): void =>
  localStorage.setItem(STORAGE_KEY, inOneMinute());

const getStoredTime = (): string | null => localStorage.getItem(STORAGE_KEY);

export const getInitialTime = () => {
  const stored = getStoredTime();

  if (stored) {
    const unlockTime = parseInt(stored, 10);
    return Math.max(0, Math.ceil(unlockTime - getNow()));
  }

  setOneMinute();
  return ONE_MINUTE;
};

export const formatTime = (secs: number): ResendEmailTime => {
  if (secs >= 60) {
    const minutes: number = Math.floor(secs / 60);
    const seconds: number = secs % 60;
    return { minutes, seconds };
  }
  return { seconds: secs };
};
