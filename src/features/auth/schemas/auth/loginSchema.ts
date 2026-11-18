import { emailField, passwordField } from "@/features/auth/schemas/auth/authFields.ts";
import { z } from "zod";

export const loginSchema = z.object({
  ...emailField,
  ...passwordField,
});

export type LoginFormData = z.infer<typeof loginSchema>;
