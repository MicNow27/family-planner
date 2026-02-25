import { passwordConfirmationSchema } from "@/components/forms/authForm/schemas/passwordConfirmation.schema.ts";
import { z } from "zod";

export const resetPasswordSchema = passwordConfirmationSchema;

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
