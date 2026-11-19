import PrimaryButton from "@/components/buttons/PrimaryButton.tsx";
import SecondaryButton from "@/components/buttons/SecondaryButton.tsx";
import type { OnboardingFormWrapperProps } from "@/components/forms/formWrappers/props.ts";
import { BACK } from "@copy/general.ts";
import type { FieldValues } from "react-hook-form";

const OnboardingFormWrapper = <T extends FieldValues>({
  form,
  onSubmit,
  onBack,
  submitButtonText,
  disableSubmit,
  children,
}: OnboardingFormWrapperProps<T>) => {
  const { handleSubmit, formState } = form;
  const { isSubmitting, isValid } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">{children}</div>

      <div className="flex flex-col gap-3">
        <PrimaryButton type="submit" text={submitButtonText} disabled={isSubmitting || !isValid || disableSubmit} />
        {onBack && <SecondaryButton text={BACK} onClick={onBack} />}
      </div>
    </form>
  );
};

export default OnboardingFormWrapper;
