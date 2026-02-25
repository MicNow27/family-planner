import { useAuth } from "@/context/auth/useAuth.ts";
import {
  getRemainingCooldownTime,
  ONE_HOUR,
  setCooldownTime,
} from "@/features/auth/CheckEmail/timeLogic.ts";
import { EMAIL_RESENT_ERROR } from "@copy/email.ts";
import { useEffect, useState } from "react";

type UseResendCooldownReturn = {
  cooldown: number;
  resend: () => Promise<void>;
  submitError: string | null;
};

export const useResendCooldown = (email?: string): UseResendCooldownReturn => {
  const { resendEmail } = useAuth();

  const [cooldown, setCooldown] = useState<number>(getRemainingCooldownTime());
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const resend = async () => {
    setSubmitError(null);
    if (!email) return;

    const { error } = await resendEmail(email);

    if (error) setSubmitError(EMAIL_RESENT_ERROR);
    else {
      setCooldownTime(ONE_HOUR);
      setCooldown(ONE_HOUR);
    }
  };

  return { cooldown, resend, submitError };
};
