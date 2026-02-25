import { EMAIL_ERROR } from "@copy/email.ts";
import {
  PASSWORD_CONFIRM_ERROR_LENGTH,
  PASSWORD_CONFIRM_ERROR_MATCH,
  PASSWORD_ERROR_LENGTH,
  PASSWORD_ERROR_LOWERCASE,
  PASSWORD_ERROR_NUMBER,
  PASSWORD_ERROR_SPECIAL,
  PASSWORD_ERROR_UPPERCASE,
} from "@copy/password.ts";
import { z } from "zod";

export const emailSchema = z.email(EMAIL_ERROR);

export const passwordSchema = z.string().min(8, PASSWORD_ERROR_LENGTH);

export const strongPasswordSchema = z
  .string()
  .min(8, PASSWORD_ERROR_LENGTH)
  .regex(/[A-Z]/, PASSWORD_ERROR_UPPERCASE)
  .regex(/[a-z]/, PASSWORD_ERROR_LOWERCASE)
  .regex(/[0-9]/, PASSWORD_ERROR_NUMBER)
  .regex(/[^A-Za-z0-9]/, PASSWORD_ERROR_SPECIAL);

export const confirmPasswordSchema = z
  .string()
  .min(1, PASSWORD_CONFIRM_ERROR_LENGTH);

type ConfirmPassword = {
  password: string;
  confirmPassword: string;
};

export const withPasswordConfirmation = <T extends ConfirmPassword>(
  schema: z.ZodType<T>,
) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: PASSWORD_CONFIRM_ERROR_MATCH,
    path: ["confirmPassword"],
  });
