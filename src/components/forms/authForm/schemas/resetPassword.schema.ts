import {
  confirmPasswordField,
  strongPasswordField,
} from "@/components/forms/authForm/schemas/auth.fields.ts";
import { withPasswordConfirmation } from "@/components/forms/authForm/schemas/auth.schemas.ts";
import { z } from "zod";

export const resetPasswordSchema = withPasswordConfirmation(
  z.object({
    ...strongPasswordField,
    ...confirmPasswordField,
  }),
);

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
