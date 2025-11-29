import PropTypes from "prop-types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import CentralLine from "@/components/landing/central-line";
import PrimaryButton from "../buttons/primary-button";

// Currency symbols kept local for flexibility and clarity.
const CURRENCY_SYMBOLS = { USD: "$", EUR: "€", GBP: "£" };

function ActivePlanCard({
  name,
  priceAmount,
  priceCurrency,
  pricePeriod,
  description,
  features = [],
  popular = false,
}) {
  const navigate = useNavigate();
  const symbol = CURRENCY_SYMBOLS[priceCurrency] ?? "";
  const priceText = `${symbol}${priceAmount}`;
  const containerClasses = `relative flex flex-col  gap-2 overflow-hidden rounded-3xl bg-[var(--price-card-bg)] p-4  shadow-[0.9px_-0.9px_31.2px_0px_#8482821A_inset] ${
    popular ? "border border-[var(--light-blue)]" : "border border-transparent"
  }`;
  const topLineBase = popular
    ? "bg-[var(--light-blue)]"
    : "bg-[var(--price-card-border)]";
  const glowShadow = popular
    ? "shadow-[0_10px_30px_10px_rgba(0,110,255,1)]"
    : "shadow-[0_10px_30px_10px_var(--price-card-border)]";

  return (
    <div className={containerClasses}>
      <div
        className={`absolute top-0 left-5 h-[6px] w-[100px] rounded-full ${topLineBase}`}
      >
        <div
          className={`-translate-x-1/2 absolute top-0 left-1/2 h-full w-[60%] rounded-full ${glowShadow}`}
        />
      </div>
      <div className="flex justify-end pb-6">
        <div className="flex items-center gap-2">
          {/* <PrimaryButton
            className="rounded-full border border-[var(--border)] bg-[var(--input)]"
            title="Cancel Subscription "
          /> */}
          <PrimaryButton
            className="rounded-full"
            onClick={() => navigate("/subscription-plans")}
            title="Upgrade Plan"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row lg:flex-row 2xl:gap-16">
        <div className="flex flex-col gap-3">
          <p className="text-[var(--text)] text-xs">{name}</p>
          <div className="flex items-end gap-1">
            <h2 className="font-semibold text-3xl text-[var(--text)]">
              {priceText}
            </h2>
            <p className="mb-2 text-[var(--text)] text-xs">{pricePeriod}</p>
          </div>
          <p className="mb-4 max-w-xs text-[var(--text)] text-xs">
            {description}
          </p>
        </div>

        <div className="hidden h-48 items-center justify-center md:flex">
          <CentralLine className="h-full" orientation="vertical" showRightDot />
        </div>

        <div className="block md:hidden">
          <CentralLine orientation="horizontal" showRightDot />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-[var(--text)]/70 text-xs">
            What’s Included
          </h1>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-2 pl-2 font-light text-[var(--text)] text-xs 2xl:grid-cols-2">
            {features.map((feature) => (
              <li className="list-inside list-disc" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ActivePlanCard.propTypes = {
  name: PropTypes.string.isRequired,
  priceAmount: PropTypes.number.isRequired,
  priceCurrency: PropTypes.string.isRequired,
  pricePeriod: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaLabel: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
  popular: PropTypes.bool,
};

// Memoized to avoid re-renders when props are unchanged.
const areEqual = (prev, next) => {
  if (
    prev.name !== next.name ||
    prev.priceAmount !== next.priceAmount ||
    prev.priceCurrency !== next.priceCurrency ||
    prev.pricePeriod !== next.pricePeriod ||
    prev.description !== next.description ||
    prev.ctaLabel !== next.ctaLabel ||
    prev.popular !== next.popular
  ) {
    return false;
  }
  const prevFeatures = prev.features ?? [];
  const nextFeatures = next.features ?? [];
  if (prevFeatures.length !== nextFeatures.length) {
    return false;
  }
  for (let i = 0; i < prevFeatures.length; i++) {
    if (prevFeatures[i] !== nextFeatures[i]) {
      return false;
    }
  }
  return true;
};

export default memo(ActivePlanCard, areEqual);
