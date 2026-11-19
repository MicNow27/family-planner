import { useAuth } from "@auth/context/useAuth.ts";
import { RESET_PASSWORD, RESET_PASSWORD_ERROR, RESET_PASSWORD_WAIT } from "@auth/copy/forgotPassword.ts";
import {
  PASSWORD_CONFIRM_LABEL,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_CREATE_PLACEHOLDER,
  PASSWORD_LABEL,
} from "@auth/copy/password.ts";
import { type ResetPasswordFormData, resetPasswordSchema } from "@auth/schemas/auth/resetPasswordSchema.ts";
import FormFeedback from "@components/forms/FormFeedback.tsx";
import PasswordFormField from "@components/forms/formFields/PasswordFormField.tsx";
import FormWrapper from "@components/forms/formWrappers/FormWrapper.tsx";
import { useLiveValidation } from "@components/forms/hooks/useLiveValidation/useLiveValidation.ts";
import { SUBMIT } from "@copy/general.ts";
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
    watch,
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
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{RESET_PASSWORD}</h1>
      <div className="form-card">
        <FormWrapper form={form} onSubmit={onSubmit} submitButtonText={SUBMIT}>
          <PasswordFormField
            id="password"
            label={PASSWORD_LABEL}
            placeholder={PASSWORD_CREATE_PLACEHOLDER}
            register={register("password", liveValidate("password"))}
            value={watch("password")}
            error={errors.password?.message}
            disabled={isSubmitting}
          />

          <PasswordFormField
            id="confirmPassword"
            label={PASSWORD_CONFIRM_LABEL}
            placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
            register={register("confirmPassword", liveValidate("confirmPassword"))}
            value={watch("confirmPassword")}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
          />
        </FormWrapper>

        <div className="relative flex h-6 items-center pt-2">
          <FormFeedback text={RESET_PASSWORD_WAIT} condition={isSubmitting} />
          <FormFeedback type={"error"} text={submitError ?? ""} condition={!isSubmitting && !!submitError} />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
