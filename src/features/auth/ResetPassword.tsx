import FormFeedback from "@/components/forms/FormFeedback.tsx";
import PasswordFormField from "@/components/forms/FormField/PasswordFormField.tsx";
import Form from "@/components/forms/FormWrapper/Form.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "@/schemas/auth/resetPassword.schema.ts";
import {
  RESET_PASSWORD,
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
        <Form form={form} onSubmit={onSubmit} submitButtonText={SUBMIT}>
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
            register={register(
              "confirmPassword",
              liveValidate("confirmPassword"),
            )}
            value={watch("confirmPassword")}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
          />
        </Form>

        <div className="relative flex h-6 items-center pt-2">
          <FormFeedback text={RESET_PASSWORD_WAIT} condition={isSubmitting} />
          <FormFeedback
            type={"error"}
            text={submitError ?? ""}
            condition={!isSubmitting && !!submitError}
          />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
