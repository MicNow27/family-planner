import { supabaseClient } from "@/data/supabase.ts";

export const updateFullName = async (userId: string, fullName: string) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .update({ full_name: fullName, onboarding_step: 2 })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
