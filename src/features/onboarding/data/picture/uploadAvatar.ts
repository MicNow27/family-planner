import { supabaseClient } from "@/data/supabase.ts";

const AVATARS_BUCKET = "avatars";

export const uploadAvatar = async (userId: string, file: File) => {
  const path = `${userId}/avatar`;

  const { error } = await supabaseClient.storage
    .from(AVATARS_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabaseClient.storage.from(AVATARS_BUCKET).getPublicUrl(path);

  return publicUrl;
};
