import type { AuthCredentials } from "@/features/auth/types/authTypes.ts";

export const testUser: AuthCredentials = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!,
};
