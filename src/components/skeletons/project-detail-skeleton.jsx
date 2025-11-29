import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProjectDetailSkeleton = () => {
  return (
    <Card className="!p-4 !py-6 gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div className="flex flex-col gap-2" key={idx}>
            <Skeleton className="h-4 w-28 rounded bg-white/10" /> {/* label */}
            <Skeleton className="h-4 w-20 rounded bg-white/10" /> {/* value */}
          </div>
        ))}
      </div>

      {/* Media Section */}
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-24 rounded bg-white/10" />{" "}
        {/* "Media:" label */}
        <div className="flex w-fit min-w-[300px] items-center justify-between rounded-lg border border-[#FFFFFF0F] px-4 py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded bg-white/10" /> {/* icon */}
            <Skeleton className="h-4 w-32 rounded bg-white/10" />{" "}
            {/* filename */}
          </div>
          <Skeleton className="h-4 w-12 rounded bg-white/10" /> {/* size */}
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-28 rounded bg-white/10" />{" "}
        {/* "Description:" label */}
        <Skeleton className="h-16 w-full rounded bg-white/10" />{" "}
        {/* description block */}
      </div>
    </Card>
  );
};

export default ProjectDetailSkeleton;
