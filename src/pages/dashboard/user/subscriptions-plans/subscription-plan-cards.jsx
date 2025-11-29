import { useMemo, useState } from "react";
import RotatingVideo from "@/components/auth/rotating-video";
import PriceCard from "@/components/landing/price-card";
import { ALL_PRICE_CARD_DATA } from "@/data/price-card-data";
import { useStartPlanMutation } from "@/hooks/use-pricing-plan";
import SupportModal from "@/components/modals/support-modal";

const SubscriptionPlanCards = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { mutate: startPlan, isPending } = useStartPlanMutation();
  return (
    <section className="relative min-h-screen w-full">
      {/* Fixed background video */}
      <div className="-z-10 fixed inset-0 h-screen w-screen overflow-hidden">
        <RotatingVideo src="/videos/globe-video.mp4" />
        <div className="absolute inset-0 bg-black/40" />
        {/* Glows */}
        <div className="-translate-y-[30%] absolute top-0 right-0 h-80 w-80 translate-x-[10%] rounded-full bg-gradient-to-br from-[#24028E]/80 via-[#24028E]/40 to-transparent shadow-[0_0_100px_50px_rgba(36,2,142,0.6)] blur-[50px]" />
        <div className="-translate-x-[30%] absolute bottom-0 left-0 h-52 w-52 translate-y-[30%] rounded-full bg-gradient-to-br from-[#24028E]/80 via-[#24028E]/40 to-transparent shadow-[0_0_100px_50px_rgba(36,2,142,0.6)] blur-[50px]" />
      </div>

      {/* Foreground content */}
      <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 lg:px-12">
        <div className="mb-12 flex flex-col gap-2">
          <h1 className="text-center font-bold text-3xl text-[var(--light-white)] sm:text-4xl lg:text-5xl">
            Subscription Plans
          </h1>
          <p className="text-center text-[var(--light-white)] text-sm">
            Flexible pricing options designed to grow with you.
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 px-6 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
          {ALL_PRICE_CARD_DATA.map((plan) => (
            <PriceCard
              id={plan?.id}
              ctaLabel={plan.cta.label}
              description={plan.description}
              features={plan.features}
              key={plan.id}
              name={plan.name}
              popular={plan.popular}
              priceAmount={plan.price.amount}
              priceCurrency={plan.price.currency}
              pricePeriod={plan.price.period}
              disabled={isPending}
              onClick={(selectedId) => {
                if (selectedId === "enterprise") {
                  setShowSupportModal(true);
                } else {
                  startPlan({ plan: selectedId });
                }
              }}
            />
          ))}
        </div>

        {/* Support Modal */}
        <SupportModal
          onOpenChange={() => setShowSupportModal(false)}
          open={showSupportModal}
        />
      </div>
    </section>
  );
};

export default SubscriptionPlanCards;
