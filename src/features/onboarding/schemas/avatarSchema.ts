import { AVATAR_SIZE_ERROR, AVATAR_VALID_ERROR } from "@copy/onboarding/avatar.ts";
import { z } from "zod";

export const avatarSchema = z.object({
  avatarFile: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0].type.startsWith("image/"),
      AVATAR_VALID_ERROR,
    )
    .refine(
      (files) => files.length === 0 || files[0].size <= 2 * 1024 * 1024,
      AVATAR_SIZE_ERROR,
    ),
});

export type AvatarFormData = z.infer<typeof avatarSchema>;
