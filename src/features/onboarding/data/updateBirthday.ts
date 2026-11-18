import { supabaseClient } from "@/data/supabase.ts";

export const updateBirthday = async (userId: string, birthday: string) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .update({ birthday: birthday, onboarding_step: 3 })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
