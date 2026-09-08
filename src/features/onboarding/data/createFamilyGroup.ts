import { supabaseClient } from "@/data/supabase.ts";

export const createFamilyGroup = async (name: string) => {
  const { data, error } = await supabaseClient.rpc("create_family_group", {
    family_group_name: name,
  });

  if (error) throw error;

  return data;
};
