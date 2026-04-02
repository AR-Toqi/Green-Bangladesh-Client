"use server";

import { createPlantationApi } from "@/services/plantation.service";
import { TPlantationReport } from "@/types/plantation";
import { revalidatePath } from "next/cache";

export async function reportPlantationAction(data: TPlantationReport) {
  try {
    // Map Fields:
    // treeCount, treeType, location -> Required by backend Zod Validation
    // numberOfTrees, date -> Required by backend Prisma Model
    const payload = {
      ...data,
      numberOfTrees: data.treeCount,
      date: data.plantationDate ? new Date(data.plantationDate).toISOString() : undefined,
    };
    const result = await createPlantationApi(payload as any);
    
    // Revalidate the leaderboard and user plantations after submission
    revalidatePath("/leaderboard");
    revalidatePath("/profile/plantations");
    
    return {
      success: true,
      message: result.message || "Plantation report submitted successfully!",
    };
  } catch (error: any) {
    console.error("reportPlantationAction Error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit plantation report",
    };
  }
}
