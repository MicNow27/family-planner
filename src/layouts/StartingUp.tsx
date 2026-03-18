import { Outlet } from "react-router";

const StartingUp = () => (
  <>
    <header>Family Planner</header>
    <main>
      <Outlet />
    </main>
  </>
);

export default StartingUp;
