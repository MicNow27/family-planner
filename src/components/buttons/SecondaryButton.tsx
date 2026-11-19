import type { Props } from "@/components/buttons/props.ts";

const SecondaryButton = ({ text, onClick, disabled = false, type = "button" }: Props) => (
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
