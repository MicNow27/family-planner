import type { AuthCredentials, AuthError } from "@auth/types/authTypes.ts";
import type { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (authCredentials: AuthCredentials) => Promise<AuthError>;
  signIn: (authCredentials: AuthCredentials) => Promise<AuthError>;
  signOut: () => Promise<void>;
  resendEmail: (email: string) => Promise<AuthError>;
  resetPassword: (email: string) => Promise<AuthError>;
  updatePassword: (password: string) => Promise<AuthError>;
};
