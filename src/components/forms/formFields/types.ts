import type { UseFormRegisterReturn } from "react-hook-form";

export type FormFieldProps = {
  id: string;
  label: string;
  type: "email" | "text";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
  disabled?: boolean;
};

export type PasswordFormFieldProps = Omit<FormFieldProps, "type"> & {
  value?: string;
};
