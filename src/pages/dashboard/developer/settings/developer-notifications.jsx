import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "@/components/buttons/primary-button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const NOTIFICATION_DATA = [
  {
    title: "",
    fields: [
      { name: "project_assigned", label: "Project Assigned" },
      { name: "project_status_updates", label: "Project Status Updates" },
      { name: "messages", label: "Messages" },
      { name: "payout_updates", label: "Payout / Earnings Updates" },
      { name: "platform_announcements", label: "Platform Announcements" },
    ],
  },
];

const INITIAL_VALUES = {
  project_assigned: false,
  project_status_updates: true,
  messages: true,
  payout_updates: false,
  platform_announcements: true,
};

const DeveloperNotifications = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = () => {
    // console.log('Developer Notifications:', data);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Notification Settings
      </h1>

      {NOTIFICATION_DATA.map((section, idx) => (
        <div key={section.title || idx}>
          <h2 className="py-4 font-semibold text-base">{section.title}</h2>
          <div className="flex flex-col gap-3">
            {section.fields.map((field) => (
              <Controller
                control={control}
                key={field.name}
                name={field.name}
                render={({ field: rhfField }) => (
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Switch
                      checked={rhfField.value}
                      id={field.name}
                      onCheckedChange={rhfField.onChange}
                    />
                  </div>
                )}
              />
            ))}
          </div>
          {idx < NOTIFICATION_DATA.length - 1 && (
            <Separator className="my-6 bg-white/10" />
          )}
        </div>
      ))}

      <div className="flex items-center">
        <PrimaryButton
          className="mt-4 bg-[var(--light-blue)] px-10 font-medium text-sm 2xl:text-lg"
          title="Save"
          type="submit"
        />
      </div>
    </form>
  );
};

export default DeveloperNotifications;
