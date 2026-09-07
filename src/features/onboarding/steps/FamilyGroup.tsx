import FormField from "@/components/forms/formFields/FormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import type { OnboardingStepProps } from "@/features/onboarding/Onboarding.types.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import { type FamilyGroupFormData, familyGroupSchema } from "@/schemas/onboarding/familyGroup.schema.ts";
import { NEXT } from "@copy/navigation.ts";
import { FAMILY_GROUP_LABEL, FAMILY_GROUP_PLACEHOLDER } from "@copy/onboarding/familyGroup.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FamilyGroup = ({ heading }: OnboardingStepProps) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FamilyGroupFormData>({
    resolver: zodResolver(familyGroupSchema),
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

    // TODO: Implement form submission
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{heading}</h1>
      <div className="form-card">
        <OnboardingFormWrapper form={form} onSubmit={onSubmit} submitButtonText={NEXT}>
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
      </div>
    </section>
  );
};

export default FamilyGroup;
