import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import CentralMultiSelect from "@/components/select/central-multi-select";
import CentralSelect from "@/components/select/central-select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useCreateServicePlans,
  useEditServicePlans,
} from "@/hooks/use-serviceplan";

const INITIAL_VALUES = {
  planName: "",
  price: "",
  deliveryTime: "",
  revisions: "",
  description: "",
  status: false,
};

const PLAN_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

const DELIVERY_OPTIONS = [
  { value: "1_day", label: "1 Day" },
  { value: "2_days", label: "2 Days" },
  { value: "3_days", label: "3 Days" },
  { value: "4_days", label: "4 Days" },
  { value: "5_days", label: "5 Days" },
  { value: "6_days", label: "6 Days" },
  { value: "7_days", label: "7 Days" },
  { value: "14_days", label: "14 Days" },
  { value: "30_days", label: "30 Days" },
];

const REVISION_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "unlimited", label: "Unlimited" },
];

const FEATURES = [
  { value: "source_code", label: "Source Code" },
  { value: "responsive_design", label: "Responsive Design" },
  { value: "api_integration", label: "API Integration" },
  { value: "database_setup", label: "Database Setup" },
  { value: "custom_uiux", label: "Custom UI/UX Design" },
  { value: "performance_optimization", label: "Performance Optimization" },
  { value: "deployment_support", label: "Deployment Support" },
];

const transformDataToPayload = (data) => ({
  plan: data.planName,
  price: data.price,
  delivery_time: data.deliveryTime,
  revision: data.revisions,
  description: data.description,
  features_included: data.features,
  status: data.status,
});

const CreateOffer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = !!id;
  const planData = location.state?.planData;

  const { mutate: createServicePlan, isPending: creatingPlans } =
    useCreateServicePlans();
  const { mutate: editServicePlan, isPending: editingPlans } =
    useEditServicePlans();

  // Transform plan data for form if in edit mode
  const getDefaultValues = () => {
    if (isEditMode && planData) {
      return {
        planName: planData.plan || "",
        price: planData.price || "",
        deliveryTime: planData.delivery_time || "",
        revisions: planData.revision || "",
        description: planData.description || "",
        features: planData.features_included || [],
        status: !!planData.status,
      };
    }
    return INITIAL_VALUES;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (data) => {
    const payload = transformDataToPayload(data);

    if (isEditMode) {
      editServicePlan(
        { id, ...payload },
        {
          onSuccess: () => {
            navigate("/developer/service-plans");
          },
        }
      );
    } else {
      createServicePlan(payload, {
        onSuccess: () => {
          navigate("/developer/service-plans");
        },
      });
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="font-medium text-lg">
          {isEditMode ? "Edit Service Plan" : "Create Service Plan"}
        </h1>
        <p className="text-[#696969] text-xs">
          {isEditMode
            ? "Update your plan with new pricing, features, and delivery details."
            : "Add a plan with clear pricing, features, and delivery details."}
        </p>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2">
        {/* Form */}
        <form
          className="mt-6 flex w-full flex-col gap-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Plan Name */}
            <CentralSelect
              contentClassName="border border-[#FFFFFF0F] bg-[#000]"
              control={control}
              errors={errors}
              label="Plan Name"
              name="planName"
              options={PLAN_OPTIONS}
              placeholder="Select Plan"
              rules={{ required: "Please select a plan" }}
              triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
            />

            {/* Price */}
            <CentralInput
              error={errors.price?.message}
              label="Price ($)"
              placeholder="Enter price"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 5, message: "Price must be at least $5" },
              })}
            />

            {/* Delivery Time */}
            <CentralSelect
              contentClassName="border border-[#FFFFFF0F] bg-[#000]"
              control={control}
              errors={errors}
              label="Delivery Time"
              name="deliveryTime"
              options={DELIVERY_OPTIONS}
              placeholder="Select Delivery Time"
              rules={{ required: "Please select a delivery time" }}
              triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
            />

            {/* Revisions */}
            <CentralSelect
              contentClassName="border border-[#FFFFFF0F] bg-[#000]"
              control={control}
              errors={errors}
              label="Revisions"
              name="revisions"
              options={REVISION_OPTIONS}
              placeholder="Select Revisions"
              rules={{ required: "Please select revisions" }}
              triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
            />

            {/* Description */}
            <CentralInput
              error={errors.description?.message}
              label="Description"
              multiline
              placeholder="Write a detailed description of the plan"
              rows={4}
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
            />

            <CentralMultiSelect
              control={control}
              errors={errors}
              label="Features Included"
              name="features"
              options={FEATURES}
              placeholder="Select "
              rules={{ required: "Select at least one feature" }}
              triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-3 md:bg-[var(--glassic)]"
            />
            <div className="flex items-center gap-4">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <div className="flex items-center gap-4">
                    <Label htmlFor="status">Status</Label>
                    <Switch
                      checked={field.value ?? false}
                      id="status"
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center">
            <PrimaryButton
              className="mt-4 bg-[var(--light-blue)] min-w-[140px] px-10 font-medium text-sm 2xl:text-lg"
              loading={isEditMode ? editingPlans : creatingPlans}
              title={isEditMode ? "Update Offer" : "Create Offer"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
