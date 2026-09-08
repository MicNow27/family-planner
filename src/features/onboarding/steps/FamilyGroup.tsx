import FormFeedback from "@/components/forms/FormFeedback.tsx";
import FormField from "@/components/forms/formFields/FormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import { createFamilyGroup } from "@/features/onboarding/data/createFamilyGroup.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import {
  type FamilyGroupFormData,
  familyGroupSchema,
} from "@/schemas/onboarding/familyGroup.schema.ts";
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
  const familyGroupName = useOnboardingStore((state) => state.familyGroupName);
  const setFamilyGroupName = useOnboardingStore((state) => state.setFamilyGroupName);
  const setOnboardingStep = useOnboardingStore((state) => state.setOnboardingStep);

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

    try {
      await createFamilyGroup(data.familyGroupName);
      setFamilyGroupName(data.familyGroupName);
      setOnboardingStep(1);
    } catch {
      setSubmitError(FAMILY_GROUP_SUBMIT_ERROR);
    }
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
