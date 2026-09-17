import { supabaseClient } from "@/data/supabase.ts";

export const updateRole = async (userId: string, role: string) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .update({ role: role, onboarding_completed: true })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
