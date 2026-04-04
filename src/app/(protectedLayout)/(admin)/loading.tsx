import React from "react";
import { Loader2, TreePine } from "lucide-react";

export default function AdminGlobalLoader() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="relative group">
          {/* Main glowing pulse effect */}
          <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-all duration-700 animate-pulse" />
          
          {/* Animated Spinner Outer */}
          <div className="relative h-20 w-20 flex items-center justify-center">
            <Loader2 
              className="absolute h-full w-full text-green-500/20 animate-[spin_3s_linear_infinite]" 
              size={80} 
              strokeWidth={1}
            />
            <Loader2 
              className="absolute h-16 w-16 text-green-500 animate-[spin_1.5s_ease-in-out_infinite]" 
              size={64} 
              strokeWidth={2}
            />
            
            {/* Center Icon */}
            <div className="relative h-10 w-10 flex items-center justify-center bg-zinc-950 rounded-2xl shadow-xl border border-zinc-800">
                <TreePine className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
            <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Optimizing Dashboard
            </h2>
            <div className="flex items-center gap-1.5 justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-bounce" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-[200px] leading-relaxed">
                Loading environmental analytics and management controls...
            </p>
        </div>
      </div>
    </div>
  );
}
