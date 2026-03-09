import "./ForgotPassword.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import FormField from "@/components/forms/FormField/FormField.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  formatTime,
  ONE_HOUR,
  ONE_MINUTE,
} from "@/hooks/useCooldown/timeLogic.ts";
import { useCooldown } from "@/hooks/useCooldown/useCooldown.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schemas/auth/forgotPassword.schema.ts";
import {
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  RESEND_EMAIL_BUTTON_WAIT,
} from "@copy/email.ts";
import { RESET_PASSWORD_WAIT } from "@copy/forgotPassword.ts";
import { SUBMIT } from "@copy/general.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { cooldown, run, submitError, setSubmitError } = useCooldown({
    action: () => resetPassword(getValues("email")),
    storageKey: "forgotPasswordCooldown",
    cooldownSequence: [0, ONE_MINUTE, ONE_HOUR],
  });

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: () => setSubmitError(null),
  });

  const onSubmit = async () => await run();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="email"
        label={EMAIL_LABEL}
        type="email"
        placeholder={EMAIL_PLACEHOLDER}
        register={register("email", liveValidate("email"))}
        error={errors.email?.message}
      />

      {isSubmitting && <p>{RESET_PASSWORD_WAIT}</p>}
      {!isSubmitting && submitError && <p>{submitError}</p>}
      {cooldown > 0 && <p>{RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))}</p>}

      <PrimaryButton
        type="submit"
        text={SUBMIT}
        disabled={isSubmitting || !isValid || cooldown > 0}
      />
    </form>
  );
};

export default ForgotPassword;
