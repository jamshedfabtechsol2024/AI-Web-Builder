import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import DeveloperPricing from "@/components/card/developer-pricing";
import ConfirmModal from "@/components/modals/confirm-modal";
import ServicePlanCardSkeleton from "@/components/skeletons/service-plan-card-skeleton";
import {
  useDeleteServicePlan,
  useEditServicePlans,
  useGetServicePlans,
} from "@/hooks/use-serviceplan";

const normalizePlanData = (plan) => ({
  id: plan?.id,
  title: plan?.plan
    ? plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1)
    : "Untitled",
  price: Number.parseFloat(plan?.price),
  active: !!plan?.status,
  deliveryTime: plan?.delivery_time?.replace("_", " ") || "N/A",
  revisions:
    plan.revision === "unlimited" ? "Unlimited" : Number(plan?.revision) || 0,
  description: plan?.description || "No description available.",
  features:
    plan.features_included?.map((f) =>
      f
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    ) || [],
});

const ServicePlans = () => {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, isLoading } = useGetServicePlans();

  const { mutate: deleteServicePlan, isPending } = useDeleteServicePlan();
  const handleDelete = (id) => {
    deleteServicePlan(id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
      },
    });
  };

  const { mutate: editServicePlan } = useEditServicePlans();
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg">My Service Plans</h1>
          <p className="text-[#696969] text-xs">
            Create and manage up to 3 plans to offer clients flexible pricing
            and feature options.
          </p>
        </div>

        {/* Right: Action Button */}
        <PrimaryButton
          className="w-full rounded-full px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66] sm:w-auto"
          onClick={() => navigate("/developer/service-plans/create")}
          title="Create Offer"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:mx-auto 2xl:max-w-6xl">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ServicePlanCardSkeleton key={i} />
            ))
          : data.map((plan) => {
              const normalized = normalizePlanData(plan);
              return (
                <DeveloperPricing
                  active={normalized?.active}
                  deliveryTime={normalized?.deliveryTime}
                  description={normalized?.description}
                  features={normalized?.features}
                  key={normalized?.id}
                  onDelete={() => setDeleteModalOpen(normalized?.id)}
                  onEdit={() =>
                    navigate(`/developer/service-plans/${normalized?.id}`, {
                      state: { planData: plan },
                    })
                  }
                  price={normalized?.price}
                  revisions={normalized?.revisions}
                  title={normalized?.title}
                />
              );
            })}
        {data?.length === 0 && (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-300">No service plans found</p>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        confirmText="Delete"
        description="Are you sure you want to Delete?"
        loading={isPending}
        onConfirm={() => handleDelete(deleteModalOpen)}
        onOpenChange={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
        title="Confirm Delete"
      />
    </div>
  );
};

export default ServicePlans;
