import {
  BIRTHDAY_FUTURE_ERROR,
  BIRTHDAY_INVALID_ERROR,
  BIRTHDAY_REQUIRED_ERROR,
} from "@copy/onboarding/birthday.ts";
import { z } from "zod";

export const birthdaySchema = z
  .string()
  .min(1, BIRTHDAY_REQUIRED_ERROR)
  .pipe(z.iso.date(BIRTHDAY_INVALID_ERROR))
  .refine((value) => {
    const date = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  }, BIRTHDAY_FUTURE_ERROR);

export type BirthdayFormData = z.infer<typeof birthdaySchema>;
