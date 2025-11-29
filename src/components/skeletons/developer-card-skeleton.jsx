import { Skeleton } from "@/components/ui/skeleton";

const DeveloperCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-[var(--developer-card-border)] bg-[var(--developer-card-bg)] p-4">
      <div className="flex h-full w-full flex-col justify-between">
        {/* Developer Image Skeleton */}
        <div className="h-60 w-full">
          <Skeleton className="h-full w-full rounded-lg bg-white/10" />
        </div>

        {/* Developer Info Skeleton */}
        <div className="flex items-center justify-between rounded px-1 py-2 sm:px-2 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Avatar Skeleton */}
            <Skeleton className="h-8 w-8 rounded-full bg-white/10 sm:h-12 sm:w-12" />
            <div className="flex flex-col gap-1">
              {/* Name Skeleton */}
              <Skeleton className="h-3 w-24 rounded bg-white/10 sm:h-4" />
              {/* Role Skeleton */}
              <Skeleton className="h-3 w-16 rounded bg-white/10 sm:h-4" />
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="flex flex-col gap-2 px-1 pb-2 sm:px-2 sm:pb-3">
          <Skeleton className="h-3 w-full rounded bg-white/10" />
          <Skeleton className="h-3 w-5/6 rounded bg-white/10" />
          <Skeleton className="h-3 w-4/6 rounded bg-white/10" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-10 min-w-[140px] flex-1 rounded-full bg-white/10" />
          <Skeleton className="h-10 min-w-[120px] flex-1 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default DeveloperCardSkeleton;
