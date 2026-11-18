import type { AuthError, AuthTypes } from "@/features/auth/types/authTypes.ts";
import type { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (authCredentials: AuthTypes) => Promise<AuthError>;
  signIn: (authCredentials: AuthTypes) => Promise<AuthError>;
  signOut: () => Promise<void>;
  resendEmail: (email: string) => Promise<AuthError>;
  resetPassword: (email: string) => Promise<AuthError>;
  updatePassword: (password: string) => Promise<AuthError>;
};
