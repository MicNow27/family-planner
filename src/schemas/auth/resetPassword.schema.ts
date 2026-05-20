import { passwordConfirmationSchema } from "@/schemas/auth/passwordConfirmation/passwordConfirmation.schema.ts";
import { z } from "zod";

export const resetPasswordSchema = passwordConfirmationSchema;

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
