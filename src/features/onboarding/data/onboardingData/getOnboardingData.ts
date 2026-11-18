import { supabaseClient } from "@/data/supabase.ts";
import type { OnboardingState } from "@/features/onboarding/store/onboarding.store.ts";

export const getOnboardingData = async (
  userId: string,
): Promise<OnboardingState> => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select(
      `full_name, birthday, avatar_url, role, onboarding_step, family_group_id, family_groups (name)`,
    )
    .eq("id", userId)
    .single();

  if (error) throw error;

  const familyGroup = Array.isArray(data.family_groups)
    ? data.family_groups[0]
    : data.family_groups;

  return {
    onboardingStep: data.onboarding_step,
    carouselStep: data.onboarding_step,
    familyGroupId: data.family_group_id,
    familyGroupName: familyGroup?.name ?? null,
    fullName: data.full_name,
    birthday: data.birthday,
    avatarUrl: data.avatar_url,
    role: data.role,
  };
};
