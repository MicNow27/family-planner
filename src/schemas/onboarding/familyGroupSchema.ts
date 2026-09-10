import { nameSchema } from "@/schemas/onboarding/nameSchema/nameSchema.ts";
import { z } from "zod";

export const familyGroupSchema = z.object({
  familyGroupName: nameSchema,
});

export type FamilyGroupFormData = z.infer<typeof familyGroupSchema>;
