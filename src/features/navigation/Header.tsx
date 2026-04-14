import type { HeaderSettings } from "@/types/header.ts";
import type { Handle } from "@/types/route.ts";
import { APP_NAME } from "@copy/general.ts";
import { type UIMatch, useMatches, useNavigate } from "react-router";

const DEFAULT_SETTINGS: HeaderSettings = {
  title: APP_NAME,
};

const Header = () => {
  const matches = useMatches() as UIMatch<unknown, Handle>[];
  const navigate = useNavigate();

  const lastMatchWithHeader = [...matches]
    .reverse()
    .find((m) => m.handle?.header);

  const {
    showBackButton,
    backButtonRoute,
    title,
    overflowMenu,
  }: HeaderSettings = lastMatchWithHeader?.handle.header || DEFAULT_SETTINGS;

  const handleClick = () =>
    backButtonRoute ? navigate(backButtonRoute) : navigate(-1);

  return (
    <header>
      {showBackButton && <button onClick={handleClick}>Back</button>}
      <div>
        {/*<img src={logo} alt="logo" />*/}
        <p className="text-primary-text">{title}</p>
      </div>
      {overflowMenu && <div>TODO: specific menus</div>}
    </header>
  );
};

export default Header;
