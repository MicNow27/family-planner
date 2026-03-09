import "./Login.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import FormField from "@/components/forms/FormField/FormField.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type LoginFormData,
  loginSchema,
} from "@/schemas/auth/login.schema.ts";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER } from "@copy/email.ts";
import { FORGOT_PASSWORD } from "@copy/forgotPassword.ts";
import { LOGIN_BUTTON, LOGIN_BUTTON_WAIT, LOGIN_ERROR } from "@copy/login.ts";
import { PASSWORD_ENTER_PLACEHOLDER, PASSWORD_LABEL } from "@copy/password.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="email"
        label={EMAIL_LABEL}
        type="email"
        placeholder={EMAIL_PLACEHOLDER}
        register={register("email", liveValidate("email"))}
        error={errors.email?.message}
      />

      <FormField
        id="password"
        label={PASSWORD_LABEL}
        type="password"
        placeholder={PASSWORD_ENTER_PLACEHOLDER}
        register={register("password", liveValidate("password"))}
        error={errors.password?.message}
      />

      {isSubmitting && <p>{LOGIN_BUTTON_WAIT}</p>}
      {!isSubmitting && submitError && <p>{submitError}</p>}

      <Link to="/forgot-password">{FORGOT_PASSWORD}</Link>

      <PrimaryButton
        type="submit"
        text={LOGIN_BUTTON}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default Login;
