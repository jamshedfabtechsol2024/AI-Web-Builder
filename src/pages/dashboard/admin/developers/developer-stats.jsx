import StatCard from "@/components/card/stat-card";
import StatSkeleton from "@/components/skeletons/stat-skeleton";

const DeveloperStats = ({ data, isLoading = false }) => {
  const STAT_DATA = [
    { title: "Total Developers", value: data?.total_developers || "0" },
    { title: "Approved", value: data?.approved || "0" },
    // { title: "Pending", value: data?.pending_vetting || "0" },
    { title: "Suspended Developers", value: data?.suspended_developers || "0" },
  ];
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Developers Management</h1>
        <p className="text-[#696969] text-xs">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

export default DeveloperStats;
