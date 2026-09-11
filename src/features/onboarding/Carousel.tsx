import type { OnboardingStepForm } from "@/features/onboarding/onboarding.types.ts";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";

type CarouselProps = {
  steps: OnboardingStepForm[];
};

const Carousel = ({ steps }: CarouselProps) => {
  const currentStep = useOnboardingStore((state) => state.carouselStep);

  return (
    <div className="mx-auto w-full overflow-hidden lg:max-w-4xl">
      <div
        className="flex gap-4 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(calc(-${currentStep * 100}% - ${currentStep}rem))`,
        }}
      >
        {steps.map((step, index) => (
          <div key={index} className="w-full shrink-0">
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
