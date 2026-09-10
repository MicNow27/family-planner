import type { OnboardingStepForm } from "@/features/onboarding/onboarding.types.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";

type CarouselProps = {
  steps: OnboardingStepForm[];
};

const Carousel = ({ steps }: CarouselProps) => {
  const currentStep = useOnboardingStore((state) => state.carouselStep);

  return steps[currentStep];
};

export default Carousel;
