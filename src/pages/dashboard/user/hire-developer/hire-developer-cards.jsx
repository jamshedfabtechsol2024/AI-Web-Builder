import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeveloperCard from "@/components/landing/developer-card";
import CardPagination from "@/components/pagination/card-pagination";
import DeveloperCardSkeleton from "@/components/skeletons/developer-card-skeleton";
import { Input } from "@/components/ui/input";
import { usePagination } from "@/hooks/use-pagination";
import { useGetAllDevelopersList } from "@/hooks/use-user-management";
import { useDebounceSearch } from "@/hooks/use-debounce-search";

const HireDeveloperCards = () => {
  const navigate = useNavigate();
  const { value, debouncedValue, setValue } = useDebounceSearch("");
  const { page, handlePageChange } = usePagination(1);
  const { data: developers, isLoading } = useGetAllDevelopersList({
    page,
    page_size: 12,
    search: debouncedValue,
  });

  const handleHire = (id) => {
    navigate(`/hire-developer/${id}`);
  };

  const handleView = (id) => {
    navigate(`/hire-developer/${id}`);
  };

  return (
    <div>
      <div className="p-6">
        <div className="relative w-full max-w-sm">
          {/* Icon */}
          <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 h-5 w-5 text-gray-300" />

          {/* Input */}
          <Input
            className="rounded-full border border-white/20 bg-white/10 pl-10 text-white backdrop-blur-md placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search Here"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <DeveloperCardSkeleton key={idx} />
          ))
        ) : developers?.results?.length === 0 ? (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-300">No developers found</p>
            </div>
          </div>
        ) : (
          developers?.results?.map((dev) => (
            <DeveloperCard
              avatarSrc={dev?.profile_image}
              description={dev?.bio}
              imageSrc={dev?.cover_image}
              key={dev?.id}
              name={dev?.full_name}
              onHireClick={() => handleHire(dev.id)}
              onViewClick={() => handleView(dev.id)}
              role={dev?.title}
            />
          ))
        )}
      </div>
      {!isLoading && developers?.results?.length > 0 && (
        <div className="mt-4 flex items-center justify-end px-6">
          <CardPagination
            onPageChange={handlePageChange}
            page={page}
            rowsPerPage={12}
            totalCount={developers?.count}
          />
        </div>
      )}
    </div>
  );
};

export default HireDeveloperCards;
