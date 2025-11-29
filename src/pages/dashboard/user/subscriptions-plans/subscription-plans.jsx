import { SEOMeta } from "@/components/seo/seo-meta";
import SubscriptionPlanCards from "./subscription-plan-cards";

const SubscriptionPlans = () => (
  <>
    <SEOMeta
      description="Choose the right subscription plan for your Staron AI. Compare features, pricing, and benefits to find the best plan for your website projects."
      keywords="subscription plans, pricing, Staron AI plans, website builder packages, premium plan, free trial, upgrade"
      path="/subscription-plans"
      title="Subscription Plans - Staron AI"
    />

    <main>
      <SubscriptionPlanCards />
    </main>
  </>
);

export default SubscriptionPlans;
