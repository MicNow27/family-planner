import { passwordConfirmationSchema } from "@/features/auth/schemas/auth/passwordConfirmation/passwordConfirmationSchema.ts";
import { z } from "zod";

export const resetPasswordSchema = passwordConfirmationSchema;

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
