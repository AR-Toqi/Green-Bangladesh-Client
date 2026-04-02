import { z } from "zod";

export const plantationSchema = z.object({
  treeCount: z.coerce.number().min(1, "You must plant at least 1 tree"),
  districtId: z.string().min(1, "Please select a district"),
  location: z.string().min(5, "Please provide a more detailed location (min 5 characters)"),
  plantationDate: z.string().min(1, "Please select a date"),
});

export type TPlantationSchema = z.infer<typeof plantationSchema>;
