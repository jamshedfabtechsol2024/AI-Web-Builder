import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import UploadCoverCard from "@/components/card/upload-cover-card";
import SkillsInput from "@/components/input/skills-input";
import DeveloperFormSkeleton from "@/components/skeletons/developer-form-skeleton";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/phone-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  getDeveloperProfile,
  useUpdateDeveloperProfileMutation,
} from "@/hooks/use-auth";
import { useImageUpload } from "@/hooks/use-image-upload";
import { profileSchema } from "@/schema/developer-settings-schema";
import ProfileImageUploader from "../../admin/settings/profile-image-uploader";
import AddPortfolio from "./add-portfoloi";

// Constants
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  title: "",
  experience: "",
  bio: "",
  skills: [],
  availability_status: false,
};

const DeveloperProfile = () => {
  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: user, isLoading } = getDeveloperProfile();
  // Dummy initial projects
  const [projects, setProjects] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: INITIAL_VALUES,
  });

  const handleCoverSelect = (selectedFile) => {
    setCoverFile(selectedFile);
    // you can now upload this to backend or store in form
  };
  const { mutateAsync: uploadImage, isPending: isUploading } = useImageUpload();
  const { mutate: updateDeveloperProfile, isLoading: isUpdating } =
    useUpdateDeveloperProfileMutation();

  const uploadIfNeeded = async (fileOrUrl) => {
    if (!fileOrUrl) {
      return null;
    }
    if (fileOrUrl instanceof File) {
      const res = await uploadImage(fileOrUrl);
      return res?.profile_image || null;
    }
    return fileOrUrl; // already URL
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!(file || coverFile)) {
        toast.error("Profile image and cover image are required.");
        return;
      }
      const availability =
        data.availability_status ?? watch("availability_status");

      const basePayload = {
        first_name: data.firstName,
        last_name: data.lastName,
        title: data.title,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
        portfolio: projects,
        phone: `+${data.phone}`,
        availability_status: availability,
      };

      // Parallel uploads with individual error handling
      const uploadPromises = [
        uploadIfNeeded(file).catch(() => {
          // Profile image upload failed
          throw new Error("Profile image upload failed. Please try again.");
        }),
        uploadIfNeeded(coverFile).catch(() => {
          // Cover image upload failed
          throw new Error("Cover image upload failed. Please try again.");
        }),
      ];

      const [profileUrl, coverUrl] = await Promise.all(uploadPromises);

      // Update profile with uploaded URLs
      await new Promise((resolve, reject) => {
        updateDeveloperProfile(
          {
            ...basePayload,
            profile_image: profileUrl,
            cover_image: coverUrl,
          },
          {
            onSuccess: () => {
              resolve();
            },
            onError: (error) => {
              // Profile update failed
              toast.error("Failed to update profile. Please try again.");
              reject(error);
            },
          }
        );
      });
    } catch (error) {
      toast.error(error.message || "Image upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.first_name,
        lastName: user?.last_name,
        phone: user?.phone,
        email: user?.email,
        title: user?.title,
        experience: user?.experience,
        bio: user?.bio,
        skills: user?.skills || [],
        availability_status: user?.availability_status,
      });
      setFile(user?.profile_image || null);
      setProjects(user?.portfolio || []);
      setCoverFile(user?.cover_image || null);
    }
  }, [user, reset]);

  return (
    <div>
      {" "}
      <h1 className="mb-2 border-white/10 border-b pb-2 font-medium text-lg">
        Profile Settings
      </h1>
      <ScrollArea>
        {isLoading ? (
          <DeveloperFormSkeleton />
        ) : (
          <form
            className="mt-10 flex w-full flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ProfileImageUploader
              defaultImage={file}
              onFileSelect={(selectedFile) => setFile(selectedFile)}
            />
            <div>
              <UploadCoverCard
                defaultImage={coverFile}
                onFileSelect={handleCoverSelect}
              />
            </div>
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
              <CentralInput
                error={errors.title?.message}
                label="Job Title"
                placeholder="Job Title"
                type="text"
                {...register("title")}
              />
              <CentralInput
                error={errors.experience?.message}
                label="Experience"
                placeholder="Experience"
                type="text"
                {...register("experience")}
              />
              <CentralInput
                error={errors.bio?.message}
                label="Bio"
                placeholder="Bio"
                type="text"
                {...register("bio")}
              />

              <Controller
                control={control}
                defaultValue={[]}
                name="skills"
                render={({ field }) => (
                  <SkillsInput
                    error={errors.skills?.message}
                    label="Skills"
                    onChange={field.onChange}
                    placeholder="Add a skill and press Enter"
                    value={field.value || []}
                  />
                )}
              />

              <div className="flex items-center gap-4">
                <Controller
                  control={control}
                  name="availability_status"
                  render={({ field }) => (
                    <div className="flex items-center gap-4">
                      <Label htmlFor="availability_status">Availability</Label>
                      <Switch
                        checked={field.value ?? false}
                        id="availability_status"
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <Separator className="!h-[1px] my-2 bg-white/10" />

            <AddPortfolio
              initialProjects={projects}
              onSubmitPortfolio={(updatedProjects) =>
                setProjects(updatedProjects)
              }
            />

            <div className="flex items-center">
              <PrimaryButton
                className="mt-4 min-w-[150px] bg-[var(--light-blue)] px-8 font-medium text-sm 2xl:text-lg"
                disabled={isSubmitting}
                loading={isSubmitting || isUpdating || isUploading}
                title="Save Profile"
                type="submit"
              />
            </div>
          </form>
        )}
      </ScrollArea>
    </div>
  );
};

export default DeveloperProfile;
