import "./PublicLanding.scss";
import { Outlet } from "react-router";

const PublicLanding = () => {
  return (
    <main>
      Public Landing
      <Outlet />
    </main>
  );
};

export default PublicLanding;
