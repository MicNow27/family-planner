import AuthProvider from "@/context/auth/AuthProvider.tsx";
import { router } from "@/router.tsx";
import "@fontsource/montserrat/700.css";
import { StrictMode } from "react";
import "@fontsource/montserrat/index.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
