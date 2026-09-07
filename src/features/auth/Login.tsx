import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/formFields/FormField.tsx";
import PasswordFormField from "@/components/forms/formFields/PasswordFormField.tsx";
import FormWrapper from "@/components/forms/FormWrapper.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import { type LoginFormData, loginSchema } from "@/schemas/auth/login.schema.ts";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER } from "@copy/auth/email.ts";
import { FORGOT_PASSWORD } from "@copy/auth/forgotPassword.ts";
import { LOGIN, LOGIN_BUTTON_WAIT, LOGIN_ERROR } from "@copy/auth/login.ts";
import { PASSWORD_ENTER_PLACEHOLDER, PASSWORD_LABEL } from "@copy/auth/password.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null);

    const { error } = await signIn({
      email: data.email,
      password: data.password,
    });

    if (error) {
      const lowerError = error.toLowerCase();

      if (lowerError.includes("email not confirmed")) navigate("/check-email", { state: { email: data.email } });
      else setSubmitError(LOGIN_ERROR);
    }
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{LOGIN}</h1>
      <div className="form-card">
        <FormWrapper form={form} onSubmit={onSubmit} submitButtonText={LOGIN}>
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
            placeholder={PASSWORD_ENTER_PLACEHOLDER}
            register={register("password", liveValidate("password"))}
            value={watch("password")}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
        </FormWrapper>

        <Link
          className="text-secondary-text hover:text-primary block w-full pt-1 pr-2 text-right text-xs italic"
          to="/forgot-password"
        >
          {FORGOT_PASSWORD}
        </Link>

        <div className="relative flex h-6 items-center pt-2">
          <FormFeedback text={LOGIN_BUTTON_WAIT} condition={isSubmitting} />
          <FormFeedback type={"error"} text={submitError ?? ""} condition={!isSubmitting && !!submitError} />
        </div>
      </div>
    </section>
  );
};

export default Login;
