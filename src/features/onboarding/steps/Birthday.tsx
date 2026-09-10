import { useOnboardingStore } from "@/features/onboarding/store/onboarding.store.ts";

const Birthday = () => {
  const setCarouselStep = useOnboardingStore((state) => state.setCarouselStep);

  return (
    <>
      <div>Birthday</div>
      <button onClick={() => setCarouselStep(1)}>Go Back</button>
    </>
  );
};

export default Birthday;
