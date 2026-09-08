import { useAuth } from "@/context/auth/useAuth.ts";
import Carousel from "@/features/onboarding/Carousel.tsx";
import { useOnboardingData } from "@/features/onboarding/data/onboardingData/useOnboardingData.ts";
import type { OnboardingStepForm } from "@/features/onboarding/onboarding.types.ts";
import Birthday from "@/features/onboarding/steps/Birthday.tsx";
import FamilyGroup from "@/features/onboarding/steps/FamilyGroup.tsx";
import Name from "@/features/onboarding/steps/Name.tsx";
import Picture from "@/features/onboarding/steps/Picture.tsx";
import Role from "@/features/onboarding/steps/Role.tsx";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import { useEffect } from "react";

const Onboarding = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useOnboardingData(user!.id);
  const hydrate = useOnboardingStore((state) => state.hydrate);

  useEffect(() => {
    if (data) hydrate(data);
  }, [data, hydrate]);

  if (isLoading) return <div>Loading...</div>; // TODO: add loader component

  if (error) return <div>Error: {error.message}</div>; // TODO: add error component

  const steps: OnboardingStepForm[] = [
    <FamilyGroup />,
    <Name />,
    <Birthday />,
    <Picture />,
    <Role />,
  ];

  return <Carousel steps={steps} />;
};

export default Onboarding;
