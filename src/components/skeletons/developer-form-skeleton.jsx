import { Skeleton } from "@/components/ui/skeleton";

const DeveloperFormSkeleton = () => {
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {/* Profile Image */}
      <div className="flex justify-start">
        <Skeleton className="h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Cover Image */}
      <Skeleton className="h-40 w-full rounded-xl bg-white/10" />

      {/* Form fields */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <div className="flex flex-col gap-2" key={i}>
            <Skeleton className="h-4 w-28 bg-white/10" /> {/* label */}
            <Skeleton className="h-12 w-full rounded-md bg-white/10" />{" "}
            {/* input */}
          </div>
        ))}

        {/* Bio */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <Skeleton className="h-4 w-20 bg-white/10" />
          <Skeleton className="h-20 w-full rounded-md bg-white/10" />
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-12 w-full rounded-md bg-white/10" />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-4 lg:col-span-2">
          <Skeleton className="h-4 w-28 bg-white/10" />
          <Skeleton className="h-6 w-12 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Separator */}
      <Skeleton className="h-[1px] w-full bg-white/10" />

      {/* Portfolio section */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-40 bg-white/10" /> {/* section title */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton className="h-32 w-full rounded-xl bg-white/10" key={i} />
          ))}
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center">
        <Skeleton className="mt-4 h-10 w-32 rounded-md bg-white/10" />
      </div>
    </div>
  );
};

export default DeveloperFormSkeleton;
