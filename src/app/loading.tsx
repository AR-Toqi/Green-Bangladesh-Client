import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-lg shadow-primary/20 backdrop-blur-md">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>
        <div className="space-y-1.5 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-primary animate-pulse">
            Green Bangladesh
          </h2>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">
            Cultivating the Future
          </p>
        </div>
      </div>
    </div>
  );
}
