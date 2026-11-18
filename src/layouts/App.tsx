import Header from "@/features/navigation/Header.tsx";
import NavBar from "@/features/navigation/NavBar.tsx";
import { Outlet } from "react-router";

const App = () => (
  <>
    <Header />
    <main className="h-full w-full p-6">
      <Outlet />
    </main>
    <NavBar />
  </>
);

export default App;
