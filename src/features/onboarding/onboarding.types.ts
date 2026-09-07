import * as React from "react";

export type OnboardingStepForm = {
  component: React.ReactNode;
};

export type OnboardingStepProps = {
  heading: string;
};

export type OnboardingStep = 0 | 1 | 2 | 3 | 4;
