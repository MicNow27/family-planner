import "./ForgotPassword.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/components/forms/authForm/schemas/forgotPassword.schema.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER } from "@copy/email.ts";
import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
} from "@copy/forgotPassword.ts";
import { SUBMIT } from "@copy/general.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  const [liveValidate, setLiveValidate] = useState({ email: false });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setSubmitError(null);

    const { error } = await resetPassword(data.email);

    if (error) setSubmitError(FORGOT_PASSWORD_ERROR);
    else setSubmitError(FORGOT_PASSWORD_SUCCESS);
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

      <PrimaryButton
        type="submit"
        text={SUBMIT}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default ForgotPassword;
