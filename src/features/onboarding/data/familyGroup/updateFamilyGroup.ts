import { supabaseClient } from "@/data/supabase.ts";

export const updateFamilyGroupName = async (familyGroupId: string, name: string) => {
  const { data, error } = await supabaseClient
    .from("family_groups")
    .update({ name })
    .eq("id", familyGroupId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
