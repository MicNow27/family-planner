import "./SecondaryButton.scss";
import type { ButtonProps } from "@/components/buttons/Button.types.ts";

const SecondaryButton = ({ text, onClick, disabled = false }: ButtonProps) => (
  <button
    className={`secondary-button secondary-button--${disabled}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default SecondaryButton;
