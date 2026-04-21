import PrimaryButton from "@/components/buttons/PrimaryButton.tsx";
import FormFeedback from "@/components/forms/FormFeedback.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  formatTime,
  ONE_HOUR,
  ONE_MINUTE,
} from "@/hooks/useCooldown/timeLogic/timeLogic.ts";
import { useCooldown } from "@/hooks/useCooldown/useCooldown.ts";
import {
  CHECK_EMAIL,
  CHECK_EMAIL_INSTRUCTION,
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
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{CHECK_EMAIL}</h1>
      <div className="form-card">
        <p className="text-secondary-text mb-7">
          {CHECK_EMAIL_INSTRUCTION(email!)}
        </p>

        <PrimaryButton
          onClick={run}
          disabled={cooldown > 0}
          text={RESEND_EMAIL_BUTTON}
        />

        <div className="relative flex h-6 items-center pt-2">
          <FormFeedback
            type={"error"}
            text={submitError ?? ""}
            condition={!!submitError}
          />
          <FormFeedback
            text={RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))}
            condition={cooldown > 0}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckEmail;
