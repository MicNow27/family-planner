import type { HeaderSettings } from "@/types/header.ts";
import type { Handle } from "@/types/route.ts";
import * as React from "react";
import { type UIMatch, useMatches, useNavigate } from "react-router";
import "./Header.css";

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

  const settings: HeaderSettings =
    matches.reverse().find((m) => m.handle?.header)?.handle.header ||
    DEFAULT_SETTINGS;

  return (
    <header className="header">
      <div className="header-left">
        {settings.showBackButton && (
          <button
            onClick={() =>
              settings.backButtonRoute
                ? navigate(settings.backButtonRoute)
                : navigate(-1)
            }
            className="back-button"
          >
            Back
          </button>
        )}
      </div>
      <div className="header-center">
        <h1>{settings.title}</h1>
      </div>
      <div className="header-right">
        {settings.overflowMenu && overflowMenus[settings.overflowMenu]}
      </div>
    </header>
  );
};

export default Header;
