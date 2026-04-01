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

const Form = <T extends FieldValues>({
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">{children}</div>

        <PrimaryButton
          type="submit"
          text={submitButtonText}
          disabled={isSubmitting || !isValid || disableSubmit}
        />
      </form>

      {/* TODO: make this better */}
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
      </div>
    </>
  );
};

export default Form;
