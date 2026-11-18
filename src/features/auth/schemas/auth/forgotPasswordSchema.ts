import { emailField } from "@/features/auth/schemas/auth/authFields.ts";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  ...emailField,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
