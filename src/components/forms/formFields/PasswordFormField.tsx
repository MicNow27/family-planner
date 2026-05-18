import type { PasswordFormFieldProps } from "@/components/forms/formFields/types.ts";
import { useState } from "react";

const PasswordFormField = ({
  id,
  label,
  placeholder,
  register,
  error,
  disabled,
  value,
}: PasswordFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasValue = !!value;

  return (
    <div className={`flex w-full flex-col gap-1 ${disabled && "opacity-50"}`}>
      <label
        className="text-secondary-text ml-2 text-base font-medium"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`h-button-h rounded-button bg-interactive-surface text-secondary-text placeholder:text-disabled-text focus-visible:border-primary focus-visible:ring-primary-focus border-divider w-full border px-3 text-base transition-all outline-none focus-visible:ring-4 disabled:cursor-not-allowed ${error && "border-error! focus-visible:ring-error-focus!"}`}
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          {...register}
        />
        {hasValue && (
          <button
            aria-label="Show/hide"
            type="button"
            className="text-secondary-text hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-sm font-medium disabled:cursor-not-allowed"
            onClick={() => setShowPassword((current) => !current)}
            disabled={disabled}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      <div className="h-4">
        {error && <p className="text-error ml-2 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordFormField;
