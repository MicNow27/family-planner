import type { Role } from "@/features/onboarding/types.ts";
import { z } from "zod";

const roleValues = [
  "home-manager",
  "wife",
  "husband",
  "partner",
  "parent",
  "mother",
  "father",
  "guardian",
] as const satisfies readonly Role[];

export const roleSchema = z.object({
  role: z.enum(roleValues),
});

export type RoleFormData = z.infer<typeof roleSchema>;
