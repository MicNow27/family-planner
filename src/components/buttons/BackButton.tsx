import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onClick: () => void;
  className?: string;
};

const BackButton = ({ onClick, className }: BackButtonProps) => (
  <button
    className={`hover:bg-primary-disabled focus:ring-primary-focus flex h-11 w-11 items-center justify-center rounded-full transition-all outline-none focus:ring-4 ${className}`}
    onClick={onClick}
  >
    <ArrowLeft />
  </button>
);

export default BackButton;
