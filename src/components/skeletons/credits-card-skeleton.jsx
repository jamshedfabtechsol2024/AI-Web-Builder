import { Skeleton } from "@/components/ui/skeleton";

export default function CreditsCardSkeleton() {
  return (
    <div className="relative flex flex-col gap-6 rounded-3xl bg-[var(--price-card-bg)] p-6 shadow-[0_0_40px_0_rgba(0,0,0,0.08)] border border-[var(--light-blue)]">
      {/* Header */}
      <Skeleton className="h-6 bg-white/10 w-48" />

      {/* Credits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Monthly Credits */}
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[var(--input)] shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
          <Skeleton className="h-4 w-32 bg-white/10 mb-1" />
          <Skeleton className="h-8 w-20 bg-white/10 mb-1" />
        </div>

        {/* Daily Credits */}
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[var(--input)] shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
          <Skeleton className="h-4 w-32 bg-white/10 mb-1" />
          <Skeleton className="h-8 w-20 bg-white/10 mb-1" />
        </div>
      </div>
    </div>
  );
}
