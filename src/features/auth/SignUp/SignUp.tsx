import "./SignUp.scss";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton.tsx";
import {
  type SignUpFormData,
  signUpSchema,
} from "@/components/forms/authForm/schemas/signUp.schema.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER } from "@copy/email.ts";
import {
  PASSWORD_CONFIRM_LABEL,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_CREATE_PLACEHOLDER,
  PASSWORD_LABEL,
} from "@copy/password.ts";
import {
  SIGN_UP_BUTTON,
  SIGN_UP_BUTTON_WAIT,
  SIGN_UP_ERROR_EMAIL_IN_USE,
  SIGN_UP_ERROR_GENERAL,
} from "@copy/signUp.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const { signUp } = useAuth();
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

    const { error } = await signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (
        error.toLowerCase().includes("already") ||
        error.toLowerCase().includes("registered")
      ) {
        setSignUpError(SIGN_UP_ERROR_EMAIL_IN_USE);
      } else {
        setSignUpError(SIGN_UP_ERROR_GENERAL);
      }
    } else {
      navigate("/check-email", { state: { email: data.email } });
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
