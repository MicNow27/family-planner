import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  submitButtonText: string;
  disableSubmit?: boolean;
  children: ReactNode;
};

export type OnboardingFormWrapperProps<T extends FieldValues> = FormWrapperProps<T> & {
  onBack?: () => void;
};
