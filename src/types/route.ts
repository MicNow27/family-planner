import type { HeaderSettings } from "@/types/header.ts";
import * as React from "react";

export type Handle = {
  header: HeaderSettings;
};

export type Route = {
  path?: string;
  element: React.ReactNode;
  handle?: Handle;
  children?: Route[];
};
