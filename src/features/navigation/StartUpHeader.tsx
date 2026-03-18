import type { Handle } from "@/types/route.ts";
import { type UIMatch, useMatches, useNavigate } from "react-router";

const StartUpHeader = () => {
  const matches = useMatches() as UIMatch<unknown, Handle>[];
  const navigate = useNavigate();

  const lastMatchWithHeader = [...matches]
    .reverse()
    .find((m) => m.handle?.header);

  const showBackButton = lastMatchWithHeader?.handle.header.showBackButton;

  return (
    <header className="header">
      <div className="header-left">
        {showBackButton && (
          <button onClick={() => navigate(-1)} className="back-button">
            Back
          </button>
        )}
      </div>
      <div className="header-center">
        <h1>Family Planner</h1>
      </div>
    </header>
  );
};

export default StartUpHeader;
