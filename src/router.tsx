import MyFamily from "@/features/MyFamily/MyFamily.tsx";
import SettingsLanding from "@/features/settings/SettingsLanding.tsx";
import App from "@/layouts/App.tsx";
import StartingUp from "@/layouts/StartingUp.tsx";
import AuthCallback from "@auth/components/AuthCallback.tsx";
import CheckEmail from "@auth/components/CheckEmail.tsx";
import ForgotPassword from "@auth/components/ForgotPassword.tsx";
import Landing from "@auth/components/Landing.tsx";
import ResetPassword from "@auth/components/ResetPassword.tsx";
import SignUp from "@auth/components/SignUp.tsx";
import { GET_STARTED, MY_FAMILY, SETTINGS } from "@copy/general.ts";
import ErrorPage from "@navigation/components/ErrorPage.tsx";
import PageNotFound from "@navigation/components/PageNotFound.tsx";
import AuthGate from "@navigation/routeGates/AuthGate.tsx";
import DashboardGate from "@navigation/routeGates/DashboardGate.tsx";
import type { RouteTypes } from "@navigation/types/routeTypes.ts";
import Onboarding from "@onboarding/components/Onboarding.tsx";
import { createBrowserRouter } from "react-router";
import Login from "./features/auth/components/Login.tsx";

const guest = (children: RouteTypes[]): RouteTypes => ({
  element: <AuthGate requireAuth={false} />,
  children,
});

const auth = (children: RouteTypes[]): RouteTypes => ({
  element: <AuthGate requireAuth={true} />,
  children,
});

const dashboard = (children: RouteTypes[]): RouteTypes => ({
  element: <DashboardGate requireDashboard={true} />,
  children,
});

const onboarding = (children: RouteTypes[]): RouteTypes => ({
  element: <DashboardGate requireDashboard={false} />,
  children,
});

const routes: RouteTypes[] = [
  {
    element: <StartingUp />,
    children: [
      {
        path: "/auth-callback",
        element: <AuthCallback />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        handle: { header: { showBackButton: true, backButtonRoute: "/" } },
      },
      {
        path: "/error-page",
        element: <ErrorPage />,
        handle: { header: { showBackButton: true, backButtonRoute: "/" } },
      },
      {
        path: "*",
        element: <PageNotFound />,
        handle: { header: { showBackButton: true, backButtonRoute: "/" } },
      },
    ],
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
          handle: { header: { showBackButton: true, backButtonRoute: "/" } },
        },
        {
          path: "/login",
          element: <Login />,
          handle: { header: { showBackButton: true, backButtonRoute: "/" } },
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
          handle: {
            header: { showBackButton: true, backButtonRoute: "/login" },
          },
        },
        {
          path: "/check-email",
          element: <CheckEmail />,
          handle: { header: { showBackButton: true, backButtonRoute: "/" } },
        },
      ],
    },
  ]),

  auth([
    onboarding([
      {
        element: <App />,
        children: [
          {
            path: "/onboarding",
            element: <Onboarding />,
            handle: { header: { title: GET_STARTED } },
          },
        ],
      },
    ]),

    dashboard([
      {
        element: <App />,
        children: [
          {
            path: "/my-family",
            element: <MyFamily />,
            handle: {
              header: {
                title: MY_FAMILY,
                // overflowMenu: "dashboard",
              },
            },
          },
          {
            path: "/settings",
            element: <SettingsLanding />,
            handle: {
              header: {
                title: SETTINGS,
                // showBackButton: true,
                // backButtonRoute: "/dashboard",
                // overflowMenu: "settings",
              },
            },
          },
        ],
      },
    ]),
  ]),
];

export const router = createBrowserRouter(routes);
