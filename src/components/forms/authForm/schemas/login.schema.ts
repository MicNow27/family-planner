import { EMAIL_ERROR } from "@copy/email.ts";
import { PASSWORD_ERROR_LENGTH } from "@copy/password.ts";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(EMAIL_ERROR),
  password: z.string().min(8, PASSWORD_ERROR_LENGTH),
});

export type LoginFormData = z.infer<typeof loginSchema>;
