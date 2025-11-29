import StatCard from "@/components/card/stat-card";
import StatSkeleton from "@/components/skeletons/stat-skeleton";
import { useAuthStore } from "@/store/use-auth-store";

const DashboardStats = ({ data, isLoading = false }) => {
  const user = useAuthStore((s) => s.user);
  const STAT_DATA = [
    { title: "Assigned Projects", value: data?.assigned_projects || 0 },
    { title: "Completed Projects", value: data?.completed_projects || 0 },
    { title: "Pending Requests", value: data?.pending_requests || 0 },
    { title: "Total Earnings", value: `$${data?.total_earnings || 0}` },
  ];
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <StatSkeleton key={idx} />
            ))
          : STAT_DATA.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
              />
            ))}
      </div>
    </div>
  );
};

export default DashboardStats;
