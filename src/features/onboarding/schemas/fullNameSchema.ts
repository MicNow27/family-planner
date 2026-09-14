import { nameSchema } from "@/features/onboarding/schemas/nameSchema/nameSchema.ts";
import { z } from "zod";

export const fullNameSchema = z.object({
  fullName: nameSchema,
});

export type FullNameFormData = z.infer<typeof fullNameSchema>;
