import Header from "@/features/navigation/Header.tsx";
import { Outlet } from "react-router";

const App = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default App;
