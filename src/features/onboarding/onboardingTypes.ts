import * as React from "react";

export type OnboardingStepForm = React.ReactNode; // TODO flatten later

export type OnboardingStep = 0 | 1 | 2 | 3 | 4;

export type Role =
  | "home-manager"
  | "wife"
  | "husband"
  | "partner"
  | "parent"
  | "mother"
  | "father"
  | "guardian";
