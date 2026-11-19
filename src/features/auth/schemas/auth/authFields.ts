import { confirmPasswordSchema, emailSchema, passwordSchema } from "@auth/schemas/auth/authSchemas.ts";
import { strongPasswordSchema } from "@auth/schemas/auth/strongPassword/strongPasswordSchema.ts";

export const emailField = { email: emailSchema };
export const passwordField = { password: passwordSchema };
export const strongPasswordField = { password: strongPasswordSchema };
export const confirmPasswordField = { confirmPassword: confirmPasswordSchema };
