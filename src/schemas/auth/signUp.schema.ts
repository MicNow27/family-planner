import { emailField } from "@/schemas/auth/auth.fields.ts";
import { passwordConfirmationSchema } from "@/schemas/auth/passwordConfirmation/passwordConfirmation.schema.ts";
import { z } from "zod";

export const signUpSchema = passwordConfirmationSchema.extend({
  ...emailField,
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
