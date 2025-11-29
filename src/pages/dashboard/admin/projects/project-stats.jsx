import StatCard from "@/components/card/stat-card";
import StatSkeleton from "@/components/skeletons/stat-skeleton";

const ProjectStats = ({ data, isLoading }) => {
  const STAT_DATA = data
    ? [
        { title: "Total Projects", value: data?.results?.total_projects || 0 },
        { title: "In Progress", value: data?.results?.in_progress || 0 },
        { title: "Completed", value: data?.results?.completed || 0 },
        {
          title: "Pending Feedback",
          value: data?.results?.pending_feedback || 0,
        },
      ]
    : [];
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Projects</h1>
        <p className="text-[#696969] text-xs">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <StatSkeleton key={idx} />
            ))
          : STAT_DATA?.map((stat) => (
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

export default ProjectStats;
