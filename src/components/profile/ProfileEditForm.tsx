"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, TUpdateProfileSchema } from "@/zod/profile.schema";
import { updateUserProfileAction } from "@/app/(protectedLayout)/actions";
import { TUserProfile } from "@/types/user";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileEditForm({ initialData }: { initialData: TUserProfile }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: initialData.name || "",
      bio: initialData.profile?.bio || "",
      address: initialData.profile?.address || "",
    },
  });

  const onSubmit = async (data: TUpdateProfileSchema) => {
    setIsSubmitting(true);
    setServerError("");

    const result = await updateUserProfileAction(data);

    if (result.success) {
      router.push("/profile");
    } else {
      setServerError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium">
          {serverError}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Full Name</label>
          <input
            {...register("name")}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="John Doe"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all resize-none"
            placeholder="Tell us about your passion for the environment..."
          />
          {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Address</label>
          <input
            {...register("address")}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="Your city or district"
          />
          {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
      >
        {isSubmitting ? (
          <><Loader2 className="animate-spin" size={18} /> Updating...</>
        ) : (
          <>Save Changes <ArrowRight size={18} /></>
        )}
      </button>
    </form>
  );
}
