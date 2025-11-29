import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const RequestDetailSkeleton = () => {
  return (
    <Card className="!p-4 !py-6 gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div className="flex flex-col gap-2" key={idx}>
            <Skeleton className="h-4 w-32 rounded bg-white/10" /> {/* label */}
            <Skeleton className="h-4 w-20 rounded bg-white/10" /> {/* value */}
          </div>
        ))}
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

export default RequestDetailSkeleton;
