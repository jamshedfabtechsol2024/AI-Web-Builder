import { Skeleton } from "@/components/ui/skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="flex cursor-pointer flex-col gap-2">
      {/* Image skeleton */}
      <div className="h-60 w-full">
        <Skeleton className="h-full w-full rounded-lg bg-white/10" />
      </div>

      {/* Title & updated text skeleton */}
      <div className="flex items-center justify-between gap-6">
        <Skeleton className="h-4 w-32 rounded bg-white/10" />{" "}
        {/* project name */}
        <Skeleton className="h-3 w-20 rounded bg-white/10" /> {/* updatedAt */}
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
