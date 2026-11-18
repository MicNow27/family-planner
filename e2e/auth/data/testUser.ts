import type { AuthTypes } from "@/features/auth/types/authTypes.ts";

export const testUser: AuthTypes = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!,
};
