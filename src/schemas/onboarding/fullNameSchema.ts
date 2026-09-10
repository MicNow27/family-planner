import { nameSchema } from "@/schemas/onboarding/nameSchema/nameSchema.ts";
import { z } from "zod";

export const fullNameSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
});

export type FullNameFormData = z.infer<typeof fullNameSchema>;
