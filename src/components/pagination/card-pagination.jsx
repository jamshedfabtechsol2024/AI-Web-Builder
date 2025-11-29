import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardPagination({
  page,
  totalCount,
  rowsPerPage = 10,
  onPageChange,
}) {
  // Calculate total pages dynamically
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

  const goPrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const goNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Previous Button */}
      <button
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-all duration-200",
          page === 1
            ? "cursor-not-allowed border-gray-600 text-gray-600"
            : "border-white text-white hover:bg-white hover:text-black"
        )}
        disabled={page === 1}
        onClick={goPrevious}
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Step Numbers */}
      <div className="flex items-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((step) => (
          <button
            className={cn(
              "cursor-pointer font-medium font-mono text-sm transition-all duration-200 hover:scale-105",
              step === page
                ? "text-green-400"
                : "text-gray-400 hover:text-white"
            )}
            key={step}
            onClick={() => onPageChange(step)}
            type="button"
          >
            {step.toString().padStart(2, "0")}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-all duration-200",
          page === totalPages
            ? "cursor-not-allowed border-gray-600 text-gray-600"
            : "border-white text-white hover:bg-white hover:text-black"
        )}
        disabled={page === totalPages}
        onClick={goNext}
        type="button"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
