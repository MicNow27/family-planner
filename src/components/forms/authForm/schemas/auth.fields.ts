import {
  confirmPasswordSchema,
  emailSchema,
  passwordSchema,
  strongPasswordSchema,
} from "@/components/forms/authForm/schemas/auth.schemas.ts";

export const emailField = { email: emailSchema };
export const passwordField = { password: passwordSchema };
export const strongPasswordField = { password: strongPasswordSchema };
export const confirmPasswordField = { confirmPassword: confirmPasswordSchema };
