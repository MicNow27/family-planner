import type { ImageFormFieldProps } from "@/components/forms/formFields/types.ts";
import avatarPlaceholder from "@assets/images/avatarPlaceholder.svg";
import { Upload } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

const ImageFormField = ({
  id,
  label,
  register,
  error,
  disabled,
  previewUrl,
}: ImageFormFieldProps) => {
  const [fileName, setFileName] = useState("");
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const { onChange, ...registerProps } = register;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? "");

    if (file) setLocalPreview(URL.createObjectURL(file));
    else setLocalPreview(null);

    void onChange(event);
  };

  // Clean up object URL when it changes or the component unmounts
  useEffect(
    () => () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    },
    [localPreview],
  );

  return (
    <div className={`flex w-full flex-col ${disabled && "opacity-50"}`}>
      <div className="mb-4 flex justify-center">
        <img
          src={localPreview || previewUrl || avatarPlaceholder}
          alt="Profile preview"
          className="border-primary h-32 w-32 rounded-full border-2 object-cover"
        />
      </div>

      <input
        id={id}
        type="file"
        accept="image/*"
        disabled={disabled}
        {...registerProps}
        onChange={handleChange}
        className="hidden"
      />

      <label
        htmlFor={disabled ? undefined : id}
        className={`rounded-button bg-interactive-surface text-secondary-text border-divider mb-4 flex flex-col items-center justify-center gap-2 border py-3 text-base transition-all ${
          disabled
            ? "cursor-not-allowed"
            : "hover:border-primary hover:ring-primary-focus cursor-pointer hover:ring-4"
        } ${error && "border-error! hover:ring-error-focus!"}`}
      >
        <Upload />
        {label}
      </label>

      <div
        className={`h-button-h bg-interactive-surface text-secondary-text border-divider rounded-button mb-1 flex items-center border px-3 text-base ${
          error && "border-error!"
        }`}
      >
        <span className={`truncate ${!fileName && "text-disabled-text"}`}>
          {fileName || "No file chosen"}
        </span>
      </div>

      <div className="h-4">
        {error && <p className="text-error ml-2 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default ImageFormField;
