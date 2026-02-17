import "./Login.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type LoginFormData,
  loginSchema,
} from "@/components/forms/authForm/schemas/login.schema.ts";
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

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login data:", data);
      // Example: await loginUser(data.email, data.password);
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (show toast, etc.)
    }
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

        <PrimaryButton
          type="submit"
          text={isSubmitting ? "Logging in..." : "Login"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default Login;
