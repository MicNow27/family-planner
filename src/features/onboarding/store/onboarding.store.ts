import type { OnboardingStep } from "@/features/onboarding/onboarding.types.ts";
import { create } from "zustand/react";

export type OnboardingState = {
  onboardingStep: OnboardingStep;
  familyGroupName: string | null;
  fullName: string | null;
  birthday: string | null;
  picture: string | null;
  role: string | null;
};

type OnboardingAction = {
  setOnboardingStep: (step: OnboardingStep) => void;
  setFamilyGroupName: (familyGroupName: string | null) => void;
  setFullName: (fullName: string | null) => void;
  setBirthday: (birthday: string | null) => void;
  setPicture: (picture: string | null) => void;
  setRole: (role: string | null) => void;
  resetOnboarding: () => void;
};

const initialState: OnboardingState = {
  onboardingStep: 0,
  familyGroupName: null,
  fullName: null,
  birthday: null,
  picture: null,
  role: null,
};

export const useOnboardingStore = create<OnboardingState & OnboardingAction>((set) => ({
  ...initialState,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setFamilyGroupName: (familyGroupName) => set({ familyGroupName }),
  setFullName: (fullName) => set({ fullName }),
  setBirthday: (birthday) => set({ birthday }),
  setPicture: (picture) => set({ picture }),
  setRole: (role) => set({ role }),
  resetOnboarding: () => set(initialState),
}));
