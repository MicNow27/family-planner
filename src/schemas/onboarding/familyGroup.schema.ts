import { FAMILY_GROUP_LENGTH_ERROR } from "@copy/onboarding/familyGroup.ts";
import { z } from "zod";

export const familyGroupSchema = z.object({
  familyGroupName: z.string().trim().min(1, FAMILY_GROUP_LENGTH_ERROR).max(30, FAMILY_GROUP_LENGTH_ERROR),
});

export type FamilyGroupFormData = z.infer<typeof familyGroupSchema>;
