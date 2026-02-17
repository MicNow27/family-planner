import "./PrimaryButton.scss";
import type { ButtonProps } from "@/components/buttons/Button.types.ts";

const PrimaryButton = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => (
  <button
    className={`primary-button ${disabled && "primary-button--disabled"}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default PrimaryButton;
