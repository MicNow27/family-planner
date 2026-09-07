import {
  PASSWORD_ERROR_LENGTH,
  PASSWORD_ERROR_LOWERCASE,
  PASSWORD_ERROR_NUMBER,
  PASSWORD_ERROR_SPECIAL,
  PASSWORD_ERROR_UPPERCASE,
} from "@copy/auth/password.ts";
import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(8, PASSWORD_ERROR_LENGTH)
  .regex(/[A-Z]/, PASSWORD_ERROR_UPPERCASE)
  .regex(/[a-z]/, PASSWORD_ERROR_LOWERCASE)
  .regex(/[0-9]/, PASSWORD_ERROR_NUMBER)
  .regex(/[^A-Za-z0-9]/, PASSWORD_ERROR_SPECIAL);
