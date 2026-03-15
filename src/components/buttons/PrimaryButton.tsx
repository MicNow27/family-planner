import type { ButtonProps } from "@/components/buttons/Button.types.ts";

const PrimaryButton = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => (
  <button
    className="btn-default bg-primary text-primary-surface hover:bg-primary-hover disabled:bg-primary-disabled border-none"
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default PrimaryButton;
