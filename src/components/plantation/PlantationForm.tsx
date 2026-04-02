"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { plantationSchema, TPlantationSchema } from "@/zod/plantation.schema";
import { TDistrict } from "@/types/district";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trees, MapPin, Calendar, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { reportPlantationAction } from "@/app/(protectedLayout)/actions";

interface PlantationFormProps {
  districts: TDistrict[];
}

export const PlantationForm = ({ districts }: PlantationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TPlantationSchema>({
    resolver: zodResolver(plantationSchema) as any,
    defaultValues: {
      treeCount: 1,
      districtId: "",
      location: "",
      plantationDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: TPlantationSchema) => {
    setIsLoading(true);
    try {
      const result = await reportPlantationAction(data);
      if (result.success) {
        toast.success(result.message);
        router.push("/leaderboard");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const safeString = (val: any) => (typeof val === "object" ? val?.name : val) || "";

  return (
    <Card className="w-full max-w-2xl mx-auto border-none bg-zinc-900 shadow-2xl shadow-green-500/5">
      <CardHeader className="space-y-4 text-center pb-8 border-b border-zinc-800">
        <div className="mx-auto w-16 h-16 rounded-3xl bg-green-950/30 flex items-center justify-center text-green-500 border border-green-800/50 shadow-lg mb-2">
            <Trees size={32} />
        </div>
        <div className="space-y-1.5">
            <CardTitle className="text-3xl font-black tracking-tight text-zinc-50">
              Report Tree Plantation
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium">
              Every tree planted is a step toward a greener Bangladesh.
            </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Number of Trees */}
                <FormField
                  control={form.control}
                  name="treeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Number of Trees</FormLabel>
                      <div className="relative group">
                         <Trees className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-green-500 transition-colors" size={20} />
                         <FormControl>
                           <Input 
                              type="number" 
                              className="pl-12 bg-zinc-800 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 text-zinc-200 h-14 rounded-2xl transition-all"
                              placeholder="10" 
                              {...field} 
                           />
                         </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Plantation Date */}
                <FormField
                  control={form.control}
                  name="plantationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Plantation Date</FormLabel>
                      <div className="relative group">
                         <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-green-500 transition-colors" size={20} />
                         <FormControl>
                           <Input 
                              type="date" 
                              className="pl-12 bg-zinc-800 border-zinc-700/50 focus:border-green-500/50 focus:ring-green-500/20 text-zinc-200 h-14 rounded-2xl transition-all [color-scheme:dark]"
                              {...field} 
                           />
                         </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            {/* District Selection */}
            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Select District</FormLabel>
                    <div className="relative group">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-green-500 transition-colors" size={20} />
                       <FormControl>
                         <select 
                            className="w-full pl-12 pr-4 bg-zinc-800 border border-zinc-700/50 rounded-2xl h-14 text-zinc-200 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none appearance-none"
                            {...field}
                         >
                            <option value="" className="bg-zinc-900 italic">Choose a district...</option>
                            {districts.map((district) => (
                              <option 
                                  key={district.id || district._id} 
                                  value={district.id || district._id}
                                  className="bg-zinc-900"
                              >
                                  {safeString(district.name)} ({safeString(district.division)})
                              </option>
                            ))}
                         </select>
                       </FormControl>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                           <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                       </div>
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Description */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Location Details</FormLabel>
                    <div className="relative group">
                       <Info className="absolute left-4 top-5 text-zinc-600 group-focus-within:text-green-500 transition-colors" size={20} />
                       <FormControl>
                         <textarea 
                            rows={4}
                            placeholder="Example: Near the central park gate, beside the old banyan tree..." 
                            className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700/50 rounded-2xl text-zinc-200 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all outline-none resize-none"
                            {...field}
                         />
                       </FormControl>
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-16 text-lg font-black bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all active:scale-[0.98] shadow-lg shadow-green-600/20 disabled:grayscale disabled:cursor-not-allowed group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  SUBMITTING REPORT...
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                    CONFIRM & SUBMIT REPORT
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
