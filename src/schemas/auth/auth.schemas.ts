import { EMAIL_ERROR } from "@copy/email.ts";
import {
  PASSWORD_CONFIRM_ERROR_LENGTH,
  PASSWORD_ERROR_LENGTH,
} from "@copy/password.ts";
import { z } from "zod";

export const emailSchema = z.email(EMAIL_ERROR);

export const passwordSchema = z.string().min(8, PASSWORD_ERROR_LENGTH);

export const confirmPasswordSchema = z
  .string()
  .min(1, PASSWORD_CONFIRM_ERROR_LENGTH);
