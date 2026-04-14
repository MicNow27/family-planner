import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/FormField/FormField.tsx";
import PasswordFormField from "@/components/forms/FormField/PasswordFormField.tsx";
import Form from "@/components/forms/FormWrapper/Form.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type SignUpFormData,
  signUpSchema,
} from "@/schemas/auth/signUp.schema.ts";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER } from "@copy/email.ts";
import {
  PASSWORD_CONFIRM_LABEL,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_CREATE_PLACEHOLDER,
  PASSWORD_LABEL,
} from "@copy/password.ts";
import {
  SIGN_UP,
  SIGN_UP_BUTTON_WAIT,
  SIGN_UP_ERROR_GENERAL,
} from "@copy/signUp.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
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

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitError(null);

    const { error } = await signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.toLowerCase().includes("rate limit")) {
        navigate("/check-email", { state: { email: data.email } });
      } else {
        setSubmitError(SIGN_UP_ERROR_GENERAL);
      }
    } else {
      navigate("/check-email", { state: { email: data.email } });
    }
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{SIGN_UP}</h1>
      <div className="form-card">
        <Form form={form} onSubmit={onSubmit} submitButtonText={SIGN_UP}>
          <FormField
            id="email"
            label={EMAIL_LABEL}
            type="email"
            placeholder={EMAIL_PLACEHOLDER}
            register={register("email", liveValidate("email"))}
            error={errors.email?.message}
            disabled={isSubmitting}
          />

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
          <FormFeedback text={SIGN_UP_BUTTON_WAIT} condition={isSubmitting} />
          <FormFeedback
            type={"error"}
            text={submitError ?? ""}
            condition={!isSubmitting && typeof submitError === "string"}
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
