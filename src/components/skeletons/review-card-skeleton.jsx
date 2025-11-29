import { Skeleton } from "@/components/ui/skeleton";

const ReviewCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/6 p-4">
      {/* Header with title + rating */}
      <div className="flex items-center justify-between gap-6">
        {/* Title skeleton */}
        <Skeleton className="h-4 w-32 rounded bg-white/10" />
        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton className="h-3 w-3 rounded-full bg-white/10" key={i} />
          ))}
          <Skeleton className="h-3 w-6 rounded bg-white/10" />
        </div>
      </div>

      {/* Description skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded bg-white/10" />
        <Skeleton className="h-3 w-5/6 rounded bg-white/10" />
        <Skeleton className="h-3 w-4/6 rounded bg-white/10" />
      </div>

      {/* Footer with earnings & days */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20 rounded bg-white/10" /> {/* label */}
          <Skeleton className="h-3 w-12 rounded bg-white/10" /> {/* value */}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-20 rounded bg-white/10" />
          <Skeleton className="h-3 w-12 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
