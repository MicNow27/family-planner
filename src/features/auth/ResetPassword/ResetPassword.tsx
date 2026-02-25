import "./ResetPassword.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "@/components/forms/authForm/schemas/resetPassword.schema.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import { SUBMIT } from "@copy/general.ts";
import {
  PASSWORD_CONFIRM_LABEL,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_CREATE_PLACEHOLDER,
  PASSWORD_LABEL,
} from "@copy/password.ts";
import { RESET_PASSWORD_ERROR } from "@copy/resetPassword.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [liveValidate, setLiveValidate] = useState({
    password: false,
    confirmPassword: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setSubmitError(null);

    const { error } = await updatePassword(data.password);

    if (error) setSubmitError(RESET_PASSWORD_ERROR);
    else navigate("/login", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="password">{PASSWORD_LABEL}</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            onBlur: () => {
              if (!dirtyFields.password) return;
              void trigger("password");
              setLiveValidate((prev) => ({ ...prev, password: true }));
            },
            onChange: () => {
              if (!dirtyFields.password || !liveValidate.password) return;
              setSubmitError(null);
              void trigger("password");
            },
          })}
          placeholder={PASSWORD_CREATE_PLACEHOLDER}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">{PASSWORD_CONFIRM_LABEL}</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            onBlur: () => {
              if (!dirtyFields.confirmPassword) return;
              void trigger("confirmPassword");
              setLiveValidate((prev) => ({ ...prev, confirmPassword: true }));
            },
            onChange: () => {
              if (!dirtyFields.confirmPassword || !liveValidate.confirmPassword)
                return;
              setSubmitError(null);
              void trigger("confirmPassword");
            },
          })}
          placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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

export default ResetPassword;
