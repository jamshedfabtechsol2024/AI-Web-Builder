import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
  return (
    <div className="space-y-3 p-3">
      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="max-w-[70%] rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-2">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="h-2 w-6 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-2 w-10 rounded bg-[var(--skeleton)]" />
          </div>
          <Skeleton className="h-3 w-24 rounded bg-[var(--skeleton)]" />
        </div>
      </div>

      {/* AI message skeleton */}
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-2">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="h-2 w-4 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-2 w-10 rounded bg-[var(--skeleton)]" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-full rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-3 w-3/4 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-3 w-1/2 rounded bg-[var(--skeleton)]" />
          </div>

          {/* JSON selector skeleton */}
          <div className="mt-2 rounded border border-[var(--border)] bg-[var(--card-bg)] p-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-16 rounded bg-[var(--skeleton)]" />
              <Skeleton className="h-6 w-16 rounded bg-[var(--skeleton)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Another user message skeleton */}
      <div className="flex justify-end">
        <div className="max-w-[70%] rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-2">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="h-2 w-6 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-2 w-10 rounded bg-[var(--skeleton)]" />
          </div>
          <Skeleton className="h-3 w-28 rounded bg-[var(--skeleton)]" />
        </div>
      </div>

      {/* AI message with longer content skeleton */}
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-2">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="h-2 w-4 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-2 w-10 rounded bg-[var(--skeleton)]" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-full rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-3 w-4/5 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-3 w-2/3 rounded bg-[var(--skeleton)]" />
            <Skeleton className="h-3 w-3/4 rounded bg-[var(--skeleton)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
