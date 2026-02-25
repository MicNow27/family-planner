import { emailField } from "@/components/forms/authForm/schemas/auth.fields.ts";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  ...emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
