import type { HeaderSettings } from "@/types/header.ts";
import * as React from "react";

type SimpleRoute = {
  path: string;
  element: React.ReactNode;
};

export type Handle = {
  header: HeaderSettings;
};

type ChildRoute = {
  path: string;
  element: React.ReactNode;
  handle: Handle;
};

type MainRoute = {
  path?: string;
  element: React.ReactNode;
  children: ChildRoute[];
};

export type Route = SimpleRoute | MainRoute;
