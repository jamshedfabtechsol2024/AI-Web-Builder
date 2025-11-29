import dummyImg from "/images/default-image.jpg";
import GradientBorderButton from "../buttons/gradient-border-button";
import PrimaryButton from "../buttons/primary-button";
import { ImageLoader } from "../ui/image-loader";

const DeveloperCard = ({
  imageSrc,
  avatarSrc,
  name,
  role,
  description,
  onHireClick,
  onViewClick,
}) => {
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
            src={imageSrc || dummyImg}
            width="100%"
          />
        </div>

        {/* Developer Info */}
        <div className="flex items-center justify-between rounded px-1 py-2 sm:px-2 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12">
              <img
                alt={name}
                className="h-full w-full object-cover"
                src={avatarSrc || dummyImg}
              />
            </div>
            <span className="flex flex-col">
              <span className="font-normal text-white text-xs leading-[1.4] sm:text-sm">
                {name}
              </span>
              <span className="font-normal text-[var(--light-white)] text-xs leading-[1.4] sm:text-sm">
                {role}
              </span>
            </span>
          </div>
        </div>

        {/* Description */}
        <span className="relative z-20 line-clamp-3 px-1 pb-2 font-normal text-[var(--light-white)] text-xs leading-[1.6] sm:px-2 sm:pb-3 sm:text-sm md:line-clamp-8">
          {description}
        </span>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <PrimaryButton
            className="min-w-[140px] flex-1 rounded-full px-6 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
            onClick={onHireClick}
            title="Hire a Developer"
          />
          <GradientBorderButton
            className="min-w-[120px] flex-1"
            onClick={onViewClick}
            title="View Detail"
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
