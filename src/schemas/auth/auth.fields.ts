import {
  confirmPasswordSchema,
  emailSchema,
  passwordSchema,
  strongPasswordSchema,
} from "@/schemas/auth/auth.schemas.ts";

export const emailField = { email: emailSchema };
export const passwordField = { password: passwordSchema };
export const strongPasswordField = { password: strongPasswordSchema };
export const confirmPasswordField = { confirmPassword: confirmPasswordSchema };
