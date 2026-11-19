import type { Props } from "@/components/buttons/props.ts";

const PrimaryButton = ({ text, onClick, disabled = false, type = "button" }: Props) => (
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
