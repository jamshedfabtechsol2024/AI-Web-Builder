import { ALL_PRICE_CARD_DATA } from "@/data/price-card-data";

export function getPlanCredits(slug) {
  const plan = ALL_PRICE_CARD_DATA.find((p) => p.id === slug);
  if (!plan) return { totalDaily: 0, totalMonthly: 0 };

  let totalDaily = 0;
  let totalMonthly = 0;

  plan.features.forEach((feature) => {
    const match = feature.match(/Message Credits:\s*(\d+|Unlimited)/i);
    if (match) {
      if (match[1].toLowerCase() === "unlimited") {
        totalDaily = Number.MAX_SAFE_INTEGER;
        totalMonthly = Number.MAX_SAFE_INTEGER;
      } else {
        const daily = parseInt(match[1], 10);
        totalDaily = daily;
        totalMonthly = daily * 30; // approximate month
      }
    }
  });

  return { totalDaily, totalMonthly };
}
