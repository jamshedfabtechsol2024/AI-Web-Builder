import { Skeleton } from "@/components/ui/skeleton";

const NotificationsSkeleton = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex w-full flex-col gap-1 rounded-xl border border-[var(--border)] bg-white/10 p-2"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full bg-white/10" />
              <Skeleton className="h-4 w-24 rounded-md bg-white/10" />
              <Skeleton className="h-3 w-12 rounded-md bg-white/10" />
            </div>
            <Skeleton className="h-3 w-3 rounded-full bg-white/10" />
          </div>

          {/* Description line(s) */}
          <div className="flex flex-col gap-1 mt-1">
            <Skeleton className="h-3 w-full rounded-md bg-white/10" />
            <Skeleton className="h-3 w-3/4 rounded-md bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSkeleton;
