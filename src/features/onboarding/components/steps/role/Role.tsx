import FormFeedback from "@/components/forms/FormFeedback.tsx";
import SelectFormField from "@/components/forms/formFields/SelectFormField.tsx";
import OnboardingFormWrapper from "@/components/forms/OnboardingFormWrapper.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import { roleOptions } from "@/features/onboarding/components/steps/role/roleOptions.ts";
import { updateRole } from "@/features/onboarding/data/updateRole.ts";
import {
  type RoleFormData,
  roleSchema,
} from "@/features/onboarding/schemas/roleSchema.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useLiveValidation } from "@/hooks/useLiveValidation/useLiveValidation.ts";
import { SUBMIT_BUTTON_WAIT } from "@copy/general.ts";
import { NEXT } from "@copy/navigation.ts";
import {
  ROLE_LABEL,
  ROLE_PROMPT,
  ROLE_SUBMIT_ERROR,
} from "@copy/onboarding/role.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";

const Role = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();

  const role = useOnboardingStore((state) => state.role);
  const setRole = useOnboardingStore((state) => state.setRole);
  const setCarouselStep = useOnboardingStore((state) => state.setCarouselStep);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    values: { role: role ?? "home-manager" },
  });

  const {
    register,
    trigger,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = form;

  const liveValidate = useLiveValidation({
    trigger,
    dirtyFields,
    clearSubmitError: () => setSubmitError(null),
  });

  const onSubmit = async (data: RoleFormData) => {
    setSubmitError(null);

    if (data.role !== role) {
      try {
        await updateRole(user!.id, data.role);
        setRole(data.role);
      } catch {
        setSubmitError(ROLE_SUBMIT_ERROR);
        return;
      }
    }

    // TODO: bring up pop-up: happy, route to my family, unhappy, just close
  };

  return (
    <section className="center-content">
      <h1 className="text-primary-text mb-6 font-medium">{ROLE_PROMPT}</h1>

      <div className="form-card">
        <OnboardingFormWrapper
          form={form}
          onSubmit={onSubmit}
          submitButtonText={NEXT}
          onBack={() => setCarouselStep(3)}
        >
          <SelectFormField
            id="role"
            label={ROLE_LABEL}
            register={register("role", liveValidate("role"))}
            error={errors.role?.message}
            disabled={isSubmitting}
            options={roleOptions}
            placeholder={"Select a role..."}
            value={watch("role")}
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

export default Role;
