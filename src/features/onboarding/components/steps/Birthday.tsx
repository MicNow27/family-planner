import FormFeedback from "@/components/forms/FormFeedback.tsx";
import DateFormField from "@/components/forms/formFields/DateFormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { updateBirthday } from "@/features/onboarding/data/updateBirthday.ts";
import {
  type BirthdayFormData,
  birthdaySchema,
} from "@/features/onboarding/schemas/birthdaySchema.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import { SUBMIT_BUTTON_WAIT } from "@copy/general.ts";
import { NEXT } from "@copy/navigation.ts";
import {
  BIRTHDAY_LABEL,
  BIRTHDAY_PROMPT,
  BIRTHDAY_SUBMIT_ERROR,
} from "@copy/onboarding/birthday.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Birthday = () => {
  const { user } = useAuth();

  const birthday = useOnboardingStore((state) => state.birthday);
  const setBirthday = useOnboardingStore((state) => state.setBirthday);
  const setOnboardingStep = useOnboardingStore((state) => state.setOnboardingStep);
  const setCarouselStep = useOnboardingStore((state) => state.setCarouselStep);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<BirthdayFormData>({
    resolver: zodResolver(birthdaySchema),
    values: { birthday: birthday ?? "" },
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

  const onSubmit = async (data: BirthdayFormData) => {
    setSubmitError(null);

    if (data.birthday !== birthday) {
      try {
        await updateBirthday(user!.id, data.birthday);
        setBirthday(data.birthday);
        setOnboardingStep(3);
      } catch {
        setSubmitError(BIRTHDAY_SUBMIT_ERROR);
        return;
      }
    }

    setCarouselStep(3);
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{BIRTHDAY_PROMPT}</h1>
      <div className="form-card">
        <OnboardingFormWrapper
          form={form}
          onSubmit={onSubmit}
          submitButtonText={NEXT}
          onBack={() => setCarouselStep(1)}
        >
          <DateFormField
            id="birthday"
            label={BIRTHDAY_LABEL}
            placeholder="YYYY-MM-DD"
            register={register("birthday", liveValidate("birthday"))}
            error={errors.birthday?.message}
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

export default Birthday;
