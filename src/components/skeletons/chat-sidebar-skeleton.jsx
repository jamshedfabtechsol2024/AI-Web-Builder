import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSidebarSkeleton() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-[#FFFFFF1A] bg-black p-2 sm:p-4">
      {/* Chat list skeleton */}
      <div className="hide-scrollbar min-h-0 w-full flex-1 space-y-1 overflow-y-auto sm:space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative flex w-full items-center gap-2 rounded-lg p-2 sm:gap-3 sm:p-3"
          >
            {/* Avatar skeleton */}
            <Avatar className="h-8 w-8 flex-shrink-0 sm:h-10 sm:w-10">
              <AvatarFallback>
                <Skeleton className="h-full w-full rounded-full bg-white/10" />
              </AvatarFallback>
            </Avatar>

            {/* Content skeleton */}
            <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden gap-1">
              <Skeleton className="h-3 w-20 rounded bg-white/10 sm:h-3.5 sm:w-24" />
              <Skeleton className="h-2.5 w-32 rounded bg-white/10 sm:h-3 sm:w-36" />
            </div>

            {/* Time skeleton */}
            <div className="absolute top-1 right-2 flex flex-col items-end gap-1 sm:top-2 sm:right-3">
              <Skeleton className="h-2 w-8 rounded bg-white/10 sm:h-2.5 sm:w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
