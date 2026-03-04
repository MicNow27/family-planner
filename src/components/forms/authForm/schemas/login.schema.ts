import {
  emailField,
  passwordField,
} from "@/components/forms/authForm/schemas/auth.fields.ts";
import { z } from "zod";

export const loginSchema = z.object({
  ...emailField,
  ...passwordField,
});

export type LoginFormData = z.infer<typeof loginSchema>;
