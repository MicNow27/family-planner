import type { SelectFormFieldProps } from "@/components/forms/formFields/types.ts";
import { ChevronDown } from "lucide-react";

const SelectFormField = ({
  id,
  label,
  placeholder,
  options,
  register,
  error,
  disabled,
  value,
}: SelectFormFieldProps) => {
  const isPlaceholder = !value;

  return (
    <div className={`flex w-full flex-col gap-1 ${disabled && "opacity-50"}`}>
      <label className="text-secondary-text ml-2 text-base font-medium" htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        <select
          className={`h-button-h rounded-button bg-interactive-surface focus-visible:border-primary focus-visible:ring-primary-focus border-divider w-full appearance-none border px-3 text-base transition-all outline-none focus-visible:ring-4 disabled:cursor-not-allowed ${isPlaceholder ? "text-disabled-text" : "text-secondary-text"} ${error && "border-error! focus-visible:ring-error-focus!"}`}
          id={id}
          disabled={disabled}
          {...register}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="text-secondary-text absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
      </div>

      <div className="h-4">
        {error && <p className="text-error ml-2 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default SelectFormField;
