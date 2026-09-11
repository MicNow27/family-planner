import type { DateFormFieldProps } from "@/components/forms/formFields/types.ts";
import { formatDate } from "@/utils/strings/date.ts";
import * as React from "react";

const DateFormField = ({
  id,
  label,
  placeholder,
  register,
  error,
  disabled,
}: DateFormFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = formatDate(event.target.value);
    void register.onChange(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace" && event.key !== "Delete") return;

    const input = event.currentTarget;
    const { selectionStart, selectionEnd, value } = input;

    if (selectionStart === null || selectionStart !== selectionEnd) return;

    const isBackspace = event.key === "Backspace";
    const dashIndex = isBackspace ? selectionStart - 1 : selectionStart;

    if (value[dashIndex] !== "-") return;

    event.preventDefault();

    const cutStart = isBackspace ? selectionStart - 2 : selectionStart;
    const newRaw = value.slice(0, cutStart) + value.slice(cutStart + 1);
    const newValue = formatDate(newRaw);

    input.value = newValue;

    const newCursor = isBackspace ? selectionStart - 2 : selectionStart;
    input.setSelectionRange(newCursor, newCursor);

    void register.onChange({
      target: {
        name: register.name,
        value: newValue,
      },
    });
  };

  return (
    <div className={`flex w-full flex-col gap-1 ${disabled && "opacity-50"}`}>
      <label className="text-secondary-text ml-2 text-base font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className={`h-button-h rounded-button bg-interactive-surface text-secondary-text placeholder:text-disabled-text focus-visible:border-primary focus-visible:ring-primary-focus border-divider border px-3 text-base transition-all outline-none focus-visible:ring-4 disabled:cursor-not-allowed ${error && "border-error! focus-visible:ring-error-focus!"}`}
        id={id}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        disabled={disabled}
        {...register}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="h-4">
        {error && <p className="text-error ml-2 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default DateFormField;
