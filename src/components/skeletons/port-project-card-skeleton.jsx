import { Skeleton } from "@/components/ui/skeleton";

const PortProjectCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-[var(--developer-card-border)] p-4">
      <div className="flex h-full w-full flex-col justify-between">
        {/* Project Image Skeleton */}
        <div className="h-60 w-full">
          <Skeleton className="h-full w-full rounded-lg bg-white/10" />
        </div>

        {/* Project Info Skeleton */}
        <div className="flex items-center justify-between rounded px-1 py-2 sm:px-2 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-12 rounded bg-white/10" />{" "}
              {/* "Project:" label */}
              <Skeleton className="h-3 w-24 rounded bg-white/10" />{" "}
              {/* project name */}
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="flex flex-col gap-2 px-1 pb-2 sm:px-2 sm:pb-3">
          <Skeleton className="h-3 w-full rounded bg-white/10" />
          <Skeleton className="h-3 w-5/6 rounded bg-white/10" />
          <Skeleton className="h-3 w-4/6 rounded bg-white/10" />
        </div>

        {/* Rating Skeleton */}
        <div className="mt-2 flex flex-col gap-2 px-1 sm:px-2">
          <Skeleton className="h-3 w-40 rounded bg-white/10" />{" "}
          {/* "Clients Review & Feedback:" */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className="h-3 w-3 rounded-full bg-white/10" key={i} />
            ))}
            <Skeleton className="h-3 w-6 rounded bg-white/10" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-10 w-full rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default PortProjectCardSkeleton;
