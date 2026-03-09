import "./ResetPassword.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import FormField from "@/components/forms/FormField/FormField.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "@/schemas/auth/resetPassword.schema.ts";
import {
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_WAIT,
} from "@copy/forgotPassword.ts";
import { SUBMIT } from "@copy/general.ts";
import {
  PASSWORD_CONFIRM_LABEL,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_CREATE_PLACEHOLDER,
  PASSWORD_LABEL,
} from "@copy/password.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const { signOut, updatePassword } = useAuth();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: () => setSubmitError(null),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setSubmitError(null);

    const { error } = await updatePassword(data.password);

    if (error) {
      setSubmitError(RESET_PASSWORD_ERROR);
    } else {
      await signOut();
      navigate("/login", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="password"
        label={PASSWORD_LABEL}
        type="password"
        placeholder={PASSWORD_CREATE_PLACEHOLDER}
        register={register("password", liveValidate("password"))}
        error={errors.password?.message}
      />

      <FormField
        id="confirmPassword"
        label={PASSWORD_CONFIRM_LABEL}
        type="password"
        placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
        register={register("confirmPassword", liveValidate("confirmPassword"))}
        error={errors.confirmPassword?.message}
      />

      {isSubmitting && <p>{RESET_PASSWORD_WAIT}</p>}
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
