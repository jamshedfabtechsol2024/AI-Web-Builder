import { Controller, useForm } from "react-hook-form";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import CentralSelect from "@/components/select/central-select";

import { Switch } from "@/components/ui/switch";

// Constants
const INITIAL_VALUES = {
  platformName: "",
  developer: "",
  defaultLanguage: "",
  timezone: "",
  maintenanceMode: false,
};

const LANGUAGES = [
  { id: "en", name: "English" },
  { id: "fr", name: "French" },
  { id: "es", name: "Spanish" },
];

const TIMEZONES = [
  "UTC",
  "GMT",
  "EST",
  "CST",
  "PST",
  "Asia/Karachi",
  "Europe/London",
];

const PlatformSettings = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = () => {
    // console.log('Form Data:', data);
    // Handle save logic here
  };

  return (
    <div>
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Platform Configuration Settings
      </h1>

      <form
        className="mt-10 flex w-full flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Platform Name */}
          <CentralInput
            error={errors.platformName?.message}
            label="Platform Name"
            placeholder="Platform Name"
            type="text"
            {...register("platformName", {
              required: "Platform name is required",
            })}
          />

          {/* Default Language Select */}
          <CentralSelect
            contentClassName="border border-[#FFFFFF0F] bg-[#000]"
            control={control}
            errors={errors}
            label="Default Language"
            name="defaultLanguage"
            options={LANGUAGES.map((lang) => ({
              value: lang.id,
              label: lang.name,
            }))}
            placeholder="Select Language"
            rules={{ required: "Please select a language" }}
            triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
          />

          {/* Timezone Select */}
          <CentralSelect
            contentClassName="border border-[#FFFFFF0F] bg-[#000]"
            control={control}
            errors={errors}
            label="Timezone"
            name="timezone"
            options={TIMEZONES}
            placeholder="Select Timezone"
            rules={{ required: "Please select a timezone" }}
            triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
          />

          {/* Maintenance Mode Switch */}
          <Controller
            control={control}
            name="maintenanceMode"
            render={({ field }) => (
              <div className="flex items-center gap-4 py-6">
                <span>Maintenance Mode</span>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center">
          <PrimaryButton
            className="mt-4 bg-[var(--light-blue)] px-10 font-medium text-sm 2xl:text-lg"
            title="Save"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default PlatformSettings;
