import { useMemo } from "react";
import ActivePlanCard from "@/components/card/active-plan-card";
import CentralizedTable from "@/components/tables/centeral-table";
import { ALL_PRICE_CARD_DATA, PRICE_CARD_DATA } from "@/data/price-card-data";
import { usePagination } from "@/hooks/use-pagination";
import { useGetPlansHistoryQuery } from "@/hooks/use-pricing-plan";
import CreditsCard from "@/components/card/credits-card";
import { getPlanCredits } from "@/utils/get-plan-credits";
import CreditsCardSkeleton from "@/components/skeletons/credits-card-skeleton";
import ActivePlanCardSkeleton from "@/components/skeletons/active-plan-card-skeleton";

const TABLE_HEADINGS = {
  planName: "Plan Name",
  current_period_start: "Subs Date",
  current_period_end: "Expiry Date",
  amount: "Amount",
  status: "Status",
  paymentMethod: "Payment Method",
};

const SubscriptionSettings = () => {
  const { data, isLoading } = useGetPlansHistoryQuery();

  const currentPlan = ALL_PRICE_CARD_DATA.find(
    (plan) => plan.id === data?.current_subscription?.plan__slug
  );

  const getStatusDisplay = (value) => {
    if (value === "active" || value === "Active") {
      return (
        <span className="rounded-full bg-[#22C55E1A] px-3 py-1 font-medium text-[#22C55E] text-sm">
          Active
        </span>
      );
    }
    if (value === "Expired" || value === "expired") {
      return (
        <span className="rounded-full bg-[#F43F5E1A] px-3 py-1 font-medium text-[#FF0606] text-sm">
          Expired
        </span>
      );
    }
    return (
      <span className="rounded-full bg-[#FACC151A] px-3 py-1 font-medium text-[#EAB308] text-sm">
        {value}
      </span>
    );
  };

  const nameColumn = useMemo(
    () => ({
      name: "planName",
      data: (_, data) => <div>{data?.plan_details?.name}</div>,
    }),
    []
  );

  const startDateColumn = useMemo(
    () => ({
      name: "current_period_start",
      data: (value) => (
        <div>
          {" "}
          {new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      ),
    }),
    []
  );
  const endDateColumn = useMemo(
    () => ({
      name: "current_period_end",
      data: (value) => (
        <div>
          {" "}
          {new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      ),
    }),
    []
  );

  const statusColumn = useMemo(
    () => ({
      name: "status",
      data: (value) => (
        <div className="flex items-center justify-center">
          {getStatusDisplay(value)}
        </div>
      ),
    }),
    []
  );

  const paymentMethodColumn = useMemo(
    () => ({
      name: "paymentMethod",
      data: () => <div className="capitalize">Stripe</div>,
    }),
    []
  );

  return (
    <div>
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Subscription Plan
      </h1>

      <div className="my-6">
        {isLoading ? (
          <CreditsCardSkeleton />
        ) : (
          <CreditsCard
            remainingMonthly={
              data?.current_subscription?.total_tokens_remaining || 0
            }
            remainingDaily={
              data?.current_subscription?.daily_tokens_available || 0
            }
          />
        )}
      </div>

      <div>
        {isLoading ? (
          <ActivePlanCardSkeleton />
        ) : (
          <ActivePlanCard
            ctaLabel={currentPlan?.cta?.label}
            description={currentPlan?.description}
            features={currentPlan?.features}
            key={currentPlan?.id}
            name={currentPlan?.name}
            popular={true}
            priceAmount={currentPlan?.price?.amount}
            priceCurrency={currentPlan?.price?.currency}
            pricePeriod={currentPlan?.price?.period}
          />
        )}
      </div>
      <div className="py-6">
        <div className="py-4">
          <h1 className="font-medium text-base">Subscription Plan History</h1>
        </div>
        <CentralizedTable
          customFields={[
            nameColumn,
            startDateColumn,
            endDateColumn,
            statusColumn,
            paymentMethodColumn,
          ]}
          headings={TABLE_HEADINGS}
          loading={isLoading}
          td={data?.subscriptions || []}
        />
      </div>
    </div>
  );
};

export default SubscriptionSettings;
