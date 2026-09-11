import FullScreenLoader from "@/components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import { useAuth } from "@/context/auth/useAuth.ts";
import ErrorPage from "@/features/navigation/ErrorPage.tsx";
import Carousel from "@/features/onboarding/Carousel.tsx";
import { useOnboardingData } from "@/features/onboarding/data/onboardingData/useOnboardingData.ts";
import Birthday from "@/features/onboarding/steps/Birthday.tsx";
import FamilyGroup from "@/features/onboarding/steps/FamilyGroup.tsx";
import FullName from "@/features/onboarding/steps/FullName.tsx";
import Picture from "@/features/onboarding/steps/Picture.tsx";
import Role from "@/features/onboarding/steps/Role.tsx";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import type { OnboardingStepForm } from "@/features/onboarding/types.ts";
import { ONBOARDING_DATA_FETCH_ERROR } from "@copy/onboarding.ts";
import { useEffect } from "react";

const Onboarding = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useOnboardingData(user!.id);
  const hydrate = useOnboardingStore((state) => state.hydrate);

  useEffect(() => {
    if (data) hydrate(data);
  }, [data, hydrate]);

  if (isLoading) return <FullScreenLoader />;

  if (error) return <ErrorPage messageProp={ONBOARDING_DATA_FETCH_ERROR} />;

  const steps: OnboardingStepForm[] = [
    <FamilyGroup />,
    <FullName />,
    <Birthday />,
    <Picture />,
    <Role />,
  ];

  return <Carousel steps={steps} />;
};

export default Onboarding;
