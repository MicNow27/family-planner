import "./PrimaryButton.scss";
import type { ButtonProps } from "@/components/buttons/Button.types.ts";

const PrimaryButton = ({ text, onClick, disabled = false }: ButtonProps) => (
  <button
    className={`primary-button primary-button--${disabled}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default PrimaryButton;
