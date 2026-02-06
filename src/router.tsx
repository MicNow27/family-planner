import SignUp from "@/features/auth/SignUp/SignUp.tsx";
import Dashboard from "@/features/Dashboard/Dashboard.tsx";
import SettingsLanding from "@/features/settings/SettingsLanding/SettingsLanding.tsx";
import App from "@/layouts/App/App.tsx";
import PublicLanding from "@/layouts/PublicLanding/PublicLanding.tsx";
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Login/Login";

const routes = [
  {
    path: "/",
    element: <PublicLanding />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/settings",
        element: <SettingsLanding />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
