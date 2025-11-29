import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationSettingsSkeleton = () => {
  // let's simulate 3 sections with 3 fields each
  return (
    <div className="flex flex-col gap-6">
      {[...Array(3)].map((_, sectionIdx) => (
        <div key={sectionIdx}>
          {/* Section title skeleton */}
          <Skeleton className="h-5 w-40 rounded bg-white/10" />

          <div className="mt-4 flex flex-col gap-3">
            {[...Array(3)].map((_, fieldIdx) => (
              <div className="flex items-center justify-between" key={fieldIdx}>
                {/* Label skeleton */}
                <Skeleton className="h-4 w-32 rounded bg-white/10" />
                {/* Switch skeleton */}
                <Skeleton className="h-6 w-12 rounded-full bg-white/10" />
              </div>
            ))}
          </div>

          {/* Separator skeleton (between sections only) */}
          {sectionIdx < 2 && <Separator className="my-6 bg-white/10" />}
        </div>
      ))}
    </div>
  );
};

export default NotificationSettingsSkeleton;
