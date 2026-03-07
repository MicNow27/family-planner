import "./Login.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
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

  const [liveValidate, setLiveValidate] = useState({
    email: false,
    password: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
          placeholder={PASSWORD_ENTER_PLACEHOLDER}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {submitError && <p>{submitError}</p>}

      <Link to="/forgot-password">{FORGOT_PASSWORD}</Link>

      <PrimaryButton
        type="submit"
        text={isSubmitting ? LOGIN_BUTTON_WAIT : LOGIN_BUTTON}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default Login;
