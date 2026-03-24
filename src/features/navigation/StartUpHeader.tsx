import BackButton from "@/components/buttons/BackButton.tsx";
import type { Handle } from "@/types/route.ts";
import logo from "@assets/images/logo.svg";
import { APP_NAME } from "@copy/general.ts";
import { type UIMatch, useMatches, useNavigate } from "react-router";

const StartUpHeader = () => {
  const matches = useMatches() as UIMatch<unknown, Handle>[];
  const navigate = useNavigate();

  const lastMatchWithHeader = [...matches]
    .reverse()
    .find((m) => m.handle?.header);

  const showBackButton = lastMatchWithHeader?.handle.header.showBackButton;

  const handleClick = () => navigate(-1);

  return (
    <header className="bg-primary-surface border-b-divider grid h-20 grid-cols-[2rem_1fr_2rem] items-center border-b px-6">
      {showBackButton && <BackButton onClick={handleClick} />}
      <div className="flex items-center justify-center gap-4">
        <img src={logo} alt="logo" className="h-12 md:h-15" />
        <p className="text-primary-text text-xl md:text-3xl">{APP_NAME}</p>
      </div>
      <div />
    </header>
  );
};

export default StartUpHeader;
