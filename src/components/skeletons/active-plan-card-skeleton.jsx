import { Skeleton } from "@/components/ui/skeleton";

export default function ActivePlanCardSkeleton() {
  return (
    <div className="relative flex flex-col gap-2 overflow-hidden rounded-3xl bg-[var(--price-card-bg)] p-4 shadow-[0.9px_-0.9px_31.2px_0px_#8482821A_inset] border border-transparent">
      {/* Top line */}
      <Skeleton className="absolute top-0 left-5 h-[6px] w-[100px] rounded-full" />

      {/* Buttons */}
      <div className="flex justify-end pb-6 gap-2">
        <Skeleton className="h-8 w-32 bg-white/10 rounded-full" />
        <Skeleton className="h-8 w-32 bg-white/10  rounded-full" />
      </div>

      <div className="flex w-full flex-col gap-6 md:flex-row lg:flex-row 2xl:gap-16">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 bg-white/10  w-32" />
          <Skeleton className="h-8 bg-white/10  w-36" />
          <Skeleton className="h-3 bg-white/10  w-48 mt-2" />
        </div>

        {/* Central line */}
        <div className="hidden h-48 items-center justify-center md:flex">
          <Skeleton className="h-full bg-white/10  w-1" />
        </div>
        <div className="block md:hidden">
          <Skeleton className="h-1 bg-white/10  w-full" />
        </div>

        {/* Features */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-1 gap-2 pl-2 2xl:grid-cols-2">
            <Skeleton className="h-3 bg-white/10  w-full" />
            <Skeleton className="h-3 bg-white/10  w-full" />
            <Skeleton className="h-3 bg-white/10  w-full" />
            <Skeleton className="h-3 bg-white/10  w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
