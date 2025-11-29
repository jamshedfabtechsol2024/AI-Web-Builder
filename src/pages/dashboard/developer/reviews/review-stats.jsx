import StatCard from "@/components/card/stat-card";
import StatSkeleton from "@/components/skeletons/stat-skeleton";

const ReviewStats = ({ data, isLoading = false }) => {
  const STAT_DATA = [
    { title: "Average Rating", value: `⭐ ${data?.average_rating || 0} / 5` },
    { title: "Total Reviews", value: data?.total_reviews || 0 },
    { title: "Positive Feedback", value: `${data?.positive_feedback || 0}%` },
    { title: "Pending Responses", value: data?.pending_response || 0 },
  ];
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-lg">Customer Reviews & Feedback</h1>
        <p className="text-[#696969] text-xs">
          View feedback from clients, track ratings, and improve your services
          based on their experiences.
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

export default ReviewStats;
