import { confirmPasswordSchema, emailSchema, passwordSchema } from "@/schemas/auth/auth.schemas.ts";
import { strongPasswordSchema } from "@/schemas/auth/strongPassword/strongPassword.schema.ts";

export const emailField = { email: emailSchema };
export const passwordField = { password: passwordSchema };
export const strongPasswordField = { password: strongPasswordSchema };
export const confirmPasswordField = { confirmPassword: confirmPasswordSchema };
