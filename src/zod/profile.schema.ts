import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional().or(z.literal("")),
  bio: z.string().max(300, "Bio max length is 300 characters").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
