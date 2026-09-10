import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/formFields/FormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import { createFamilyGroup } from "@/features/onboarding/data/familyGroup/createFamilyGroup.ts";
import { updateFamilyGroupName } from "@/features/onboarding/data/familyGroup/updateFamilyGroup.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import {
  type FamilyGroupFormData,
  familyGroupSchema,
} from "@/schemas/onboarding/familyGroupSchema.ts";
import { SUBMIT_BUTTON_WAIT } from "@copy/general.ts";
import { NEXT } from "@copy/navigation.ts";
import {
  FAMILY_GROUP_LABEL,
  FAMILY_GROUP_PLACEHOLDER,
  FAMILY_GROUP_PROMPT,
  FAMILY_GROUP_SUBMIT_ERROR,
} from "@copy/onboarding/familyGroup.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FamilyGroup = () => {
  const familyGroupId = useOnboardingStore((state) => state.familyGroupId);
  const setFamilyGroupId = useOnboardingStore((state) => state.setFamilyGroupId);
  const familyGroupName = useOnboardingStore((state) => state.familyGroupName);
  const setFamilyGroupName = useOnboardingStore((state) => state.setFamilyGroupName);
  const setOnboardingStep = useOnboardingStore((state) => state.setOnboardingStep);
  const setCarouselStep = useOnboardingStore((state) => state.setCarouselStep);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FamilyGroupFormData>({
    resolver: zodResolver(familyGroupSchema),
    values: { familyGroupName: familyGroupName ?? "" },
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

  const onSubmit = async (data: FamilyGroupFormData) => {
    setSubmitError(null);

    if (data.familyGroupName !== familyGroupName) {
      try {
        if (familyGroupId)
          await updateFamilyGroupName(familyGroupId, data.familyGroupName);
        else {
          const newGroupId = await createFamilyGroup(data.familyGroupName);
          setFamilyGroupId(newGroupId);
        }

        setFamilyGroupName(data.familyGroupName);
        setOnboardingStep(1);
      } catch {
        setSubmitError(FAMILY_GROUP_SUBMIT_ERROR);
        return;
      }
    }

    setCarouselStep(1);
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{FAMILY_GROUP_PROMPT}</h1>
      <div className="form-card">
        <OnboardingFormWrapper
          form={form}
          onSubmit={onSubmit}
          submitButtonText={NEXT}
        >
          <FormField
            id="familyGroupName"
            label={FAMILY_GROUP_LABEL}
            type="text"
            placeholder={FAMILY_GROUP_PLACEHOLDER}
            register={register("familyGroupName", liveValidate("familyGroupName"))}
            error={errors.familyGroupName?.message}
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

export default FamilyGroup;
