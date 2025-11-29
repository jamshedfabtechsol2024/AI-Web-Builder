import PrimaryButton from "../buttons/primary-button";
import { ImageLoader } from "../ui/image-loader";
import { Rating, RatingButton } from "../ui/kibo-ui/rating";

const ProjectCard = ({ imageSrc, name, description, rating, onViewClick }) => {
  return (
    <div className="rounded-3xl border border-[var(--developer-card-border)] bg-[var(--developer-card-bg)] p-4">
      <div className="flex h-full w-full flex-col justify-between">
        {/* Developer Image */}
        <div className="h-60 w-full">
          <ImageLoader
            alt={name}
            className="h-full w-full rounded-lg object-contain"
            height="100%"
            layout="contain"
            loaderColor="#1A1F2B"
            src={imageSrc}
            width="100%"
          />
        </div>

        {/* Developer Info */}
        <div className="flex items-center justify-between rounded px-1 py-2 sm:px-2 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2">
              <span className="font-medium text-white text-xs leading-[1.4] sm:text-sm">
                Project:
              </span>
              <span className="font-normal text-[var(--light-white)] text-xs leading-[1.4] sm:text-xs">
                {name}
              </span>
            </span>
          </div>
        </div>

        {/* Description */}
        <span className="relative z-20 line-clamp-3 px-1 pb-2 font-normal text-[var(--light-white)] text-xs leading-[1.6] sm:px-2 sm:pb-3 sm:text-xs md:line-clamp-8">
          {description}
        </span>

        {/* Rating */}
        {rating && (
          <div className="mt-2 flex flex-col gap-2 px-1 sm:px-2">
            <h1 className="text-[#969595] text-sm">
              Clients Review & Feedback:
            </h1>
            <div className="flex items-center gap-1">
              <Rating defaultValue={Math.round(rating)} readOnly>
                {Array.from({ length: 5 }).map((_, i) => (
                  <RatingButton
                    className="text-yellow-400"
                    key={rating || i}
                    size={12}
                  />
                ))}
              </Rating>
              <p className="text-[var(--light-white)] text-xs">
                {rating || "0"}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {onViewClick && (
          <div className="mt-4 flex flex-wrap gap-2">
            <PrimaryButton
              className="w-full rounded-full px-6 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
              onClick={onViewClick}
              title="View"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
