import { getProfile } from "@/data/profile/profile.api.ts";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (userId?: string) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId!),
    enabled: !!userId,
  });
