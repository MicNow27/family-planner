import FormFeedback from "@/components/forms/FormFeedback.tsx";
import ImageFormField from "@/components/forms/formFields/ImageFormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { uploadAvatar } from "@/features/onboarding/data/picture/uploadAvatar.ts";
import {
  type AvatarFormData,
  avatarSchema,
} from "@/features/onboarding/schemas/avatarSchema.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import { SUBMIT_BUTTON_WAIT } from "@copy/general.ts";
import { NEXT } from "@copy/navigation.ts";
import {
  AVATAR_LABEL,
  AVATAR_PROMPT,
  AVATAR_SUBMIT_ERROR,
} from "@copy/onboarding/avatar.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Avatar = () => {
  const { user } = useAuth();

  const avatarUrl = useOnboardingStore((state) => state.avatarUrl);
  const setAvatarUrl = useOnboardingStore((state) => state.setAvatarUrl);
  const setOnboardingStep = useOnboardingStore((state) => state.setOnboardingStep);
  const setCarouselStep = useOnboardingStore((state) => state.setCarouselStep);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<AvatarFormData>({
    resolver: zodResolver(avatarSchema(avatarUrl)),
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

  useEffect(() => {
    void trigger("avatarFile");
  }, [avatarUrl, trigger]);

  const onSubmit = async (data: AvatarFormData) => {
    setSubmitError(null);

    if (data.avatarFile.length > 0) {
      try {
        const newAvatarFile = data.avatarFile[0];
        const newAvatarUrl = await uploadAvatar(user!.id, newAvatarFile);
        setAvatarUrl(newAvatarUrl);
        setOnboardingStep(4);
      } catch {
        setSubmitError(AVATAR_SUBMIT_ERROR);
        return;
      }
    }

    setCarouselStep(4);
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{AVATAR_PROMPT}</h1>
      <div className="form-card">
        <OnboardingFormWrapper
          form={form}
          onSubmit={onSubmit}
          submitButtonText={NEXT}
          onBack={() => setCarouselStep(2)}
        >
          <ImageFormField
            id="avatarFile"
            label={AVATAR_LABEL}
            register={register("avatarFile", liveValidate("avatarFile"))}
            error={errors.avatarFile?.message}
            disabled={isSubmitting}
            previewUrl={avatarUrl}
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

export default Avatar;
