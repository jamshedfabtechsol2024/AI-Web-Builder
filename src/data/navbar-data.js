export const NAVIGATION_DATA = {
  main: [
    {
      id: "features",
      label: "Features",
      path: "#features",
      scrollId: "features",
    },
    { id: "how-to", label: "How to Use", path: "#how-to", scrollId: "how-to" },
    { id: "plans", label: "Pricing", path: "#plans", scrollId: "plans" },
    { id: "faqs", label: "FAQs", path: "#faqs", scrollId: "faqs" },
  ],
  legal: [
    { id: "terms", label: "Terms", path: "#terms", scrollId: "terms" },
    { id: "privacy", label: "Privacy", path: "#privacy", scrollId: "privacy" },
    { id: "cookies", label: "Cookies", path: "#cookies", scrollId: "cookies" },
  ],
  copyright: `© ${new Date().getFullYear()} Staron AI. All rights reserved.`,
};

// Backward compatibility
export const LANDING_PAGE_DATA = NAVIGATION_DATA.main;
