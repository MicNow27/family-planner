import type { HeaderSettings } from "@/types/header.ts";
import type { Handle } from "@/types/route.ts";
import * as React from "react";
import { type UIMatch, useMatches, useNavigate } from "react-router";

const DEFAULT_SETTINGS: HeaderSettings = {
  title: "Family Planner",
};

const overflowMenus: Record<string, React.ReactNode> = {
  settings: <p>SETTINGS MENU</p>,
  dashboard: <p>DASHBOARD MENU</p>,
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

  return (
    <header className="header">
      <div className="header-left">
        {showBackButton && (
          <button
            onClick={() =>
              backButtonRoute ? navigate(backButtonRoute) : navigate(-1)
            }
            className="back-button"
          >
            Back
          </button>
        )}
      </div>
      <div className="header-center">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        {overflowMenu && overflowMenus[overflowMenu]}
      </div>
    </header>
  );
};

export default Header;
