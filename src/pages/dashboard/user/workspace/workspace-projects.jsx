import { useNavigate, useParams } from "react-router-dom";
import RunningProjectCard from "@/components/card/running-project-card";
import ProjectCardSkeleton from "@/components/skeletons/project-card-skeleton";
import { useGetWorkSpaceProjects } from "@/hooks/use-workplace";
import staronDefault from "/images/staron_def.png";

const WorkspaceProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: projects, isLoading } = useGetWorkSpaceProjects(id);

  return (
    <div className="mt-6">
      {projects?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <ProjectCardSkeleton key={idx} />
              ))
            : projects?.map((project) => (
                <RunningProjectCard
                  image={project?.image_url || staronDefault}
                  key={project?.id}
                  name={project?.title || "Untitled Project"}
                  onCardClick={() => navigate(`/project/${project.id}`)}
                  updatedAt={project?.updated_at}
                />
              ))}
        </div>
      ) : (
        <div className="flex h-[calc(100vh-9rem)] items-center justify-center">
          <p className="text-center text-muted-foreground">
            No project added yet
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkspaceProjects;
