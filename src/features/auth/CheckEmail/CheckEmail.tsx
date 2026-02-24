import "./CheckEmail.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import { formatTime } from "@/features/auth/CheckEmail/timeLogic.ts";
import { useResendCooldown } from "@/features/auth/CheckEmail/useResendCooldown.ts";
import {
  CHECK_EMAIL,
  RESEND_EMAIL_BUTTON,
  RESEND_EMAIL_BUTTON_WAIT,
} from "@copy/email.ts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const CheckEmail = () => {
  const { state } = useLocation();
  const email: string | undefined = state?.email;
  const navigate = useNavigate();
  const { cooldown, resend, resendError } = useResendCooldown(email);

  useEffect(() => {
    if (!email) navigate("/", { replace: true });
  }, [email, navigate]);

  return (
    <>
      <p>{CHECK_EMAIL}</p>
      <PrimaryButton
        onClick={resend}
        disabled={cooldown > 0}
        text={
          cooldown > 0
            ? RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))
            : RESEND_EMAIL_BUTTON
        }
      />
      {resendError && <p>{resendError}</p>}
    </>
  );
};

export default CheckEmail;
