import { memo, useMemo } from "react";
import CentralHeading from "@/components/landing/central-heading";
import PriceCard from "@/components/landing/price-card";
import { PRICE_CARD_DATA } from "@/data/price-card-data";
import { useStartPlanMutation } from "@/hooks/use-pricing-plan";
import { toast } from "sonner";
import { useAuthStore } from "@/store/use-auth-store";
import { useNavigate } from "react-router-dom";

function PlansSection() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { mutate: startPlan, isPending } = useStartPlanMutation();
  return (
    <section className="h-full w-full bg-[var(--background)]" id="plans">
      <CentralHeading title="PLANS FOR EVERY CREATOR" />
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICE_CARD_DATA.map((plan) => (
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
                if (user?.role === "user") {
                  startPlan({ plan: selectedId });
                } else if (!user) {
                  navigate("/auth/login");
                } else {
                  toast.error("Please login as user to start a plan.");
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(PlansSection);
