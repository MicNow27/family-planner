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

export const signUpSchema = z
  .object({
    email: z.email(EMAIL_ERROR),
    password: z
      .string()
      .min(8, PASSWORD_ERROR_LENGTH)
      .regex(/[A-Z]/, PASSWORD_ERROR_UPPERCASE)
      .regex(/[a-z]/, PASSWORD_ERROR_LOWERCASE)
      .regex(/[0-9]/, PASSWORD_ERROR_NUMBER)
      .regex(/[^A-Za-z0-9]/, PASSWORD_ERROR_SPECIAL),
    confirmPassword: z.string().min(1, PASSWORD_CONFIRM_ERROR_LENGTH),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: PASSWORD_CONFIRM_ERROR_MATCH,
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
