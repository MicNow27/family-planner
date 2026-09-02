import type { Auth } from "@/types/auth.ts";

export const testUser: Auth = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!,
};
