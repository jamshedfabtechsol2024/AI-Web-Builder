import PropTypes from "prop-types";
import { memo } from "react";
import CentralLine from "@/components/landing/central-line";
import GradientBorderButton from "../buttons/gradient-border-button";

// Currency symbols kept local for flexibility and clarity.
const CURRENCY_SYMBOLS = { USD: "$", EUR: "€", GBP: "£" };

function PriceCard({
  id,
  name,
  priceAmount,
  priceCurrency,
  pricePeriod,
  description,
  ctaLabel,
  features = [],
  popular = false,
  disabled = false,
  onClick,
}) {
  const symbol = CURRENCY_SYMBOLS[priceCurrency] ?? "";
  const priceText =
    priceAmount != null ? `${symbol}${priceAmount}` : "Custom Plan";

  const containerClasses = `relative flex flex-col gap-2 overflow-hidden rounded-3xl bg-[var(--price-card-bg)] p-4 py-12 shadow-[0.9px_-0.9px_31.2px_0px_#8482821A_inset] ${
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

      <p className="text-[var(--text)] text-xs">{name}</p>
      <div className="flex items-end gap-1">
        <h2 className="font-semibold text-3xl text-[var(--text)]">
          {priceText}
        </h2>
        <p className="mb-2 text-[var(--text)] text-xs">{pricePeriod}</p>
      </div>
      <p className="mb-4 text-[11px] text-[var(--text)]">{description}</p>

      <GradientBorderButton
        title={ctaLabel}
        disabled={disabled}
        onClick={() => onClick?.(id)}
      />

      <CentralLine showRightDot />
      <h1 className="font-semibold text-[var(--text)]/70 text-xs">
        What’s Included
      </h1>
      <ul className="list-inside list-disc space-y-1 pl-2">
        {features.map((feature) => (
          <li className="font-light text-[var(--text)] text-xs" key={feature}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

PriceCard.propTypes = {
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
    prev.id !== next.id ||
    prev.name !== next.name ||
    prev.priceAmount !== next.priceAmount ||
    prev.priceCurrency !== next.priceCurrency ||
    prev.pricePeriod !== next.pricePeriod ||
    prev.description !== next.description ||
    prev.ctaLabel !== next.ctaLabel ||
    prev.popular !== next.popular ||
    prev.disabled !== next.disabled ||
    prev.onClick !== next.onClick
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

export default memo(PriceCard, areEqual);
