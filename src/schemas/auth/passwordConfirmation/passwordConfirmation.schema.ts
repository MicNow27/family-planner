import {
  confirmPasswordField,
  strongPasswordField,
} from "@/schemas/auth/auth.fields.ts";
import { PASSWORD_CONFIRM_ERROR_MATCH } from "@copy/password.ts";
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
