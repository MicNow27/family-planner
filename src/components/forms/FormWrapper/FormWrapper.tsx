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
  feedbackText?: string;
}

const FormWrapper = <T extends FieldValues>({
  form,
  onSubmit,
  submittingText,
  submitError,
  submitButtonText,
  disableSubmit,
  children,
  feedbackText,
}: FormWrapperProps<T>) => {
  const { handleSubmit, formState } = form;
  const { isSubmitting, isValid } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-divider rounded-button bg-primary-surface max-w-form-w mx-auto flex flex-col items-center gap-4 border p-6"
    >
      {children}

      <div className="h-5">
        <p
          className={`text-tertiary-text text-sm transition-opacity ${
            isSubmitting ? "opacity-100" : "hidden opacity-0"
          }`}
        >
          {submittingText}
        </p>
        <p
          className={`text-error text-sm transition-opacity ${
            !isSubmitting && submitError ? "opacity-100" : "hidden opacity-0"
          }`}
        >
          {submitError}
        </p>
        <p
          className={`text-tertiary-text text-sm transition-opacity ${
            feedbackText ? "opacity-100" : "hidden opacity-0"
          }`}
        >
          {feedbackText}
        </p>
      </div>

      <PrimaryButton
        type="submit"
        text={submitButtonText}
        disabled={isSubmitting || !isValid || disableSubmit}
      />
    </form>
  );
};

export default FormWrapper;
