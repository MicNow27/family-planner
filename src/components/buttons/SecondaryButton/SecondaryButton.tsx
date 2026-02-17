import "./SecondaryButton.scss";
import type { ButtonProps } from "@/components/buttons/Button.types.ts";

const SecondaryButton = ({
  text,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => (
  <button
    className={`secondary-button ${disabled && "secondary-button--disabled"}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default SecondaryButton;
