import { Skeleton } from "@/components/ui/skeleton";

const ChatWindowSkeleton = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-[#FFFFFF1A] bg-black">
      {/* Header skeleton */}
      <div className="flex items-center justify-between gap-2 border-[#FFFFFF1A] border-b p-2 sm:gap-3 sm:p-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-white/10 lg:hidden" />
          <Skeleton className="h-8 w-8 rounded-full bg-white/10 sm:h-10 sm:w-10" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Skeleton className="h-4 w-24 bg-white/10 sm:h-5" />
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-3">
          <Skeleton className="h-8 w-20 rounded-full bg-white/10 sm:h-10 sm:w-24" />
        </div>
      </div>

      {/* Messages skeleton */}
      <div
        className="flex-1 overflow-y-auto bg-[var(--background)] p-2 sm:p-4"
        style={{ maxHeight: "calc(100vh - 18rem)" }}
      >
        <div className="space-y-4">
          {["s1", "s2", "s3", "s4", "s5", "s6"].map((key, index) => (
            <div
              className={`flex gap-2 sm:gap-3 ${
                index % 3 === 0 ? "justify-end" : "justify-start"
              }`}
              key={`message-skeleton-${key}`}
            >
              {index % 3 !== 0 && (
                <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full bg-white/10 sm:h-10 sm:w-10" />
              )}
              <div className="flex max-w-[70%] flex-col gap-1">
                <Skeleton
                  className={`h-10 rounded-lg bg-white/10 ${
                    index % 3 === 0 ? "rounded-br-sm" : "rounded-bl-sm"
                  }`}
                />
                <Skeleton className="h-3 w-16 bg-white/5" />
              </div>
              {index % 3 === 0 && (
                <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full bg-white/10 sm:h-10 sm:w-10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input skeleton */}
      <div className="flex items-center gap-1 rounded-b-xl border-[#FFFFFF1A] border-t bg-white/5 p-2 sm:gap-2 sm:p-4">
        <div className="relative flex-1">
          <Skeleton className="h-10 w-full rounded-md bg-white/10" />
        </div>
        <Skeleton className="h-10 w-10 rounded-md bg-white/10" />
      </div>
    </div>
  );
};

export default ChatWindowSkeleton;
