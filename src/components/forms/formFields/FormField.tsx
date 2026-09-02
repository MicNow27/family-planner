import type { FormFieldProps } from "@/components/forms/formFields/types.ts";

const FormField = ({ id, label, type, placeholder, register, error, disabled }: FormFieldProps) => (
  <div className={`flex w-full flex-col gap-1 ${disabled && "opacity-50"}`}>
    <label className="text-secondary-text ml-2 text-base font-medium" htmlFor={id}>
      {label}
    </label>
    <input
      className={`h-button-h rounded-button bg-interactive-surface text-secondary-text placeholder:text-disabled-text focus-visible:border-primary focus-visible:ring-primary-focus border-divider border px-3 text-base transition-all outline-none focus-visible:ring-4 disabled:cursor-not-allowed ${error && "border-error! focus-visible:ring-error-focus!"}`}
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      {...register}
    />
    <div className="h-4">{error && <p className="text-error ml-2 text-xs">{error}</p>}</div>
  </div>
);

export default FormField;
