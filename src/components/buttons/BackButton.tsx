import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onClick: () => void;
};

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    className="hover:bg-primary-disabled focus:shadow-button flex h-11 w-11 items-center justify-center rounded-full transition-all"
    onClick={onClick}
  >
    <ArrowLeft />
  </button>
);

export default BackButton;
