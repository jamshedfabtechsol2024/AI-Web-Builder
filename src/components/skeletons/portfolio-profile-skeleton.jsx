import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioProfileSkeleton = () => {
  return (
    <Card className="!p-0 w-full overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
      {/* Cover skeleton */}
      <div className="relative">
        <Skeleton className="h-40 w-full rounded-none bg-white/10" />

        {/* Profile photo skeleton */}
        <div className="-bottom-12 absolute left-6">
          <Skeleton className="h-24 w-24 rounded-full border-4 border-[#FFFFFF0F] bg-white/10" />
        </div>

        {/* Right-side button skeleton */}
        <div className="-bottom-6 absolute right-6">
          <Skeleton className="h-10 w-36 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 px-6 pt-16 pb-6">
        {/* Name + Role */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-44 rounded bg-white/10" />
          <Skeleton className="h-4 w-32 rounded bg-white/10" />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20 rounded bg-white/10" />
          <Skeleton className="h-4 w-full rounded bg-white/10" />
          <Skeleton className="h-4 w-5/6 rounded bg-white/10" />
          <Skeleton className="h-4 w-2/3 rounded bg-white/10" />
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-28 rounded bg-white/10" />
          <Skeleton className="h-4 w-3/4 rounded bg-white/10" />
          <Skeleton className="h-4 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </Card>
  );
};

export default PortfolioProfileSkeleton;
