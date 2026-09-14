import {
  NAME_LENGTH_ERROR,
  NAME_REQUIRED_ERROR,
  NAME_VALID_ERROR,
} from "@copy/onboarding/name.ts";
import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(1, NAME_REQUIRED_ERROR)
  .max(30, NAME_LENGTH_ERROR)
  .regex(/^[\p{L}\p{M}' -]+$/u, NAME_VALID_ERROR);
