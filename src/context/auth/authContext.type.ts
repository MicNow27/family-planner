import type { Auth, AuthError } from "@/types/auth.ts";
import type { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (authCredentials: Auth) => Promise<AuthError>;
  signIn: (authCredentials: Auth) => Promise<AuthError>;
  signOut: () => Promise<void>;
  resendEmail: (email: string) => Promise<AuthError>;
  resetPassword: (email: string) => Promise<AuthError>;
  updatePassword: (password: string) => Promise<AuthError>;
};
