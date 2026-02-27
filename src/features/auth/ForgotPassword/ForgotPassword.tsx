import "./ForgotPassword.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/components/forms/authForm/schemas/forgotPassword.schema.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  formatTime,
  ONE_HOUR,
  ONE_MINUTE,
} from "@/features/auth/CheckEmail/timeLogic.ts";
import { useCooldownAction } from "@/features/auth/CheckEmail/useCooldownAction.ts";
import {
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  RESEND_EMAIL_BUTTON_WAIT,
} from "@copy/email.ts";
import { SUBMIT } from "@copy/general.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [liveValidate, setLiveValidate] = useState({ email: false });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { cooldown, run, submitError, setSubmitError } = useCooldownAction({
    action: () => resetPassword(getValues("email")),
    storageKey: "forgotPasswordCooldown",
    cooldownSequence: [0, ONE_MINUTE, ONE_HOUR],
  });

  const onSubmit = async () => {
    await run();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">{EMAIL_LABEL}</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            onBlur: () => {
              if (!dirtyFields.email) return;
              void trigger("email");
              setLiveValidate((prev) => ({ ...prev, email: true }));
            },
            onChange: () => {
              if (!dirtyFields.email || !liveValidate.email) return;
              setSubmitError(null);
              void trigger("email");
            },
          })}
          placeholder={EMAIL_PLACEHOLDER}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {isSubmitting && <p>Sending request...</p>}
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
