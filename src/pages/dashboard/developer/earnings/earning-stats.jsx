import StatCard from "@/components/card/stat-card";
import StatSkeleton from "@/components/skeletons/stat-skeleton";

const EarningStats = ({ data, isLoading }) => {
  const STAT_DATA = [
    { title: "Total Earnings", value: `$${data?.total_earnings || 0} ` },
    { title: "Pending Payments", value: `$${data?.pending_payments || 0}` },
    { title: "Completed Projects", value: `${data?.completed_projects || 0}` },
  ];
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Earnings</h1>
        <p className="text-[#696969] text-xs">
          Earnings Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
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

export default EarningStats;
