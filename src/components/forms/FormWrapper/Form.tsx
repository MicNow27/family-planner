import FormFeedback from "@/components/forms/FormFeedback.tsx";
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

      {/* TODO: move this to components */}
      <div className="relative h-5">
        <FormFeedback text={submittingText} condition={isSubmitting} />
        <FormFeedback
          type={"error"}
          text={submitError ?? ""}
          condition={!isSubmitting && typeof submitError === "string"}
        />
      </div>
    </>
  );
};

export default Form;
