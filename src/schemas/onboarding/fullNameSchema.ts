import { nameSchema } from "@/schemas/onboarding/nameSchema/nameSchema.ts";
import { z } from "zod";

export const fullNameSchema = z.object({
  fullName: nameSchema,
});

export type FullNameFormData = z.infer<typeof fullNameSchema>;
