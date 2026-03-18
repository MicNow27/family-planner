import StartUpHeader from "@/features/navigation/StartUpHeader.tsx";
import { Outlet } from "react-router";

const StartingUp = () => (
  <>
    <StartUpHeader />
    <main>
      <Outlet />
    </main>
  </>
);

export default StartingUp;
