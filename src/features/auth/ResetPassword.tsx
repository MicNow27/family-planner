import FormField from "@/components/forms/FormField/FormField.tsx";
import FormWrapper from "@/components/forms/FormWrapper/FormWrapper.tsx";
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

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    register,
    trigger,
    formState: { errors, dirtyFields, isSubmitting },
  } = form;

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
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      submitError={submitError}
      submitButtonText={SUBMIT}
      submittingText={RESET_PASSWORD_WAIT}
    >
      <FormField
        id="password"
        label={PASSWORD_LABEL}
        type="password"
        placeholder={PASSWORD_CREATE_PLACEHOLDER}
        register={register("password", liveValidate("password"))}
        error={errors.password?.message}
        disabled={isSubmitting}
      />

      <FormField
        id="confirmPassword"
        label={PASSWORD_CONFIRM_LABEL}
        type="password"
        placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
        register={register("confirmPassword", liveValidate("confirmPassword"))}
        error={errors.confirmPassword?.message}
        disabled={isSubmitting}
      />
    </FormWrapper>
  );
};

export default ResetPassword;
