import {
  confirmPasswordField,
  emailField,
  strongPasswordField,
} from "@/components/forms/authForm/schemas/auth.fields.ts";
import { withPasswordConfirmation } from "@/components/forms/authForm/schemas/auth.schemas.ts";
import { z } from "zod";

export const signUpSchema = withPasswordConfirmation(
  z.object({
    ...emailField,
    ...strongPasswordField,
    ...confirmPasswordField,
  }),
);

export type SignUpFormData = z.infer<typeof signUpSchema>;
