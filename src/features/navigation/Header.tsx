import BackButton from "@/components/buttons/BackButton.tsx";
import type { HeaderSettings } from "@/types/header.ts";
import type { Handle } from "@/types/route.ts";
import logo from "@assets/images/logo.svg";
import { APP_NAME } from "@copy/general.ts";
import { type UIMatch, useMatches, useNavigate } from "react-router";

const DEFAULT_SETTINGS: HeaderSettings = {
  title: APP_NAME,
};

const Header = () => {
  const matches = useMatches() as UIMatch<unknown, Handle>[];
  const navigate = useNavigate();

  const lastMatchWithHeader = [...matches].reverse().find((m) => m.handle?.header);

  const { showBackButton, backButtonRoute, title, overflowMenu }: HeaderSettings =
    lastMatchWithHeader?.handle.header || DEFAULT_SETTINGS;

  const handleClick = () => (backButtonRoute ? navigate(backButtonRoute) : navigate(-1));

  return (
    <header className="bg-primary-surface border-b-divider relative flex h-20 items-center justify-center border-b">
      {showBackButton && <BackButton onClick={handleClick} className="absolute left-4" />}
      <div className="flex items-center justify-center gap-4">
        <img src={logo} alt="logo" className="h-12 md:h-15" />
        <p className="text-primary-text text-xl md:text-3xl">{title}</p>
      </div>
      {overflowMenu && <div>TODO: specific menus</div>}
    </header>
  );
};

export default Header;
