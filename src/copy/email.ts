import type { ResendEmailTime } from "@/types/resendEmailTime.ts";

export const EMAIL_LABEL = "Email";
export const EMAIL_PLACEHOLDER = "Enter your email";
export const EMAIL_ERROR = "Please enter a valid email address";

export const CHECK_EMAIL =
  "Check your inbox to verify your email before continuing.";
export const RESEND_EMAIL_BUTTON = "Resend Confirmation Email";

export const RESEND_EMAIL_BUTTON_WAIT = ({
  minutes,
  seconds,
}: ResendEmailTime) => {
  if (minutes) return `Resend in ${minutes} minutes and ${seconds} seconds`;
  else return `Resend in ${seconds} seconds`;
};

export const EMAIL_RESENT_ERROR =
  "Could not resend the email. Please try again later.";

export const CONFIRMING_EMAIL = "Confirming your email...";
