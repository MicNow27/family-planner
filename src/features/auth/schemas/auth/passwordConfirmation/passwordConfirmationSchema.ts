import { PASSWORD_CONFIRM_ERROR_MATCH } from "@/features/auth/copy/password.ts";
import { confirmPasswordField, strongPasswordField } from "@/features/auth/schemas/auth/authFields.ts";
import { z } from "zod";

export const passwordConfirmationSchema = z
  .object({
    ...strongPasswordField,
    ...confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: PASSWORD_CONFIRM_ERROR_MATCH,
    path: ["confirmPassword"],
  });
