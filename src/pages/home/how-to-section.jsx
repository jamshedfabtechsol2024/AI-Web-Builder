import { memo } from "react";
import CentralHeading from "@/components/landing/central-heading";
import CentralLine from "@/components/landing/central-line";
import { ImageLoader } from "@/components/ui/image-loader";
import { STEPS_DATA } from "@/data/how-to-data";

// Centralized, easily adjustable configuration (keeps classNames inline)
const HOW_TO_CONFIG = {
  sectionId: "how-to",
  headingTitle: "How to use",
  heroTitle: "From idea to output in just simple steps.",
  ellipseSrc: "/svgs/ellipse-grad.svg", // decorative background
  codeImage: {
    lightSrc: "/svgs/code-image.svg",
    darkSrc: "/svgs/code-image-light.svg",
    alt: "AI code preview",
    height: "100%",
    width: "100%",
    loaderColor: "#1A1F2B",
  },
};

// Prevent unnecessary re-renders of list items
const StepItem = memo(({ stepData, isLast }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-8 px-8 md:flex-row">
      {/* Text Section */}
      <div className="flex flex-col gap-2 text-center md:text-left">
        <p className="text-[var(--text)] text-xs">Step {stepData.step}</p>
        <p className="font-bold text-[var(--text)] text-base sm:text-lg md:text-xl">
          {stepData.title}
        </p>
        <p className="max-w-md text-[var(--text)] text-sm sm:text-base">
          {stepData.description}
        </p>
        {/* Divider line between steps (hidden for last step) */}
        {!isLast && <CentralLine rightDotMobileOnly />}
      </div>
    </div>
  );
});

StepItem.displayName = "StepItem";

function HowToSection() {
  return (
    <section
      className="h-full w-full bg-[var(--background)] pb-16 sm:pb-24 md:pb-32"
      id={HOW_TO_CONFIG.sectionId}
    >
      <CentralHeading title={HOW_TO_CONFIG.headingTitle} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative flex w-full flex-col items-center justify-center py-12 sm:py-16 md:py-24">
          {/* Decorative ellipse background; hidden from assistive tech */}
          <img
            alt=""
            aria-hidden="true"
            className="absolute w-full max-w-4xl"
            loading="lazy"
            src={HOW_TO_CONFIG.ellipseSrc}
          />

          <h1 className="relative max-w-3xl text-center font-semibold text-[var(--text)] text-xl leading-tight sm:text-4xl md:text-5xl 2xl:text-6xl">
            {HOW_TO_CONFIG.heroTitle}
          </h1>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 px-4 sm:gap-8 sm:px-6 md:flex-row md:px-8">
          {/* Image Section */}
          <div className="h-40 w-full max-w-md overflow-hidden rounded-lg border-2 border-[var(--border)] sm:h-48 sm:rounded-xl sm:border-4 md:h-64 2xl:h-95 2xl:max-w-2xl">
            <ImageLoader
              alt={HOW_TO_CONFIG.codeImage.alt}
              className="h-full w-full object-cover"
              height={HOW_TO_CONFIG.codeImage.height}
              loaderColor={HOW_TO_CONFIG.codeImage.loaderColor}
              src={HOW_TO_CONFIG.codeImage.lightSrc}
              width={HOW_TO_CONFIG.codeImage.width}
            />
            {/* <ImageLoader
              alt={HOW_TO_CONFIG.codeImage.alt}
              className="block light:block h-full w-full object-cover"
              height={HOW_TO_CONFIG.codeImage.height}
              // loaderColor={HOW_TO_CONFIG.codeImage.loaderColor}
              src={HOW_TO_CONFIG.codeImage.darkSrc}
              width={HOW_TO_CONFIG.codeImage.width}
            /> */}
          </div>

          <div className="flex flex-col gap-4">
            {STEPS_DATA.map((stepData, index) => {
              const isLast = index === STEPS_DATA.length - 1;
              return (
                <StepItem
                  isLast={isLast}
                  key={stepData.step}
                  stepData={stepData}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

HowToSection.displayName = "HowToSection";

export default memo(HowToSection);
