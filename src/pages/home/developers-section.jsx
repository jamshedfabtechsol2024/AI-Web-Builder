import CentralHeading from "@/components/landing/central-heading";
import DeveloperCard from "@/components/landing/developer-card";
import CardPagination from "@/components/pagination/card-pagination";
import DeveloperCardSkeleton from "@/components/skeletons/developer-card-skeleton";
import { usePagination } from "@/hooks/use-pagination";
import { useGetAllDevelopersList } from "@/hooks/use-user-management";
import { useAuthStore } from "@/store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DevelopersSection() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { page, handlePageChange, rowsPerPage } = usePagination(1);
  const { data: developers, isLoading } = useGetAllDevelopersList({
    page,
    page_size: rowsPerPage,
  });

  const handleHire = (id) => {
    if (user?.role !== "user") {
      toast.error("Please log in as a user to continue.");
      return;
    }
    navigate(`/hire-developer/${id}`);
  };

  const handleView = (id) => {
    if (user?.role !== "user") {
      toast.error("Please log in as a user to continue.");
      return;
    }
    navigate(`/hire-developer/${id}`);
  };

  return (
    <section className="h-full w-full bg-[var(--background)]" id="developers">
      <CentralHeading title="Developers" />

      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-12">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <DeveloperCardSkeleton key={idx} />
            ))}
          </div>
        ) : developers?.results?.length !== 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <p className="text-gray-300 text-lg sm:text-xl font-medium">
              No developers found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
              {developers?.results?.map((dev) => (
                <DeveloperCard
                  key={dev?.id}
                  avatarSrc={dev?.profile_image}
                  description={dev?.bio}
                  imageSrc={dev?.cover_image}
                  name={dev?.full_name}
                  role={dev?.title}
                  onHireClick={() => handleHire(dev.id)}
                  onViewClick={() => handleView(dev.id)}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end px-6">
              <CardPagination
                onPageChange={handlePageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                totalCount={developers?.count}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default DevelopersSection;
