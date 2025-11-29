import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import ProfileFormSkeleton from "@/components/skeletons/profile-form-skeleton";
import PhoneInput from "@/components/ui/phone-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMeQuery, useUpdateMyProfileMutation } from "@/hooks/use-auth";
import { useImageUpload } from "@/hooks/use-image-upload";
import { profileSchema } from "@/schema/admin-settings-schema";
import ProfileImageUploader from "./profile-image-uploader";

// Constants
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const ProfileSettings = () => {
  const [file, setFile] = useState(null);
  const { data: user, isLoading } = useMeQuery();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: updateMyProfile, isPending } = useUpdateMyProfileMutation();

  const { mutate: uploadImage, isPending: isUploading } = useImageUpload();

  const onSubmit = (data) => {
    const basePayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: `+${data.phone}`,
      // add other fields here if needed
    };

    if (file instanceof File) {
      // Only upload if the user selected a new file
      uploadImage(file, {
        onSuccess: (response) => {
          const payload = {
            ...basePayload,
            profile_image: response?.profile_image,
          };
          updateMyProfile(payload);
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
        },
      });
    } else {
      // No new file, just send base data
      updateMyProfile(basePayload);
    }
  };

  useEffect(() => {
    if (user?.user) {
      reset({
        firstName: user?.user?.first_name,
        lastName: user?.user?.last_name,
        phone: user?.user?.phone,
        email: user?.user?.email,
      });
      setFile(user?.user?.profile_image || null);
    }
  }, [user, reset]);

  return (
    <div>
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Profile Settings
      </h1>
      <ScrollArea>
        {isLoading ? (
          <ProfileFormSkeleton />
        ) : (
          <form
            className="mt-10 flex w-full flex-col gap-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <ProfileImageUploader
              defaultImage={file}
              onFileSelect={(selectedFile) => setFile(selectedFile)}
            />
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
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
                disabled
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
            </div>
            <div className="flex items-center">
              <PrimaryButton
                className="mt-4 min-w-[100px] bg-[var(--light-blue)] px-10 font-medium text-sm 2xl:text-lg"
                loading={isPending || isUploading}
                title="Save"
                type="submit"
              />
            </div>
          </form>
        )}
      </ScrollArea>
    </div>
  );
};

export default ProfileSettings;
