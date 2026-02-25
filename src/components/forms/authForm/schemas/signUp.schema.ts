import { emailField } from "@/components/forms/authForm/schemas/auth.fields.ts";
import { passwordConfirmationSchema } from "@/components/forms/authForm/schemas/passwordConfirmation.schema.ts";
import { z } from "zod";

export const signUpSchema = passwordConfirmationSchema.extend({
  ...emailField,
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
