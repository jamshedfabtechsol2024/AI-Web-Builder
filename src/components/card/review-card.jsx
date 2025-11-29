import { Rating, RatingButton } from "../ui/kibo-ui/rating";

const ReviewCard = ({ title, rating, description, earnings, days }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/6 p-4">
      {/* Header with title + rating */}
      <div className="flex items-center justify-between gap-6">
        <h1 className="font-medium text-[var(--light-blue)] text-sm">
          {title}
        </h1>

        <div className="flex items-center gap-1">
          <Rating defaultValue={Math.round(rating)} readOnly>
            {Array.from({ length: 5 }).map((_, i) => (
              <RatingButton
                className="text-yellow-400"
                key={`star-${title.replace(/\s+/g, "-")}-${i}`}
                size={12}
              />
            ))}
          </Rating>
          <p className="text-[var(--light-white)] text-xs">{rating}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[var(--light-white)] text-sm">{description}</p>

      {/* Footer */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-[var(--light-blue)] text-sm">
            Final Earnings:
          </h1>
          <p className="font-medium text-[var(--light-white)] text-sm">
            {earnings}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="font-medium text-[var(--light-blue)] text-sm">
            Spent Days:
          </h1>
          <p className="font-medium text-[var(--light-white)] text-sm">
            {days}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
