import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import ProjectCard from "@/components/card/project-card";
import CardPagination from "@/components/pagination/card-pagination";
import PortProjectCardSkeleton from "@/components/skeletons/port-project-card-skeleton";
import PortfolioProfileSkeleton from "@/components/skeletons/portfolio-profile-skeleton";
import ReviewCardSkeleton from "@/components/skeletons/review-card-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageLoader } from "@/components/ui/image-loader";
import { Rating, RatingButton } from "@/components/ui/kibo-ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWebSocketContext } from "@/contexts/websocket-context";
import { usePagination } from "@/hooks/use-pagination";
import { useGetDeveloperDetails } from "@/hooks/use-user-management";
import { useWebSocketStore } from "@/store/use-websocket-store";
import dummyImg from "/images/default-image.jpg";
import ReviewCard from "@/components/card/review-card";

const REVIEW_DATA = [
  {
    title: "Frontend Development for the website application",
    rating: 4.8,
    description:
      "Creative frontend developer focused on pixel-perfect UI and performance-driven React applications. Experienced with modern frameworks, responsive design, and rapid prototyping.",
    earnings: "$2,330",
    days: 14,
  },
  {
    title: "Backend API Development",
    rating: 5,
    description:
      "Excellent backend skills with Node.js and Express. Delivered APIs on time with great documentation and scalability.",
    earnings: "$3,800",
    days: 21,
  },
  {
    title: "UI/UX Redesign Project",
    rating: 4.5,
    description:
      "Strong eye for design and detail. Improved user flows and created engaging interfaces. Great communication throughout the project.",
    earnings: "$1,500",
    days: 10,
  },
];

const PROJECTS_DATA = [
  {
    id: 1,
    imageSrc: "/images/dev-port.png",
    name: "E-Commerce Website",
    description:
      "Developed a scalable e-commerce platform with integrated payment gateway, shopping cart, and order management system.",
    status: "completed",
    rating: 4.8,
  },
  {
    id: 2,
    imageSrc: "/images/dev-port.png",
    name: "SaaS Dashboard",
    description:
      "Built a responsive analytics dashboard with real-time data visualization and user management features.",
    status: "in-progress",
    rating: 4.2,
  },
  {
    id: 3,
    imageSrc: "/images/dev-port.png",
    name: "Mobile App UI",
    description:
      "Designed and implemented cross-platform mobile app UI with smooth navigation and pixel-perfect components.",
    status: "completed",
    rating: 5,
  },
];

const DeveloperDetails = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const ws = useWebSocketContext();
  const loadingActions = useWebSocketStore((s) => s.loadingActions);
  const isDeveloper = location.pathname.startsWith("/developer");
  const isHire = location.pathname.startsWith("/hire-developer");
  const { page, rowsPerPage, handlePageChange } = usePagination(1);
  const waitingForInitResponse = useRef(false);

  const { data, isLoading } = useGetDeveloperDetails(id);

  // Listen for WebSocket init response
  useEffect(() => {
    if (
      ws?.lastMessage?.type === "init" &&
      ws?.lastMessage?.thread_id &&
      waitingForInitResponse.current
    ) {
      const threadId = ws.lastMessage.thread_id;
      navigate(`/messages?thread=${threadId}`);
      waitingForInitResponse.current = false;
    }
  }, [ws?.lastMessage, navigate]);

  const handleHireDeveloper = () => {
    // Send WebSocket message
    ws?.sendRaw({ type: "init", developer_id: data?.user_id });
    // Set flag to wait for response
    waitingForInitResponse.current = true;
  };

  const grouped = {
    completed: PROJECTS_DATA.filter((p) => p.status === "completed"),
    "in-progress": PROJECTS_DATA.filter((p) => p.status === "in-progress"),
  };

  const renderProjects = (list) =>
    list.length ? (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <PortProjectCardSkeleton key={idx} />
            ))
          : list.map((p) => <ProjectCard key={p.id} {...p} />)}
      </div>
    ) : (
      <p className="py-6 text-center text-[var(--light-white)] text-sm">
        No projects available 🚀
      </p>
    );

  const handleViewClick = () => {
    // console.log(`Viewing project: ${name}`);
    // you can open modal, route, etc.
  };

  return (
    <div className="flex flex-col justify-center gap-6">
      {/* Profile Card */}

      {isLoading ? (
        <PortfolioProfileSkeleton />
      ) : (
        <Card className="!p-0 w-full overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
          {/* Cover with relative wrapper */}
          <div className="relative">
            {/* Cover photo */}
            <ImageLoader
              alt="Cover Photo"
              className="w-full object-cover"
              height={160}
              src={data?.cover_image || dummyImg}
              width={"100%"}
            />

            {/* Profile photo overlapping bottom-left */}
            <div className="-bottom-12 absolute left-6">
              <ImageLoader
                alt="Profile Photo"
                className="h-24 w-24 rounded-full border-4 border-[#FFFFFF0F] object-cover shadow-md"
                height={96}
                src={data?.profile_image || dummyImg}
                width={96}
              />
            </div>

            {isDeveloper && (
              <div className="-bottom-6 absolute right-6">
                <PrimaryButton
                  className="rounded-full px-6 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
                  title="Edit Profile"
                />
              </div>
            )}
            {isHire && (
              <div className="-bottom-6 absolute right-6">
                <PrimaryButton
                  className="min-w-32 rounded-full px-6 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
                  loading={Boolean(loadingActions.init)}
                  onClick={handleHireDeveloper}
                  title="Hire Developer"
                />
              </div>
            )}
          </div>

          {/* Content (pushed down so profile fits) */}
          <div className="flex flex-col gap-6 px-6 pt-10 pb-6">
            <div>
              <h1 className="font-medium text-lg 2xl:text-xl">
                {data?.first_name} {data?.last_name}
              </h1>
              <p className="text-sm text-white">{data?.title}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#969595] text-lg">Bio: </p>
              <p className="text-sm">{data?.bio}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#969595] text-lg">Experience: </p>
              <p className="text-sm">{data?.experience}</p>
            </div>
          </div>
        </Card>
      )}

      {/* TECH STACK Card */}
      <Card className="!py-4 w-full gap-2 overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F] px-6">
        <h1 className="text-[#969595] text-lg">Tech Stack:</h1>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton className="h-8 w-20 rounded-full bg-white/10" key={i} />
            ))
          ) : data?.skills?.length > 0 ? (
            data?.skills?.map((stack, index) => (
              <Badge
                className="!my-0 !py-2 rounded-full border border-white/30 bg-black px-4"
                key={stack || index}
              >
                {stack}
              </Badge>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No tech stack added</p>
          )}
        </div>
      </Card>

      {/* Projects */}
      {!isHire && (
        <Card className="!p-6 w-full overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
          <div className="flex flex-col gap-6">
            <h1 className="text-[#969595] text-lg">Projects:</h1>

            <Tabs className="w-full" defaultValue="completed">
              {/* Tab Headers */}
              <TabsList className="!border-b flex w-full rounded-none border-white/10">
                {["completed", "in-progress"].map((status) => (
                  <TabsTrigger
                    className="!border-b-2 flex-1 cursor-pointer rounded-none border-transparent px-4 py-2 text-center font-medium text-sm data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
                    key={status}
                    value={status}
                  >
                    {status === "completed"
                      ? `Completed (${grouped[status].length})`
                      : `In Progress (${grouped[status].length})`}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="completed">
                {renderProjects(grouped.completed)}
              </TabsContent>
              <TabsContent value="in-progress">
                {renderProjects(grouped["in-progress"])}
              </TabsContent>
            </Tabs>
            <div>
              <CardPagination
                onPageChange={handlePageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={4}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Portfolio */}
      <Card className="!p-6 w-full overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
        <div className="flex flex-col gap-6">
          <h1 className="text-[#969595] text-lg">Portfolio:</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              <PortProjectCardSkeleton />
            ) : data?.portfolio?.length === 0 ? (
              <p className="text-gray-400 text-sm">No portfolio added</p>
            ) : (
              data?.portfolio?.map((project, idx) => (
                <ProjectCard
                  description={project.description}
                  imageSrc={project.image || dummyImg}
                  key={project.id || idx}
                  name={project.projectName}
                  onViewClick={() => handleViewClick(project.projectName)}
                />
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Clients Review & Feedback */}
      <Card className="!p-6 w-full overflow-hidden border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#969595] text-lg">Clients Review & Feedback:</h1>
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ReviewCardSkeleton key={idx} />
              ))
            : REVIEW_DATA.map((review, index) => (
                <ReviewCard
                  key={review.title || index}
                  title={review.title}
                  rating={review.rating}
                  description={review.description}
                  earnings={review.earnings}
                  days={review.days}
                />
              ))}

          <div>
            <CardPagination
              onPageChange={handlePageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={4}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DeveloperDetails;
