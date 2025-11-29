// Static plan data; colocated for simplicity and easy future edits.
export const PRICE_CARD_DATA = [
  {
    id: "free",
    name: "Free Plan",
    popular: false,
    price: {
      amount: 0,
      currency: "USD",
      period: "per month",
    },
    description:
      "A simple start for exploring features and testing ideas without cost.",
    cta: {
      label: "Start Free Trial",
      action: "start_free_trial_free",
    },
    features: [
      "Message Credits: 5/day",
      "Integration Credits: 200",
      "GitHub Sync: Read only",
    ],
  },
  {
    id: "starter",
    name: "Starter Plan",
    popular: true,
    price: {
      amount: 29,
      currency: "USD",
      period: "per month",
    },
    description:
      "Ideal for individuals and small teams beginning their development journey.",
    cta: {
      label: "Start Plan",
      action: "start_free_trial_starter",
    },
    features: [
      "Message Credits: 100/day",
      "Integration Credits: 1000",
      "Consultation Hours: 2",
      "Live Dev Chat Box: 1/month",
      "Backend Dev Support: 1/month",
      "Backend Dev Takeover: 1/month",
      "GitHub Sync: Auto Sync",
    ],
  },
  {
    id: "builder",
    name: "Builder Plan",
    popular: false,
    price: {
      amount: 49,
      currency: "USD",
      period: "per month",
    },
    description:
      "Designed for growing teams needing advanced tools and collaboration.",
    cta: {
      label: "Start Plan",
      action: "start_free_trial_builder",
    },
    features: [
      "Message Credits: 250/day",
      "Integration Credits: 2000",
      "Consultation Hours: 5",
      "Live Dev Chat Box: 2/month",
      "Backend Dev Support: 2/month",
      "Backend Dev Takeover: 1/month",
      "Custom Domains",
      "GitHub Sync: Auto Sync",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    popular: false,
    price: {
      amount: 149,
      currency: "USD",
      period: "per month",
    },
    description:
      "Best for professionals and businesses requiring higher limits and premium support.",
    cta: {
      label: "Start Plan",
      action: "start_free_trial_professional",
    },
    features: [
      "Message Credits: 500/day",
      "Integration Credits: 10,000",
      "Consultation Hours: 10",
      "Live Dev Chat Box: 5/month",
      "Backend Dev Support: +5/month",
      "Backend Dev Takeover: 1/month",
      "Custom Domains",
      "GitHub Sync: Full Branch Support",
    ],
  },
];

export const ALL_PRICE_CARD_DATA = [
  {
    id: "free",
    name: "Free Plan",
    popular: false,
    price: {
      amount: 0,
      currency: "USD",
      period: "per month",
    },
    description:
      "A simple start for exploring features and testing ideas without cost.",
    cta: {
      label: "Start Free Trial",
      action: "start_free_trial_free",
    },
    features: [
      "Message Credits: 5/day",
      "Integration Credits: 200",
      "GitHub Sync: Read only",
    ],
  },
  {
    id: "starter",
    name: "Starter Plan",
    popular: true,
    price: {
      amount: 29,
      currency: "USD",
      period: "per month",
    },
    description:
      "Ideal for individuals and small teams beginning their development journey.",
    cta: {
      label: "Start Free Trial",
      action: "start_free_trial_starter",
    },
    features: [
      "Message Credits: 100/day",
      "Integration Credits: 1000",
      "Consultation Hours: 2",
      "Live Dev Chat Box: 1/month",
      "Backend Dev Support: 1/month",
      "Backend Dev Takeover: 1/month",
      "GitHub Sync: Auto Sync",
    ],
  },
  {
    id: "builder",
    name: "Builder Plan",
    popular: false,
    price: {
      amount: 49,
      currency: "USD",
      period: "per month",
    },
    description:
      "Designed for growing teams needing advanced tools and collaboration.",
    cta: {
      label: "Start Free Trial",
      action: "start_free_trial_builder",
    },
    features: [
      "Message Credits: 250/day",
      "Integration Credits: 2000",
      "Consultation Hours: 5",
      "Live Dev Chat Box: 2/month",
      "Backend Dev Support: 2/month",
      "Backend Dev Takeover: 1/month",
      "Custom Domains",
      "GitHub Sync: Auto Sync",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    popular: false,
    price: {
      amount: 149,
      currency: "USD",
      period: "per month",
    },
    description:
      "Best for professionals and businesses requiring higher limits and premium support.",
    cta: {
      label: "Start Free Trial",
      action: "start_free_trial_professional",
    },
    features: [
      "Message Credits: 500/day",
      "Integration Credits: 10,000",
      "Consultation Hours: 10",
      "Live Dev Chat Box: 5/month",
      "Backend Dev Support: +5/month",
      "Backend Dev Takeover: 1/month",
      "Custom Domains",
      "GitHub Sync: Full Branch Support",
    ],
  },
  {
    id: "enterprise",
    name: "Custom Plan",
    popular: false,
    price: {
      amount: null, // No fixed price, handled via contact
      currency: "USD",
      period: null,
    },
    description:
      "Tailored solutions for large-scale projects with unlimited flexibility.",
    cta: {
      label: "Contact Us",
      action: "contact_us_enterprise",
    },
    features: [
      "Message Credits: Unlimited",
      "Integration Credits: Unlimited",
      "Consultation Hours: 10+",
      "Live Dev Chat Box: Unlimited",
      "Backend Dev Takeover: Fully Managed",
      "Backend Dev Takeover: 5/month + Project Quote",
      "Custom Domains",
      "GitHub Sync: CI/CD + Privated",
    ],
  },
];
