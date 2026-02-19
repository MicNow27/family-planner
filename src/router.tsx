import RequireAuth from "@/components/routes/RequireAuth.tsx";
import RequireGuest from "@/components/routes/RequireGuest.tsx";
import AuthCallback from "@/features/auth/AuthCallback/AuthCallback.tsx";
import CheckEmail from "@/features/auth/CheckEmail/CheckEmail.tsx";
import SignUp from "@/features/auth/SignUp/SignUp.tsx";
import Dashboard from "@/features/Dashboard/Dashboard.tsx";
import Onboarding from "@/features/onboarding/Onboarding/Onboarding.tsx";
import SettingsLanding from "@/features/settings/SettingsLanding/SettingsLanding.tsx";
import App from "@/layouts/App/App.tsx";
import Landing from "@/layouts/Landing/Landing.tsx";
import type { Route } from "@/types/route.ts";
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Login/Login";

const routes: Route[] = [
  {
    path: "/auth-callback",
    element: <AuthCallback />,
  },
  {
    element: <RequireGuest />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/check-email",
        element: <CheckEmail />,
      },
    ],
  },
  {
    element: <App />,
    children: [
      {
        element: <RequireGuest />,
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
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/onboarding",
            element: <Onboarding />,
            handle: {
              header: {
                title: "Onboarding",
                showBackButton: false,
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
    ],
  },
];

export const router = createBrowserRouter(routes);
