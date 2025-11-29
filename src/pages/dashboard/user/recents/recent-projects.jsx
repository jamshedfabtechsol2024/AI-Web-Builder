import { useNavigate } from "react-router-dom";
import RunningProjectCard from "@/components/card/running-project-card";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import { useGetAllConversations } from "@/hooks/use-conversation";
import staronDefault from "/images/staron_def.png";

const RecentProjects = () => {
  const navigate = useNavigate();
  const {
    data: conversations,
    isPending,
    isFetching,
    isLoading: loadingConversations,
  } = useGetAllConversations();

  const isLoading = isPending || isFetching || loadingConversations;
  const projects = conversations?.conversations || [];

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProjectCardSkeleton key={idx} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <p className="font-medium text-lg">No projects found</p>
          <p className="text-muted-foreground text-sm">
            Start a new project to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projects.map((project) => (
            <RunningProjectCard
              image={project?.image_url || staronDefault}
              key={project.id}
              id={project.id}
              name={project?.title || "Untitled Project"}
              onCardClick={() => navigate(`/project/${project.id}`)}
              updatedAt={project.updated_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
