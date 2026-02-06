import "./App.scss";
import Header from "@/components/Header/Header.tsx";
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
