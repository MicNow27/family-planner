import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/formFields/FormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { updateFullName } from "@/features/onboarding/data/updateFullName.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import {
  type FullNameFormData,
  fullNameSchema,
} from "@/schemas/onboarding/fullNameSchema.ts";
import { SUBMIT_BUTTON_WAIT } from "@copy/general.ts";
import { NEXT } from "@copy/navigation.ts";
import {
  FULL_NAME_LABEL,
  FULL_NAME_PLACEHOLDER,
  FULL_NAME_PROMPT,
  FULL_NAME_SUBMIT_ERROR,
} from "@copy/onboarding/fullName.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FullName = () => {
  const { user } = useAuth();

  const fullName = useOnboardingStore((state) => state.fullName);
  const setFullName = useOnboardingStore((state) => state.setFullName);
  const setOnboardingStep = useOnboardingStore((state) => state.setOnboardingStep);
  const setCarouselStep = useOnboardingStore((state) => state.setCarouselStep);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FullNameFormData>({
    resolver: zodResolver(fullNameSchema),
    values: { fullName: fullName ?? "" },
  });

  const {
    register,
    trigger,
    formState: { errors, dirtyFields, isSubmitting },
  } = form;

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: () => setSubmitError(null),
  });

  const onSubmit = async (data: FullNameFormData) => {
    setSubmitError(null);

    if (data.fullName !== fullName) {
      try {
        await updateFullName(user!.id, data.fullName);
        setFullName(data.fullName);
        setOnboardingStep(2);
      } catch {
        setSubmitError(FULL_NAME_SUBMIT_ERROR);
        return;
      }
    }

    setCarouselStep(2);
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{FULL_NAME_PROMPT}</h1>
      <div className="form-card">
        <OnboardingFormWrapper
          form={form}
          onSubmit={onSubmit}
          submitButtonText={NEXT}
          onBack={() => setCarouselStep(0)}
        >
          <FormField
            id="fullName"
            label={FULL_NAME_LABEL}
            type="text"
            placeholder={FULL_NAME_PLACEHOLDER}
            register={register("fullName", liveValidate("fullName"))}
            error={errors.fullName?.message}
            disabled={isSubmitting}
          />
        </OnboardingFormWrapper>

        <div className="relative flex h-6 items-center pt-2">
          <FormFeedback text={SUBMIT_BUTTON_WAIT} condition={isSubmitting} />
          <FormFeedback
            type={"error"}
            text={submitError ?? ""}
            condition={!isSubmitting && !!submitError}
          />
        </div>
      </div>
    </section>
  );
};

export default FullName;
