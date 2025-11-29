import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReviewCard from "../card/review-card";
import { useGetReviewDetails } from "@/hooks/use-thread";
import ReviewCardSkeleton from "../skeletons/review-card-skeleton";

const ReviewDetailModal = ({ open, onOpenChange, reviewId }) => {
  const { data: reviewDetails, isLoading: isReviewDetailsLoading } =
    useGetReviewDetails(reviewId);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mt-4">
              <p className=" font-semibold text-sm">Review by:</p>
              <p className="text-[var(--light-white)] text-sm">
                {reviewDetails?.view_review?.client_name}
              </p>
            </div>
            {isReviewDetailsLoading ? (
              <ReviewCardSkeleton />
            ) : (
              <ReviewCard
                title={reviewDetails?.view_review?.project_name}
                rating={reviewDetails?.view_review?.rating}
                description={reviewDetails?.view_review?.comment}
                earnings={reviewDetails?.view_review?.final_earning}
                days={reviewDetails?.view_review?.total_spent_days || 0}
              />
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailModal;
