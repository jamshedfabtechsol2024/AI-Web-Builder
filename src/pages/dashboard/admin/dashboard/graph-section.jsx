import { Skeleton } from "@/components/ui/skeleton";
import { LineChartGraph } from "./line-chart-graph";
import RevenueBarChart from "./revenue-bar-chart";
import { useAuthStore } from "@/store/use-auth-store";
import { useGetAdminDashboardData } from "@/hooks/use-dashboard";

function GraphSection() {
  const user = useAuthStore((s) => s.user);
  const { data, isPending } = useGetAdminDashboardData();
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">
          Welcome Back {user?.first_name} {user?.last_name}
        </h1>
        <p className="text-[#696969] text-xs">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isPending ? (
          <>
            {/* Line chart skeleton */}
            <div className="flex flex-col gap-4 rounded-xl border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4">
              <Skeleton className="h-5 w-32 rounded bg-white/10" />{" "}
              <Skeleton className="h-60 w-full rounded-lg bg-white/10" />{" "}
            </div>

            {/* Bar chart skeleton */}
            <div className="flex flex-col gap-4 rounded-xl border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4">
              <Skeleton className="h-5 w-32 rounded bg-white/10" />{" "}
              <Skeleton className="h-60 w-full rounded-lg bg-white/10" />{" "}
            </div>
          </>
        ) : (
          <>
            <LineChartGraph data={data?.user_growth || []} />
            <RevenueBarChart data={data?.subscription_revenue || []} />
          </>
        )}
      </div>
    </div>
  );
}

export default GraphSection;
