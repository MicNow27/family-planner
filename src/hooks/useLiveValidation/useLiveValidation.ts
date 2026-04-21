import { useState } from "react";
import type { FieldValues, Path, UseFormTrigger } from "react-hook-form";

type UseLiveValidationOptions<T extends FieldValues> = {
  trigger: UseFormTrigger<T>;
  dirtyFields: Partial<Record<Path<T>, boolean>>;
  clearSubmitError: () => void;
};

type UseLiveValidationReturn<T extends FieldValues> = (name: Path<T>) => {
  onBlur: () => void;
  onChange: () => void;
};

export const useLiveValidation = <T extends FieldValues>({
  trigger,
  dirtyFields,
  clearSubmitError,
}: UseLiveValidationOptions<T>): UseLiveValidationReturn<T> => {
  const [liveValidate, setLiveValidate] = useState<
    Partial<Record<Path<T>, boolean>>
  >({});

  const handlers: UseLiveValidationReturn<T> = (name: Path<T>) => ({
    onBlur: () => {
      if (!dirtyFields[name]) return;
      void trigger(name);
      setLiveValidate((prev) => ({ ...prev, [name]: true }));
    },
    onChange: () => {
      if (!dirtyFields[name] || !liveValidate[name]) return;
      clearSubmitError();
      void trigger(name);
    },
  });

  return handlers;
};
