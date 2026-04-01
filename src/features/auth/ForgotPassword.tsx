import FormField from "@/components/forms/FormField/FormField.tsx";
import FormWrapper from "@/components/forms/FormWrapper/FormWrapper.tsx";
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

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register,
    trigger,
    getValues,
    formState: { dirtyFields, errors, isSubmitting },
  } = form;

  const { cooldown, run, submitError, clearError } = useCooldown({
    action: () => resetPassword(getValues("email")),
    storageKey: "forgotPasswordCooldown",
    cooldownSequence: [0, ONE_MINUTE, ONE_HOUR],
  });

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: clearError,
  });

  const onSubmit = async () => await run();

  return (
    <>
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        submitError={submitError}
        submitButtonText={SUBMIT}
        submittingText={RESET_PASSWORD_WAIT}
        disableSubmit={cooldown > 0}
      >
        <FormField
          id="email"
          label={EMAIL_LABEL}
          type="email"
          placeholder={EMAIL_PLACEHOLDER}
          register={register("email", liveValidate("email"))}
          error={errors.email?.message}
          disabled={isSubmitting}
        />
      </FormWrapper>
      {cooldown > 0 && (
        <p className="text-tertiary-text text-sm">
          {RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))}
        </p>
      )}
    </>
  );
};

export default ForgotPassword;
