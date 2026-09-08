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

  return {
    onboardingStep: data.onboarding_step,
    familyGroupName: data.family_groups[0]?.name,
    fullName: data.full_name,
    birthday: data.birthday,
    picture: data.avatar_url,
    role: data.role,
  };
};
