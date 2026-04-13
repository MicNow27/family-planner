import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/FormField/FormField.tsx";
import Form from "@/components/forms/FormWrapper/Form.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import {
  formatTime,
  ONE_HOUR,
  ONE_MINUTE,
} from "@/hooks/useCooldown/timeLogic.ts";
import { useCooldown } from "@/hooks/useCooldown/useCooldown.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation.ts";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schemas/auth/forgotPassword.schema.ts";
import {
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  RESEND_EMAIL_BUTTON_WAIT,
} from "@copy/email.ts";
import { FORGOT_PASSWORD, RESET_PASSWORD_WAIT } from "@copy/forgotPassword.ts";
import { SUBMIT } from "@copy/general.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register,
    trigger,
    getValues,
    formState: { dirtyFields, errors, isSubmitting },
  } = form;

  const { cooldown, run, submitError, clearError } = useCooldown({
    action: () => resetPassword(getValues("email")),
    storageKey: "forgotPasswordCooldown",
    cooldownSequence: [0, ONE_MINUTE, ONE_HOUR],
  });

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: clearError,
  });

  const onSubmit = async () => await run();

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{FORGOT_PASSWORD}</h1>
      <div className="form-card">
        <Form
          form={form}
          onSubmit={onSubmit}
          submitButtonText={SUBMIT}
          disableSubmit={cooldown > 0}
        >
          <FormField
            id="email"
            label={EMAIL_LABEL}
            type="email"
            placeholder={EMAIL_PLACEHOLDER}
            register={register("email", liveValidate("email"))}
            error={errors.email?.message}
            disabled={isSubmitting}
          />
        </Form>

        <div className="relative flex h-6 items-center pt-2">
          <FormFeedback text={RESET_PASSWORD_WAIT} condition={isSubmitting} />
          <FormFeedback
            type={"error"}
            text={submitError ?? ""}
            condition={!isSubmitting && typeof submitError === "string"}
          />
          <FormFeedback
            text={RESEND_EMAIL_BUTTON_WAIT(formatTime(cooldown))}
            condition={cooldown > 0}
          />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
