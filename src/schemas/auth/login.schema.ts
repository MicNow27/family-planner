import { emailField, passwordField } from "@/schemas/auth/auth.fields.ts";
import { z } from "zod";

export const loginSchema = z.object({
  ...emailField,
  ...passwordField,
});

export type LoginFormData = z.infer<typeof loginSchema>;
