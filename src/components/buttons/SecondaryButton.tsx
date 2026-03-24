import type { ButtonProps } from "@/components/buttons/Button.types.ts";

const SecondaryButton = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => (
  <button
    className="btn-default border-divider bg-interactive-surface text-primary-text hover:bg-interactive-surface-hover disabled:bg-primary-surface border"
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default SecondaryButton;
