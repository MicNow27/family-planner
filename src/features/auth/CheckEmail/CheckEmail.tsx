import "./CheckEmail.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  CHECK_EMAIL,
  EMAIL_RESENT_ERROR,
  RESEND_EMAIL_BUTTON,
  RESEND_EMAIL_BUTTON_WAIT,
} from "@copy/auth.ts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const CheckEmail = () => {
  const { state } = useLocation();
  const email: string | undefined = state?.email;

  const { resendEmail } = useAuth();
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);
  const [resendError, setResendError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email) return;

    const { error } = await resendEmail(email);

    if (error) setResendError(EMAIL_RESENT_ERROR);
    else setCooldown(60);
  };

  useEffect(() => {
    if (!email) navigate("/", { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <>
      <p>{CHECK_EMAIL}</p>
      <PrimaryButton
        onClick={handleResend}
        disabled={cooldown > 0}
        text={
          cooldown > 0
            ? RESEND_EMAIL_BUTTON_WAIT(cooldown)
            : RESEND_EMAIL_BUTTON
        }
      />
      {resendError && <p>{resendError}</p>}
    </>
  );
};

export default CheckEmail;
