import PrimaryButton from "@/components/buttons/PrimaryButton.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  formatTime,
  ONE_HOUR,
  ONE_MINUTE,
} from "@/hooks/useCooldown/timeLogic.ts";
import { useCooldown } from "@/hooks/useCooldown/useCooldown.ts";
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

  const { cooldown, run, submitError } = useCooldown({
    action: () => resendEmail(email!),
    storageKey: "checkEmailCooldown",
    cooldownSequence: [ONE_MINUTE, ONE_HOUR],
  });

  return (
    <>
      <p className="text-primary-text text-base">{CHECK_EMAIL}</p>

      <div className="h-5">
        {cooldown > 0 && (
          <p className="text-tertiary-text text-sm">
            {RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))}
          </p>
        )}
        {submitError && <p className="text-error text-sm">{submitError}</p>}
      </div>

      <PrimaryButton
        onClick={run}
        disabled={cooldown > 0}
        text={RESEND_EMAIL_BUTTON}
      />
    </>
  );
};

export default CheckEmail;
