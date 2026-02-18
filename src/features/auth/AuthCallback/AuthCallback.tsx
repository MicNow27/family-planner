import "./AuthCallback.scss";
import { supabaseClient } from "@/services/apiService.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        navigate(session ? "/onboarding" : "/login");
      },
    );

    return () => data.subscription.unsubscribe();
  }, [navigate]);

  return <p>Confirming your email...</p>;
};

export default AuthCallback;
