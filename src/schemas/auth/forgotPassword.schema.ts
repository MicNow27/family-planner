import { emailField } from "@/schemas/auth/auth.fields.ts";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  ...emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
