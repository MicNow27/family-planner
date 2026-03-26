import StartUpHeader from "@/features/navigation/StartUpHeader.tsx";
import { Outlet } from "react-router";

const StartingUp = () => (
  <>
    <StartUpHeader />
    <main className="h-full w-full p-6 md:px-24">
      <Outlet />
    </main>
  </>
);

export default StartingUp;
