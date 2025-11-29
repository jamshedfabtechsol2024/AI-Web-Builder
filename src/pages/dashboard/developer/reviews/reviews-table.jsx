import { useMemo, useState } from "react";
import PrimaryButton from "@/components/buttons/primary-button";
import CentralizedTable from "@/components/tables/centeral-table";
import { Rating, RatingButton } from "@/components/ui/kibo-ui/rating";
import { usePagination } from "@/hooks/use-pagination";
import ReviewDetailModal from "@/components/modals/review-detail-modal";
import { useGetReviewList } from "@/hooks/use-thread";
import ReviewStats from "./review-stats";

const TABLE_HEADINGS = {
  rev_id: "Review ID",
  project_name: "Project Name",
  client_name: "Client Name",
  rating: "Rating",
  short_comment: "Feedback Summary",
  created_at: "Date Submission",
  action: "Action",
};

const ReviewsTable = () => {
  const [openReviewDetailModal, setOpenReviewDetailModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const { data: reviewList, isLoading: isReviewListLoading } = useGetReviewList(
    {
      page: page,
      pageSize: rowsPerPage,
    }
  );

  const reviewIdColumn = useMemo(
    () => ({
      name: "rev_id",
      data: (value) => <div>#{value}</div>,
    }),
    []
  );

  const paymentStatusColumn = useMemo(
    () => ({
      name: "paymentStatus",
      data: (value) => (
        <div className="flex items-center justify-center">
          {value ? (
            <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
              Paid
            </span>
          ) : (
            <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
              Unpaid
            </span>
          )}
        </div>
      ),
    }),
    []
  );

  const reviewColumn = useMemo(
    () => ({
      name: "rating",
      data: (value) => (
        <div className="flex items-center ">
          <Rating defaultValue={value} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton
                className="text-yellow-400"
                key={`star-${index + 1}`}
              />
            ))}
          </Rating>
        </div>
      ),
    }),
    []
  );

  const dateColumn = useMemo(
    () => ({
      name: "created_at",
      data: (value) => <div>{new Date(value).toISOString().split("T")[0]}</div>,
    }),
    []
  );

  const actionColumn = useMemo(
    () => ({
      name: "action",
      data: (_, data) => (
        <div className="flex items-center gap-3">
          <PrimaryButton
            className="bg-transparent text-[var(--light-blue)] hover:underline"
            title="View Details "
            onClick={() => {
              setOpenReviewDetailModal(true);
              setSelectedReviewId(data?.rev_id);
            }}
          />
        </div>
      ),
    }),
    []
  );

  return (
    <>
      {" "}
      <ReviewStats
        data={reviewList?.reviews_stats}
        isLoading={isReviewListLoading}
      />
      <div className="py-6">
        <CentralizedTable
          customFields={[
            reviewIdColumn,
            paymentStatusColumn,
            reviewColumn,
            dateColumn,
            actionColumn,
          ]}
          headings={TABLE_HEADINGS}
          loading={isReviewListLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          td={reviewList?.results || []}
          totalItems={reviewList?.count || 0}
        />
        <ReviewDetailModal
          open={openReviewDetailModal}
          onOpenChange={setOpenReviewDetailModal}
          reviewId={selectedReviewId}
        />
      </div>
    </>
  );
};

export default ReviewsTable;
