import PrimaryButton from "@/components/buttons/PrimaryButton.tsx";
import SecondaryButton from "@/components/buttons/SecondaryButton.tsx";
import { BACK } from "@copy/navigation.ts";
import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface OnboardingFormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  onBack?: () => void;
  submitButtonText: string;
  disableSubmit?: boolean;
  children: ReactNode;
}

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
