import "./SignUp.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type SignUpFormData,
  signUpSchema,
} from "@/components/forms/authForm/schemas/signUp.schema.ts";
import { BASE_URL } from "@/config/dev.ts";
import { supabaseClient } from "@/services/apiService.ts";
import {
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  PASSWORD_CONFIRM_LABEL,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_CREATE_PLACEHOLDER,
  PASSWORD_LABEL,
  SIGN_UP_BUTTON_WAIT,
  SIGN_UP_ERROR_EMAIL_IN_USE,
  SIGN_UP_ERROR_GENERAL,
} from "@copy/auth.ts";
import { SIGN_UP_BUTTON } from "@copy/publicLanding.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  const [liveValidate, setLiveValidate] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [signUpError, setSignUpError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { dirtyFields, errors, isSubmitting, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setSignUpError(null);

    const { data: user, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${BASE_URL}/auth-callback`,
      },
    });

    if (error) {
      if (
        error.message.toLowerCase().includes("already") ||
        error.message.toLowerCase().includes("registered")
      )
        setSignUpError(SIGN_UP_ERROR_EMAIL_IN_USE);
      else setSignUpError(SIGN_UP_ERROR_GENERAL);
    } else if (!user) setSignUpError(SIGN_UP_ERROR_GENERAL);
    else navigate("/check-email");
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
          placeholder={PASSWORD_CREATE_PLACEHOLDER}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">{PASSWORD_CONFIRM_LABEL}</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            onBlur: () => {
              if (!dirtyFields.confirmPassword) return;
              void trigger("confirmPassword");
              setLiveValidate((prev) => ({ ...prev, confirmPassword: true }));
            },
            onChange: () => {
              if (!dirtyFields.confirmPassword || !liveValidate.confirmPassword)
                return;
              void trigger("confirmPassword");
            },
          })}
          placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      {signUpError && <p>{signUpError}</p>}

      <PrimaryButton
        type="submit"
        text={isSubmitting ? SIGN_UP_BUTTON_WAIT : SIGN_UP_BUTTON}
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default SignUp;
