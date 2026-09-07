import Carousel from "@/features/onboarding/Carousel.tsx";
import type { OnboardingStepForm } from "@/features/onboarding/onboarding.types.ts";
import Birthday from "@/features/onboarding/steps/Birthday.tsx";
import FamilyGroup from "@/features/onboarding/steps/FamilyGroup.tsx";
import Name from "@/features/onboarding/steps/Name.tsx";
import Picture from "@/features/onboarding/steps/Picture.tsx";
import Role from "@/features/onboarding/steps/Role.tsx";
import { FAMILY_GROUP_PROMPT } from "@copy/onboarding/familyGroup.ts";

const Onboarding = () => {
  const steps: OnboardingStepForm[] = [
    {
      component: <FamilyGroup heading={FAMILY_GROUP_PROMPT} />,
    },
    {
      // heading: FULL_NAME_PROMPT,
      component: <Name />,
    },
    {
      component: <Birthday />,
    },
    {
      // heading: PICTURE_PROMPT,
      component: <Picture />,
    },
    {
      // heading: ROLE_PROMPT,
      component: <Role />,
    },
  ];

  return <Carousel steps={steps} />;
};

export default Onboarding;
