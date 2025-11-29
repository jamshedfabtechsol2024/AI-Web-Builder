import { memo } from "react";
import CentralHeading from "@/components/landing/central-heading";
import { ImageLoader } from "@/components/ui/image-loader";

// Centralized config for easy updates without touching JSX structure
const ABOUT_CONFIG = {
  sectionId: "about-us",
  headingTitle: "About Us",
  image: {
    lightSrc: "/svgs/about-image.svg",
    darkSrc: "/svgs/about-image-light.svg",
    alt: "About AI STAR Platform",
    width: "100%",
    height: "100%",
    loaderColor: "#1A1F2B",
    objectFit: "cover",
  },
};

function AboutUsSection() {
  return (
    <section
      className={"h-full w-full bg-[var(--background)]"}
      id={ABOUT_CONFIG.sectionId}
    >
      <CentralHeading showBorders={false} title={ABOUT_CONFIG.headingTitle} />
      <div className="container mx-auto h-full w-full px-4 pb-8 sm:pb-12 md:pb-16">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          <p className="max-w-2xl px-4 text-center text-[var(--text)] text-sm sm:text-base md:max-w-4xl md:text-lg">
            Staron AI is a next-gen platform that blends visual design, AI
            intelligence, and developer collaboration to help you build web
            apps—fast. Our smart builder lets you design interfaces, Write clean
            Code, sync with GitHub, and get backend support when needed — all in
            one place.
          </p>

          <div className="relative w-full max-w-4xl px-2 sm:max-w-5xl sm:px-4 2xl:max-w-7xl">
            {/* Glow line instead of circle */}
            <div
              aria-hidden="true"
              className="-translate-x-1/2 absolute top-0 left-1/2 h-48 w-[60%] bg-gradient-to-b from-[var(--blue)]/80 via-[var(--blue)]/50 to-transparent shadow-[0_0_100px_40px_rgba(36,2,142,0.5)] blur-[60px]"
            />

            <div className="lg:h- h-50 w-full overflow-hidden rounded-lg border-2 border-[var(--border)] sm:h-100 sm:rounded-xl sm:border-4 2xl:h-[700px]">
              <ImageLoader
                alt={ABOUT_CONFIG.image.alt}
                className="h-auto w-full object-cover"
                height={ABOUT_CONFIG.image.height}
                loaderColor={ABOUT_CONFIG.image.loaderColor}
                objectFit={ABOUT_CONFIG.image.objectFit}
                src={ABOUT_CONFIG.image.lightSrc}
                width={ABOUT_CONFIG.image.width}
              />
              {/* <ImageLoader
                alt={ABOUT_CONFIG.image.alt}
                className="hidden h-auto w-full object-cover dark:block"
                height={ABOUT_CONFIG.image.height}
                loaderColor={ABOUT_CONFIG.image.loaderColor}
                objectFit={ABOUT_CONFIG.image.objectFit}
                src={ABOUT_CONFIG.image.darkSrc}
                width={ABOUT_CONFIG.image.width}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutUsSection);
