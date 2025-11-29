import { Controller, useForm } from "react-hook-form";
import { useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PrimaryButton from "@/components/buttons/primary-button";
import NotificationSettingsSkeleton from "@/components/skeletons/notification-settings-skeleton";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ADMIN_NOTIFICATION_DATA,
  DEV_NOTIFICATION_DATA,
  USER_NOTIFICATION_DATA,
} from "@/data/notifications-data";
import {
  useGetNotificationsPreferences,
  useUpdateNotificationsPreferences,
} from "@/hooks/use-notifications";

const getInAppFieldNames = (data) => {
  const names = new Set();
  data.forEach((section) =>
    section.fields.forEach((f) => {
      if (f.name !== "enable_all") names.add(f.name);
    })
  );
  return Array.from(names);
};

const transformFormToPayload = (form, inAppFields) => ({
  enable_all: form.enable_all,
  in_app: Object.fromEntries(
    inAppFields.map((field) => [field, form[field] ?? false])
  ),
});

const parseApiResponseToForm = (api, inAppFields) => {
  if (!api) return null;
  const inApp = api.in_app || {};

  const result = {
    enable_all: api.enable_all ?? false,
  };
  inAppFields.forEach((field) => {
    result[field] = inApp[field] ?? false;
  });
  return result;
};

const NotificationsSettings = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isDev = location.pathname.startsWith("/developer");

  const { data: apiData, isLoading } = useGetNotificationsPreferences();
  const { mutate: updatePrefs, isPending: isUpdating } =
    useUpdateNotificationsPreferences();

  const NOTIFICATION_DATA = useMemo(() => {
    if (isAdmin) return ADMIN_NOTIFICATION_DATA;
    if (isDev) return DEV_NOTIFICATION_DATA;
    return USER_NOTIFICATION_DATA;
  }, [isAdmin, isDev]);

  const inAppFieldNames = useMemo(
    () => getInAppFieldNames(NOTIFICATION_DATA),
    [NOTIFICATION_DATA]
  );

  const defaultFormValues = useMemo(() => {
    const parsed = parseApiResponseToForm(apiData, inAppFieldNames);
    if (parsed) return parsed;

    return {
      enable_all: false,
      ...Object.fromEntries(inAppFieldNames.map((f) => [f, false])),
    };
  }, [apiData, inAppFieldNames]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const form = watch();
  const enableAll = watch("enable_all");

  useEffect(() => {
    const allOn = inAppFieldNames.every((f) => form[f] === true);
    const anyOn = inAppFieldNames.some((f) => form[f] === true);

    if (enableAll && !allOn) {
      setValue("enable_all", false, { shouldDirty: true });
    } else if (!enableAll && allOn) {
      setValue("enable_all", true, { shouldDirty: true });
    } else if (enableAll && !anyOn) {
      setValue("enable_all", false, { shouldDirty: true });
    }
  }, [form, enableAll, inAppFieldNames, setValue]);

  const handleMasterToggle = useCallback(
    (checked) => {
      inAppFieldNames.forEach((field) =>
        setValue(field, checked, { shouldDirty: true })
      );
      setValue("enable_all", checked, { shouldDirty: true });
    },
    [inAppFieldNames, setValue]
  );

  const onSubmit = useCallback(
    (data) => {
      const payload = transformFormToPayload(data, inAppFieldNames);
      updatePrefs(payload, {
        onSuccess: () => console.log("Saved:", payload),
        onError: (err) => console.error("Save error:", err),
      });
    },
    [updatePrefs, inAppFieldNames]
  );

  useEffect(() => {
    if (apiData) reset(defaultFormValues);
  }, [apiData, defaultFormValues, reset]);

  if (isLoading) return <NotificationSettingsSkeleton />;

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-2 border-b border-white/10 pb-2 text-lg font-medium">
        Notification Settings
      </h1>

      {NOTIFICATION_DATA.map((section, secIdx) => (
        <div key={section.title || secIdx}>
          {section.title && (
            <h2 className="py-4 text-base font-semibold">{section.title}</h2>
          )}

          <div className="flex flex-col gap-3">
            {section.fields.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                render={({ field: rhf }) => {
                  const isMaster = field.name === "enable_all";

                  return (
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={field.name}
                        className={
                          isMaster ? "font-semibold" : "cursor-pointer"
                        }
                      >
                        {field.label}
                      </Label>

                      <Switch
                        id={field.name}
                        checked={!!rhf.value}
                        onCheckedChange={(checked) => {
                          if (isMaster) {
                            rhf.onChange(checked);
                            handleMasterToggle(checked);
                          } else {
                            rhf.onChange(checked);
                            // trigger enable_all recalc
                            setValue("enable_all", getValues("enable_all"), {
                              shouldDirty: true,
                            });
                          }
                        }}
                        disabled={isUpdating}
                      />
                    </div>
                  );
                }}
              />
            ))}
          </div>

          {secIdx < NOTIFICATION_DATA.length - 1 && (
            <Separator className="my-6 bg-white/10" />
          )}
        </div>
      ))}

      <div className="flex items-center">
        <PrimaryButton
          type="submit"
          title={isUpdating ? "Saving…" : "Save"}
          loading={isUpdating}
          className="mt-4 bg-[var(--light-blue)] min-w-[100px] px-10 text-sm font-medium 2xl:text-lg disabled:opacity-50"
        />
      </div>
    </form>
  );
};

export default NotificationsSettings;
