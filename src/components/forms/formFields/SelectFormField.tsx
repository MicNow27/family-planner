import type { SelectFormFieldProps } from "@/components/forms/formFields/types.ts";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
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
  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;

  const handleChange = (selectedValue: string) => {
    void register.onChange({
      target: {
        name: register.name,
        value: selectedValue,
      },
      type: "change",
    });
  };

  return (
    <div className={`flex w-full flex-col gap-1 ${disabled && "opacity-50"}`}>
      <Listbox value={value ?? ""} onChange={handleChange} disabled={disabled}>
        <Label className="text-secondary-text ml-2 text-base font-medium">
          {label}
        </Label>

        <div className="relative">
          <ListboxButton
            id={id}
            className={`hover:ring-primary-focus! h-button-h hover:border-primary! rounded-button bg-interactive-surface border-divider flex w-full cursor-pointer items-center justify-between border px-3 text-left text-base transition-all outline-none hover:ring-4 disabled:cursor-not-allowed ${
              isPlaceholder ? "text-disabled-text" : "text-secondary-text"
            } ${error && "border-error! hover:ring-error-focus!"}`}
          >
            <span>{selectedOption?.label ?? placeholder}</span>

            <ChevronDown className="text-secondary-text size-4" />
          </ListboxButton>
          {/* TODO: check each style from here down */}
          <ListboxOptions
            anchor="bottom"
            className="bg-interactive-surface border-divider rounded-button z-10 mt-1 w-(--button-width) border p-1 shadow-lg [--anchor-gap:4px]"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="text-secondary-text hover:bg-interactive-surface-hover flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-base transition-colors outline-none"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      <div className="h-4">
        {error && <p className="text-error ml-2 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default SelectFormField;
