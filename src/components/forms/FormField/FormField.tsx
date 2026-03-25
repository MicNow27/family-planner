import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
};

const FormField = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: FormFieldProps) => (
  <div className="flex flex-col gap-1">
    <label
      className="text-secondary-text ml-2 text-base font-medium"
      htmlFor={id}
    >
      {label}
    </label>

    <input
      className={`h-button-h w-input-w rounded-button bg-interactive-surface text-secondary-text placeholder:text-disabled-text focus-visible:border-primary focus-visible:ring-primary-focus border-divider border px-3 text-base transition-all outline-none focus-visible:ring-4 ${error && "border-error! focus-visible:ring-error-focus!"}`}
      id={id}
      type={type}
      placeholder={placeholder}
      {...register}
    />

    <div className="h-4">
      {error && <p className="text-error ml-2 text-xs">{error}</p>}
    </div>
  </div>
);

export default FormField;
