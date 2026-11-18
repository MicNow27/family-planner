import type { OnboardingStep, Role } from "@/features/onboarding/types.ts";
import { create } from "zustand/react";

export type OnboardingState = {
  onboardingStep: OnboardingStep;
  carouselStep: OnboardingStep;
  familyGroupId: string | null;
  familyGroupName: string | null;
  fullName: string | null;
  birthday: string | null;
  avatarUrl: string | null;
  role: Role;
};

type OnboardingAction = {
  setOnboardingStep: (step: OnboardingStep) => void;
  setCarouselStep: (step: OnboardingStep) => void;
  setFamilyGroupId: (familyGroupId: string | null) => void;
  setFamilyGroupName: (familyGroupName: string | null) => void;
  setFullName: (fullName: string | null) => void;
  setBirthday: (birthday: string | null) => void;
  setAvatarUrl: (picture: string | null) => void;
  setRole: (role: Role) => void;
  hydrate: (data: Partial<OnboardingState>) => void;
  reset: () => void;
};

const initialState: OnboardingState = {
  onboardingStep: 0,
  carouselStep: 0,
  familyGroupId: null,
  familyGroupName: null,
  fullName: null,
  birthday: null,
  avatarUrl: null,
  role: "home-manager",
};

export const useOnboardingStore = create<OnboardingState & OnboardingAction>(
  (set) => ({
    ...initialState,
    setOnboardingStep: (step) => set({ onboardingStep: step }),
    setCarouselStep: (step) => set({ carouselStep: step }),
    setFamilyGroupId: (familyGroupId) => set({ familyGroupId }),
    setFamilyGroupName: (familyGroupName) => set({ familyGroupName }),
    setFullName: (fullName) => set({ fullName }),
    setBirthday: (birthday) => set({ birthday }),
    setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
    setRole: (role) => set({ role }),
    hydrate: (data) => set(data),
    reset: () => set(initialState),
  }),
);
