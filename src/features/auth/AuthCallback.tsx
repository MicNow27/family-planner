import { useAuth } from "@/context/auth/useAuth.ts";
import email from "@assets/images/email.svg";
import { CONFIRMING_EMAIL } from "@copy/email.ts";
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

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{CONFIRMING_EMAIL}</h1>
      <div className="flex justify-center">
        <img src={email} alt="logo" className="h-72" />
      </div>
    </section>
  );
};

export default AuthCallback;
