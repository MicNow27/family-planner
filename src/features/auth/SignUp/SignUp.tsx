import "./SignUp.scss";
import FormField from "@/components/forms/FormField/FormField.tsx";
import FormWrapper from "@/components/forms/FormWrapper/FormWrapper.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type SignUpFormData,
  signUpSchema,
} from "@/schemas/auth/signUp.schema.ts";
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
  SIGN_UP_ERROR_GENERAL,
} from "@copy/signUp.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    register,
    trigger,
    formState: { errors, dirtyFields },
  } = form;

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: () => setSubmitError(null),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitError(null);

    const { error } = await signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.toLowerCase().includes("rate limit")) {
        navigate("/check-email", { state: { email: data.email } });
      } else {
        setSubmitError(SIGN_UP_ERROR_GENERAL);
      }
    } else {
      navigate("/check-email", { state: { email: data.email } });
    }
  };

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      submitError={submitError}
      submitButtonText={SIGN_UP_BUTTON}
      submittingText={SIGN_UP_BUTTON_WAIT}
    >
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
        placeholder={PASSWORD_CREATE_PLACEHOLDER}
        register={register("password", liveValidate("password"))}
        error={errors.password?.message}
      />

      <FormField
        id="confirmPassword"
        label={PASSWORD_CONFIRM_LABEL}
        type="password"
        placeholder={PASSWORD_CONFIRM_PLACEHOLDER}
        register={register("confirmPassword", liveValidate("confirmPassword"))}
        error={errors.confirmPassword?.message}
      />
    </FormWrapper>
  );
};

export default SignUp;
