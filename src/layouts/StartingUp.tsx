import StartUpHeader from "@/features/navigation/components/StartUpHeader.tsx";
import { Outlet } from "react-router";

const StartingUp = () => (
  <>
    <StartUpHeader />
    <main className="h-full w-full p-6">
      <Outlet />
    </main>
  </>
);

export default StartingUp;
