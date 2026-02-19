import { BASE_URL } from "@/config/dev.ts";
import FullScreenLoader from "@/features/auth/FullScreenLoader/FullScreenLoader.tsx";
import { supabaseClient } from "@/services/apiService.ts";
import type { Auth, AuthError } from "@/types/auth.ts";
import type { Session, User } from "@supabase/supabase-js";
import { type ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    void init();

    const { data } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => data.subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password }: Auth): Promise<AuthError> => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${BASE_URL}/auth-callback`,
      },
    });

    return { error: error?.message ?? null };
  };

  const signIn = async ({ email, password }: Auth): Promise<AuthError> => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error?.message ?? null };
  };

  const signOut = async (): Promise<void> => {
    await supabaseClient.auth.signOut();
  };

  if (loading) return <FullScreenLoader />;

  return (
    <AuthContext value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;

// const value = useMemo(
//   () => ({ user, session, loading, signUp, signIn, signOut }),
//   [user, session, loading],
// );
//
// return <AuthContext value={value}>{children}</AuthContext>;
