import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/FormField/FormField.tsx";
import Form from "@/components/forms/FormWrapper/Form.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type LoginFormData,
  loginSchema,
} from "@/schemas/auth/login.schema.ts";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER } from "@copy/email.ts";
import { FORGOT_PASSWORD } from "@copy/forgotPassword.ts";
import { LOGIN, LOGIN_BUTTON_WAIT, LOGIN_ERROR } from "@copy/login.ts";
import { PASSWORD_ENTER_PLACEHOLDER, PASSWORD_LABEL } from "@copy/password.ts";
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

      if (lowerError.includes("email not confirmed"))
        navigate("/check-email", { state: { email: data.email } });
      else setSubmitError(LOGIN_ERROR);
    }
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{LOGIN}</h1>
      <div className="form-card">
        <Form form={form} onSubmit={onSubmit} submitButtonText={LOGIN}>
          <FormField
            id="email"
            label={EMAIL_LABEL}
            type="email"
            placeholder={EMAIL_PLACEHOLDER}
            register={register("email", liveValidate("email"))}
            error={errors.email?.message}
            disabled={isSubmitting}
          />

          <FormField
            id="password"
            label={PASSWORD_LABEL}
            type="password"
            placeholder={PASSWORD_ENTER_PLACEHOLDER}
            register={register("password", liveValidate("password"))}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
        </Form>

        <Link
          className="text-secondary-text block w-full pt-1 pr-2 text-right font-medium italic"
          to="/forgot-password"
        >
          {FORGOT_PASSWORD}
        </Link>

        <div className="relative flex h-6 items-center">
          <FormFeedback text={LOGIN_BUTTON_WAIT} condition={isSubmitting} />
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

export default Login;
