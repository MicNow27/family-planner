import { supabaseClient } from "@/data/supabase.ts";

export const getProfile = async (userId: string) => {
  const { data, error } = await supabaseClient.from("profiles").select("*").eq("id", userId).single();

  if (error) throw error;

  return data;
};
