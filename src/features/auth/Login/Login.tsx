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
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? "form-input--error" : ""}`}
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
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`form-input ${errors.password ? "form-input--error" : ""}`}
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
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        {loginError && <p className="form-error">{loginError}</p>}

        <PrimaryButton
          type="submit"
          text={isSubmitting ? "Logging in..." : "Login"}
          disabled={isSubmitting || !isValid}
        />
      </form>
    </div>
  );
};

export default Login;
