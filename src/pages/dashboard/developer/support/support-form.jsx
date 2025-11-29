import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import CentralInput from "@/components/auth/central-input";
import CentralTextarea from "@/components/auth/central-textarea";
import PrimaryButton from "@/components/buttons/primary-button";
import PhoneInput from "@/components/ui/phone-input";
import { useCreateSupportForm } from "@/hooks/use-support";
import { supportSchema } from "@/schema/developer-settings-schema";

// Constants
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

const transformDataToPayload = (data) => ({
  first_name: data.firstName,
  last_name: data.lastName,
  phone_no: `+${data.phone}`,
  email: data.email,
  message: data.message,
});
const SupportForm = ({ type = "developer" }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: createSupport, isPending: creatingSupport } =
    useCreateSupportForm();

  const onSubmit = (data) => {
    const payload = transformDataToPayload(data);
    createSupport(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {type === "developer" && (
        <>
          <h1 className="font-medium text-2xl">Need Help? Get in Touch</h1>
          <p className="mt-2 max-w-md text-center text-[var(--light-white)]">
            Welcome back! Here's what's happening on your platform.
          </p>
        </>
      )}
      <div className="w-full max-w-xl">
        <form
          className="mt-10 flex w-full flex-col gap-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CentralInput
            error={errors.firstName?.message}
            label=" First Name"
            placeholder="First Name"
            type="text"
            {...register("firstName")}
          />
          <CentralInput
            error={errors.lastName?.message}
            label="Last Name"
            placeholder="Last Name"
            type="text"
            {...register("lastName")}
          />
          <CentralInput
            error={errors.email?.message}
            label="Email Address"
            placeholder="Email"
            type="email"
            {...register("email")}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                error={errors.phone?.message}
                label="Contact Number"
                onChange={(val) => field.onChange(val)}
                placeholder="Phone number"
                value={field.value || ""}
              />
            )}
          />
          <CentralTextarea
            error={errors.message?.message}
            label="Message"
            placeholder="Type your message here..."
            rows={5}
            {...register("message")}
          />
          <PrimaryButton
            className="mt-4 w-full bg-[var(--light-blue)] px-10 font-medium text-sm 2xl:text-lg"
            loading={creatingSupport}
            title="Send Message"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
export default SupportForm;
