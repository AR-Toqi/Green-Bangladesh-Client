import { getCurrentUserApi } from "@/services/user.service";
import { getPlantationsApi } from "@/services/plantation.service";
import Link from "next/link";
import { MapPin, Mail, Calendar, Edit3, Shield, Star, Award, TreePine } from "lucide-react";
import { format } from "date-fns";

export default async function ProfilePage() {
  let userProfile;
  let allPlantations = [];

  try {
    const response = await getCurrentUserApi();
    userProfile = response.data;
  } catch (error) {
    return (
      <div className="container py-20 text-center text-red-500">
        <h2 className="text-2xl font-black">Error loading profile</h2>
        <p>Could not fetch your profile data. Please try again later.</p>
      </div>
    );
  }

  try {
    const plantationsRes = await getPlantationsApi();
    allPlantations = plantationsRes.data || [];
  } catch (error) {
    console.error("Failed to fetch plantations", error);
  }

  const { _id, name, email, role, createdAt, profile } = userProfile;
  const joinedDate = createdAt ? format(new Date(createdAt), "MMMM yyyy") : "Unknown";

  const userId = _id || userProfile.id;
  const userPlantations = userProfile.plantations || allPlantations.filter((p: any) => {
    if (!userId) return false;
    
    // Extract the id from plantation object regardless of structure
    const pId = p.userId || (p.user?._id) || (p.user?.id) || (typeof p.user === 'string' ? p.user : undefined);
    
    if (!pId) return false;
    
    return String(pId) === String(userId);
  });
  const anyProfile = userProfile as any;
  const totalTreesPlanted = anyProfile.totalTrees || anyProfile.numberOfTrees || anyProfile.profile?.totalTrees || userPlantations.reduce((sum: number, p: any) => sum + (p.numberOfTrees || p.treeCount || 0), 0);
  const totalReports = anyProfile.totalReports || anyProfile.profile?.totalReports || userPlantations.length;

  const impactTier = totalTreesPlanted >= 100
    ? "Forest Guardian"
    : totalTreesPlanted >= 50
      ? "Tree Planter"
      : totalTreesPlanted >= 10
        ? "Seedling"
        : "Starter";

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-32">
      {/* ── Header Spacer ── */}
      <div className="pt-32 pb-8 px-6 container mx-auto max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
          Your Profile
        </h1>
        <p className="text-xl text-zinc-400 font-medium max-w-2xl">
          Manage your account details and view your environmental impact.
        </p>
      </div>

      <main className="container mx-auto max-w-5xl px-6 space-y-12">
        {/* ── Main Profile Card ── */}
        <section className="relative overflow-hidden rounded-[3rem] bg-zinc-950 border border-zinc-900 shadow-2xl p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
            {/* Avatar Placeholder */}
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2rem] bg-gradient-to-br from-green-500 to-zinc-900 flex items-center justify-center p-1 shadow-xl shadow-green-900/20">
              <div className="w-full h-full bg-zinc-950 rounded-[1.8rem] flex items-center justify-center">
                <span className="text-5xl font-black text-zinc-100 uppercase tracking-tighter">
                  {name ? name.substring(0, 2) : "US"}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
                    {role === 'admin' && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-widest font-bold rounded-full flex items-center gap-1 border border-blue-500/20">
                        <Shield size={10} /> Admin
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 flex items-center gap-2">
                    <Mail size={14} />
                    {email}
                  </p>
                </div>
                <Link
                  href="/profile/edit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold uppercase tracking-widest text-xs transition-transform hover:scale-105"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </Link>
              </div>

              {profile?.bio && (
                <p className="text-zinc-300 italic max-w-2xl border-l-2 border-green-500/50 pl-4 py-1">
                  "{profile.bio}"
                </p>
              )}

              <div className="pt-4 flex flex-col md:flex-row gap-6 mt-4 border-t border-zinc-900">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Calendar size={16} className="text-green-500" />
                  <span>Joined {joinedDate}</span>
                </div>
                {profile?.address && (
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <MapPin size={16} className="text-green-500" />
                    <span>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Impact Section ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-100">Your Impact</h3>
            <div className="h-px bg-zinc-900 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 hover:border-green-500/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TreePine size={24} />
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total Trees Planted</p>
              <p className="text-4xl font-black tracking-tight">{totalTreesPlanted}</p>
              <p className="text-zinc-600 text-xs mt-2 italic">Based on your reports</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 hover:border-blue-500/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Impact Tier</p>
              <p className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">{impactTier}</p>
              <p className="text-zinc-600 text-xs mt-2 italic">Plant more trees to level up</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 hover:border-orange-500/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star size={24} />
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Contributions</p>
              <p className="text-4xl font-black tracking-tight">{totalReports}</p>
              <p className="text-zinc-600 text-xs mt-2 italic">Reports submitted</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
