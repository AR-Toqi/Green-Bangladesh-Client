"use client";

import { TLeaderboardItem } from "@/types/leaderboard";
import { motion } from "framer-motion";
import { Trophy, Trees, ClipboardList, TrendingUp } from "lucide-react";

interface LeaderboardTableProps {
  data: TLeaderboardItem[];
}

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 ring-4 ring-yellow-500/10 shadow-lg shadow-yellow-500/20"><Trophy size={24} /></div>;
  if (rank === 2) return <div className="p-2 rounded-xl bg-zinc-300/20 text-zinc-300 border border-zinc-300/30 ring-4 ring-zinc-300/10 shadow-lg shadow-zinc-300/20"><Trophy size={20} /></div>;
  if (rank === 3) return <div className="p-2 rounded-xl bg-amber-600/20 text-amber-600 border border-amber-600/30 ring-4 ring-amber-600/10 shadow-lg shadow-amber-600/20"><Trophy size={18} /></div>;
  return <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 font-black text-sm">{rank}</div>;
};

export const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
  // Sort by totalTreesPlanted to ensure leaderboard order
  const sortedData = [...data].sort((a, b) => (b.totalTreesPlanted || 0) - (a.totalTreesPlanted || 0));
  const maxTrees = Math.max(...sortedData.map(d => (d.totalTreesPlanted || 0)), 1);

  return (
    <div className="space-y-6">
      {/* ── Header Card ─────────────────────────────────────────── */}
      <div className="p-8 rounded-[2.5rem] bg-zinc-950/70 border border-zinc-800 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-green-500/5">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-black text-zinc-50 flex items-center gap-3">
             <TrendingUp className="text-green-500" />
             National Tree Plantation Rankings
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg">
            Real-time rankings based on community reports and plantation activities across Bangladesh.
          </p>
        </div>
        <div className="flex gap-4">
           <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Total Impact</p>
              <p className="text-xl font-black text-green-500">
                {sortedData.reduce((acc, curr) => acc + (curr.totalTreesPlanted || 0), 0).toLocaleString()} <span className="text-xs text-zinc-600">Trees</span>
              </p>
           </div>
        </div>
      </div>

      {/* ── Rankings List ───────────────────────────────────────── */}
      <div className="grid gap-4">
        {sortedData.map((item, index) => {
          const rank = index + 1;
          const currentTrees = item.totalTreesPlanted || 0;
          const percentage = (currentTrees / maxTrees) * 100;
          
          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item._id}
              className={`p-6 rounded-3xl bg-zinc-950/50 border border-zinc-900/50 hover:border-green-500/30 transition-all group relative overflow-hidden ${rank === 1 ? 'ring-2 ring-yellow-500/20' : ''}`}
            >
              {/* Background Gradient for Rank 1 */}
              {rank === 1 && (
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-500/5 via-transparent to-transparent -z-10" />
              )}

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  <RankBadge rank={rank} />
                </div>

                {/* District Info */}
                <div className="flex-grow space-y-4 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-zinc-50 group-hover:text-green-500 transition-colors">
                        {item.districtName}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                         <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                            <ClipboardList size={10} className="text-blue-500" />
                            {item.reportCount} Reports
                         </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                       <p className="text-2xl font-black text-zinc-50 flex items-center md:justify-end gap-2">
                          <Trees className="text-green-600" size={24} />
                          {(item.totalTreesPlanted || 0).toLocaleString()}
                       </p>
                       <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1">Trees Planted</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        rank === 1 ? 'bg-gradient-to-r from-green-600 to-yellow-500' :
                        rank === 2 ? 'bg-gradient-to-r from-green-600 to-zinc-400' :
                        rank === 3 ? 'bg-gradient-to-r from-green-600 to-amber-600' :
                        'bg-green-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
