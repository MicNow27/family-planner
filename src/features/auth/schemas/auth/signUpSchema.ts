import { emailField } from "@/features/auth/schemas/auth/authFields.ts";
import { passwordConfirmationSchema } from "@/features/auth/schemas/auth/passwordConfirmation/passwordConfirmationSchema.ts";
import { z } from "zod";

export const signUpSchema = passwordConfirmationSchema.extend({
  ...emailField,
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
