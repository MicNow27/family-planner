import "./CheckEmail.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  formatTime,
  ONE_HOUR,
  ONE_MINUTE,
} from "@/features/auth/CheckEmail/timeLogic.ts";
import { useCooldownAction } from "@/features/auth/CheckEmail/useCooldownAction.ts";
import {
  CHECK_EMAIL,
  RESEND_EMAIL_BUTTON,
  RESEND_EMAIL_BUTTON_WAIT,
} from "@copy/email.ts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const CheckEmail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email: string | undefined = state?.email;

  useEffect(() => {
    if (!email) navigate("/", { replace: true });
  }, [email, navigate]);

  const { resendEmail } = useAuth();

  const { cooldown, run, submitError } = useCooldownAction({
    action: () => resendEmail(email!),
    storageKey: "checkEmailCooldown",
    cooldownSequence: [ONE_MINUTE, ONE_HOUR],
  });

  return (
    <>
      <p>{CHECK_EMAIL}</p>
      <PrimaryButton
        onClick={run}
        disabled={cooldown > 0}
        text={
          cooldown > 0
            ? RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))
            : RESEND_EMAIL_BUTTON
        }
      />
      {submitError && <p>{submitError}</p>}
    </>
  );
};

export default CheckEmail;
