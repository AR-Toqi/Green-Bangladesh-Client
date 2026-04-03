import React from "react";
import { getCurrentUserApi } from "@/services/user.service";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProfilePage() {
  let userProfile;
  
  try {
    const response = await getCurrentUserApi();
    userProfile = response.data;
  } catch (error) {
    return (
      <div className="container py-20 text-center text-red-500">
        <h2 className="text-2xl font-black">Error loading profile</h2>
        <p>Could not load your profile for editing. Please try again later.</p>
        <Link href="/profile" className="text-zinc-400 mt-4 inline-block hover:text-white underline">
          Return to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-32">
       {/* ── Navbar Spacer & Back Button ── */}
       <div className="pt-32 pb-8 px-6 container mx-auto max-w-3xl">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} />
          Back to Profile
        </Link>
      </div>

      <main className="container mx-auto max-w-3xl px-6 space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-zinc-50">
            Edit Profile
          </h1>
          <p className="text-zinc-400 font-medium">
            Update your personal details and how they appear on Green Bangladesh.
          </p>
        </div>

        <section className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          
          <ProfileEditForm initialData={userProfile} />
        </section>
      </main>
    </div>
  );
}
