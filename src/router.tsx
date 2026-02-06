import SignUp from "@/features/auth/SignUp/SignUp.tsx";
import Dashboard from "@/features/Dashboard/Dashboard.tsx";
import SettingsLanding from "@/features/settings/SettingsLanding/SettingsLanding.tsx";
import App from "@/layouts/App/App.tsx";
import PublicLanding from "@/layouts/PublicLanding/PublicLanding.tsx";
import type { Route } from "@/types/route.ts";
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Login/Login";

const routes: Route[] = [
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
        handle: {
          header: {
            title: "Create Account",
            showBackButton: true,
          },
        },
      },
      {
        path: "/login",
        element: <Login />,
        handle: {
          header: {
            title: "Login",
            showBackButton: true,
          },
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        handle: {
          header: {
            title: "Dashboard",
            showBackButton: false,
            overflowMenu: "dashboard",
          },
        },
      },
      {
        path: "/settings",
        element: <SettingsLanding />,
        handle: {
          header: {
            title: "Settings",
            showBackButton: true,
            backButtonRoute: "/dashboard",
            overflowMenu: "settings",
          },
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
