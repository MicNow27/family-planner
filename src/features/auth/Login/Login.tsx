import "./Login.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type LoginFormData,
  loginSchema,
} from "@/components/forms/authForm/schemas/login.schema.ts";
import { supabaseClient } from "@/services/apiService.ts";
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

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);

    const { data: user, error } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error || !user) setLoginError("Email or password is incorrect");
    else navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
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
        placeholder="Enter your email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
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
        placeholder="Enter your password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      {loginError && <p>{loginError}</p>}

      <PrimaryButton
        type="submit"
        text={isSubmitting ? "Logging in..." : "Login"}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default Login;
