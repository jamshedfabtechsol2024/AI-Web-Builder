import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ServicePlanCardSkeleton = () => {
  return (
    <Card className="flex flex-col gap-2 overflow-hidden rounded-3xl border border-transparent bg-[var(--price-card-bg)] p-4 shadow-[0.9px_-0.9px_31.2px_0px_#8482821A_inset]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24 rounded bg-white/10" /> {/* Title */}
        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />{" "}
        {/* Status */}
      </div>

      {/* Price */}
      <Skeleton className="h-8 w-20 rounded bg-white/10" />

      {/* Delivery & Revisions */}
      <div className="flex items-center gap-16">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-16 rounded bg-white/10" />
          <Skeleton className="h-3 w-12 rounded bg-white/10" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-16 rounded bg-white/10" />
          <Skeleton className="h-3 w-12 rounded bg-white/10" />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20 rounded bg-white/10" />
        <Skeleton className="h-12 w-full rounded bg-white/10" />
      </div>

      {/* Divider (CentralLine placeholder) */}
      <div className="my-2 h-[1px] w-full bg-white/10" />

      {/* Features */}
      <Skeleton className="h-3 w-24 rounded bg-white/10" />
      <ul className="list-inside space-y-2 pl-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="h-3 w-32 rounded bg-white/10" />
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2">
        <Skeleton className="mt-4 h-8 flex-1 rounded-md bg-white/10" />
        <Skeleton className="mt-4 h-8 flex-1 rounded-md bg-white/10" />
      </div>
    </Card>
  );
};

export default ServicePlanCardSkeleton;
