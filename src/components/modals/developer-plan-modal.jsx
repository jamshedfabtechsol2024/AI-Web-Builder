import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeveloperPricing from "../card/developer-pricing";

const CARD_DATA = [
  {
    id: 1,
    title: "Basic",
    price: 100,
    active: true,
    deliveryTime: "3 Days",
    revisions: 1,
    description: "Perfect for small projects and quick prototypes.",
    features: ["Source Code", "Responsive Design"],
  },
  {
    id: 2,
    title: "Standard",
    price: 250,
    active: true,
    deliveryTime: "7 Days",
    revisions: 3,
    description: "Great for medium projects with custom integrations.",
    features: [
      "Source Code",
      "Responsive Design",
      "API Integration",
      "Database Setup",
    ],
  },
  {
    id: 3,
    title: "Premium",
    price: 500,
    active: true,
    deliveryTime: "14 Days",
    revisions: "Unlimited",
    description: "Best for full-scale applications with advanced features.",
    features: [
      "Source Code",
      "Responsive Design",
      "API Integration",
      "Database Setup",
      "Custom UI/UX Design",
      "Performance Optimization",
      "Deployment Support",
    ],
  },
];

const CancelOfferModal = ({ open, onOpenChange }) => {
  const handleCancel = () => {
    onOpenChange();
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="!w-full hide-scrollbar lg:!max-w-5xl md:!max-w-xl max-h-[90vh] overflow-y-auto border border-[#FFFFFF0F] bg-black">
        <DialogHeader>
          <DialogTitle>Service Plans</DialogTitle>
          <DialogDescription>
            Set your terms and take the next step in collaboration.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:mx-auto 2xl:max-w-6xl">
            {CARD_DATA.map((plan) => (
              <DeveloperPricing
                key={plan.id}
                {...plan}
                onSelect={handleCancel}
                type="select"
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOfferModal;
