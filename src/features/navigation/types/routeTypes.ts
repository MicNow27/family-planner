import type { HeaderSettings } from "@/features/navigation/types/headerTypes.ts";
import * as React from "react";

export type Handle = {
  header: HeaderSettings;
};

export type RouteTypes = {
  path?: string;
  element: React.ReactNode;
  handle?: Handle;
  children?: RouteTypes[];
};
