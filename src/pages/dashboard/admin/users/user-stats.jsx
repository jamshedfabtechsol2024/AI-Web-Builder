import StatCard from "@/components/card/stat-card";
import StatSkeleton from "@/components/skeletons/stat-skeleton";

const UserStats = ({ data, isLoading = false }) => {
  const STAT_DATA = [
    { title: "Total Users", value: data?.total_users || "0" },
    { title: "Subscribed User", value: data?.subscribed_users || "0" },
  ];
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Users Management</h1>
        <p className="text-[#696969] text-xs">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 2 }).map((_, idx) => (
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

export default UserStats;
