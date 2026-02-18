import "./Login.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type LoginFormData,
  loginSchema,
} from "@/components/forms/authForm/schemas/login.schema.ts";
import { supabaseClient } from "@/services/apiService.ts";
import {
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  LOGIN_BUTTON_WAIT,
  LOGIN_ERROR,
  PASSWORD_ENTER_PLACEHOLDER,
  PASSWORD_LABEL,
} from "@copy/auth.ts";
import { LOGIN_BUTTON } from "@copy/publicLanding.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [liveValidate, setLiveValidate] = useState({
    email: false,
    password: false,
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    setLoginError(null);

    const { data: user, error } = await supabaseClient.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    // something with sessionID / JWT?

    if (error || !user) setLoginError(LOGIN_ERROR);
    else navigate("/dashboard");
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
              void trigger("password");
            },
          })}
          placeholder={PASSWORD_ENTER_PLACEHOLDER}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {loginError && <p>{loginError}</p>}

      <PrimaryButton
        type="submit"
        text={isSubmitting ? LOGIN_BUTTON_WAIT : LOGIN_BUTTON}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default Login;
