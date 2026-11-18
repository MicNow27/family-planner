import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";
import type { OnboardingStepForm } from "@/features/onboarding/types.ts";

type CarouselProps = {
  steps: OnboardingStepForm[];
};

const Carousel = ({ steps }: CarouselProps) => {
  const currentStep = useOnboardingStore((state) => state.carouselStep);

  return (
    <div className="mx-auto w-full overflow-hidden px-1 lg:max-w-4xl">
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
