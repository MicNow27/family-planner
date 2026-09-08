import { getOnboardingData } from "@/features/onboarding/data/onboardingData/getOnboardingData.ts";
import { useQuery } from "@tanstack/react-query";

export const useOnboardingData = (userId?: string) =>
  useQuery({
    queryKey: ["onboarding", userId],
    queryFn: () => getOnboardingData(userId!),
    enabled: !!userId,
  });
