import { nameSchema } from "@/features/onboarding/schemas/nameSchema/nameSchema.ts";
import { z } from "zod";

export const familyGroupSchema = z.object({
  familyGroupName: nameSchema,
});

export type FamilyGroupFormData = z.infer<typeof familyGroupSchema>;
