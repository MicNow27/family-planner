import "./AuthCallback.scss";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCallback = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/onboarding", { replace: true });
    else navigate("/login", { replace: true });
  }, [user, loading, navigate]);

  return <p>Confirming your email...</p>;
};

export default AuthCallback;
