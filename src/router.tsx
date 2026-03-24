import AuthGate from "@/components/routes/AuthGate.tsx";
import AuthCallback from "@/features/auth/AuthCallback.tsx";
import CheckEmail from "@/features/auth/CheckEmail.tsx";
import ForgotPassword from "@/features/auth/ForgotPassword.tsx";
import ResetPassword from "@/features/auth/ResetPassword.tsx";
import SignUp from "@/features/auth/SignUp.tsx";
import MyFamily from "@/features/MyFamily/MyFamily.tsx";
import Onboarding from "@/features/onboarding/Onboarding.tsx";
import SettingsLanding from "@/features/settings/SettingsLanding.tsx";
import App from "@/layouts/App.tsx";
import Landing from "@/layouts/Landing.tsx";
import StartingUp from "@/layouts/StartingUp.tsx";
import type { Route } from "@/types/route.ts";
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Login.tsx";

const guest = (children: Route[]): Route => ({
  element: <AuthGate requireAuth={false} />,
  children,
});

const auth = (children: Route[]): Route => ({
  element: <AuthGate requireAuth={true} />,
  children,
});

const routes: Route[] = [
  {
    path: "/auth-callback",
    element: <AuthCallback />,
  },

  guest([
    {
      path: "/",
      element: <Landing />,
    },
    {
      element: <StartingUp />,
      children: [
        {
          path: "/sign-up",
          element: <SignUp />,
          handle: { header: { showBackButton: true } },
        },
        {
          path: "/login",
          element: <Login />,
          handle: { header: { showBackButton: true } },
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
          handle: { header: { showBackButton: true } },
        },
        {
          path: "/check-email",
          element: <CheckEmail />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
          handle: { header: { showBackButton: true } },
        },
      ],
    },
  ]),

  auth([
    {
      element: <App />,
      children: [
        {
          path: "/onboarding",
          element: <Onboarding />,
          handle: { header: { title: "Let's Get Started" } },
        },
        {
          path: "/my-family",
          element: <MyFamily />,
          handle: {
            header: {
              title: "Hello, Margot", // TODO: replace with user's name
              // overflowMenu: "dashboard",
            },
          },
        },
        {
          path: "/settings",
          element: <SettingsLanding />,
          handle: {
            header: {
              title: "Settings",
              // showBackButton: true,
              // backButtonRoute: "/dashboard",
              // overflowMenu: "settings",
            },
          },
        },
      ],
    },
  ]),
];

export const router = createBrowserRouter(routes);
