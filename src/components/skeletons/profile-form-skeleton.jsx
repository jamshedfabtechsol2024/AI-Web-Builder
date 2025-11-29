import { Skeleton } from "@/components/ui/skeleton";

const ProfileFormSkeleton = () => {
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {/* Profile Image Skeleton */}
      <div className="flex justify-start">
        <Skeleton className="h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Form fields skeletons */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 bg-white/10" /> {/* label */}
          <Skeleton className="h-12 w-full rounded-md bg-white/10" />{" "}
          {/* input */}
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-12 w-full rounded-md bg-white/10" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-12 w-full rounded-md bg-white/10" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-12 w-full rounded-md bg-white/10" />
        </div>
      </div>

      {/* Save button skeleton */}
      <div className="flex items-center">
        <Skeleton className="mt-4 h-10 w-32 rounded-md bg-white/10" />
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;
