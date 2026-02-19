export const LOGIN_ERROR = "Email or password is incorrect";
export const SIGN_UP_ERROR_EMAIL_IN_USE = "Email is already in use";
export const SIGN_UP_ERROR_GENERAL = "Problem signing up";

export const LOGIN_BUTTON_WAIT = "Logging in...";
export const SIGN_UP_BUTTON_WAIT = "Creating Account...";

export const EMAIL_LABEL = "Email";
export const EMAIL_PLACEHOLDER = "Enter your email";
export const EMAIL_ERROR = "Please enter a valid email address";

export const PASSWORD_LABEL = "Password";
export const PASSWORD_ENTER_PLACEHOLDER = "Enter your password";
export const PASSWORD_CREATE_PLACEHOLDER = "Create a password";
export const PASSWORD_ERROR_LENGTH = "Password must be at least 8 characters";
export const PASSWORD_ERROR_UPPERCASE =
  "Password must contain at least one uppercase letter";
export const PASSWORD_ERROR_LOWERCASE =
  "Password must contain at least one lowercase letter";
export const PASSWORD_ERROR_NUMBER =
  "Password must contain at least one number";
export const PASSWORD_ERROR_SPECIAL =
  "Password must contain at least one special character";

export const PASSWORD_CONFIRM_LABEL = "Confirm Password";
export const PASSWORD_CONFIRM_PLACEHOLDER = "Confirm your password";
export const PASSWORD_CONFIRM_ERROR_LENGTH = "Please confirm your password";
export const PASSWORD_CONFIRM_ERROR_MATCH = "Passwords do not match";

export const CHECK_EMAIL =
  "Check your inbox to verify your email before continuing.";
export const RESEND_EMAIL_BUTTON = "Resend Confirmation Email";
export const RESEND_EMAIL_BUTTON_WAIT = (seconds: number) =>
  `Resend in ${seconds} seconds`;
export const EMAIL_RESENT_ERROR =
  "Could not resend the email. Please try again later.";
