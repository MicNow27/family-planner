import type { SelectOption } from "@/components/forms/formFields/types.ts";
import {
  FATHER,
  GUARDIAN,
  HOME_MANAGER,
  HUSBAND,
  MOTHER,
  PARENT,
  PARTNER,
  WIFE,
} from "@copy/onboarding/role.ts";

export const roleOptions: SelectOption[] = [
  { value: "home-manager", label: HOME_MANAGER },
  { value: "wife", label: WIFE },
  { value: "husband", label: HUSBAND },
  { value: "partner", label: PARTNER },
  { value: "parent", label: PARENT },
  { value: "mother", label: MOTHER },
  { value: "father", label: FATHER },
  { value: "guardian", label: GUARDIAN },
];
