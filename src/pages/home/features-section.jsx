import { memo } from "react";
import CentralHeading from "@/components/landing/central-heading";
import { FEATURE_CARD_DATA } from "@/data/feature-data";

// Centralized config keeps hardcoded values out of JSX
const FEATURE_SECTION_CONFIG = {
  sectionId: "features",
  headingTitle: "Features",
};

// Memoized to avoid unnecessary re-renders of individual cards
const FeatureCard = memo(({ icon, description }) => {
  return (
    <li className="flex flex-col items-center justify-center gap-6">
      {/* Icon is decorative; description conveys the meaning */}
      <div
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center border-2 border-[var(--light-blue)] p-6 shadow-[0_0_15px_5px_rgba(0,145,255,0.3)]"
      >
        {icon}
      </div>
      <p className="w-50 text-center font-light text-sm">{description}</p>
    </li>
  );
});

FeatureCard.displayName = "FeatureCard";

function FeaturesSection() {
  return (
    <section
      className="h-full w-full bg-[var(--background)]"
      id={FEATURE_SECTION_CONFIG.sectionId}
    >
      <CentralHeading title={FEATURE_SECTION_CONFIG.headingTitle} />

      <div className="flex w-full items-center justify-center gap-4 py-16">
        <ul className="grid grid-cols-1 gap-40 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARD_DATA.map(({ id, icon, description }) => (
            <FeatureCard description={description} icon={icon} key={id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(FeaturesSection);
