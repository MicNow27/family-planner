import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import PrimaryButton from "../../buttons/PrimaryButton.tsx";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  submittingText: string;
  submitError?: string | null;
  submitButtonText: string;
  disableSubmit?: boolean;
  children: ReactNode;
}

const FormWrapper = <T extends FieldValues>({
  form,
  onSubmit,
  submittingText,
  submitError,
  submitButtonText,
  disableSubmit,
  children,
}: FormWrapperProps<T>) => {
  const { handleSubmit, formState } = form;
  const { isSubmitting, isValid } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}

      {isSubmitting && <p>{submittingText}</p>}
      {!isSubmitting && submitError && <p>{submitError}</p>}

      <PrimaryButton
        type="submit"
        text={submitButtonText}
        disabled={isSubmitting || !isValid || disableSubmit}
      />
    </form>
  );
};

export default FormWrapper;
