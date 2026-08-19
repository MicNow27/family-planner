import { BASE_URL } from "@/config";
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
    const { data } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
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

  const resendEmail = async (email: string): Promise<AuthError> => {
    const { error } = await supabaseClient.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${BASE_URL}/auth-callback`,
      },
    });

    return { error: error?.message ?? null };
  };

  const resetPassword = async (email: string): Promise<AuthError> => {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASE_URL}/reset-password`,
    });

    return { error: error?.message ?? null };
  };

  const updatePassword = async (password: string): Promise<AuthError> => {
    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    return { error: error?.message ?? null };
  };

  return (
    <AuthContext
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resendEmail,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
