import { useAuth } from "@auth/context/useAuth.ts";
import FullScreenLoader from "@components/loaders/FullScreenLoader/FullScreenLoader.tsx";
import ErrorPage from "@navigation/components/ErrorPage.tsx";
import Carousel from "@onboarding/components/Carousel.tsx";
import Avatar from "@onboarding/components/steps/Avatar.tsx";
import Birthday from "@onboarding/components/steps/Birthday.tsx";
import FamilyGroup from "@onboarding/components/steps/FamilyGroup.tsx";
import FullName from "@onboarding/components/steps/FullName.tsx";
import Role from "@onboarding/components/steps/role/Role.tsx";
import { ONBOARDING_DATA_FETCH_ERROR } from "@onboarding/copy/onboarding.ts";
import { useOnboardingData } from "@onboarding/data/onboardingData/useOnboardingData.ts";
import { useOnboardingStore } from "@onboarding/store/onboarding.store.ts";
import type { OnboardingStepForm } from "@onboarding/types.ts";
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

  const steps: OnboardingStepForm[] = [<FamilyGroup />, <FullName />, <Birthday />, <Avatar />, <Role />];

  return <Carousel steps={steps} />;
};

export default Onboarding;
