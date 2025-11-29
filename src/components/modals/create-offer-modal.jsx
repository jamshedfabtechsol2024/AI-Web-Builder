import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useGetUserProjectsQuery } from "@/hooks/use-project";
import { useCreateThreadOffer } from "@/hooks/use-thread";
import CentralInput from "../auth/central-input";
import CentralTextarea from "../auth/central-textarea";
import PrimaryButton from "../buttons/primary-button";
import UploadCoverCard from "../card/upload-cover-card";
import CentralSelect from "../select/central-select";
import { Label } from "../ui/label";
import DateInput from "../auth/date-input";

// Constants
const INITIAL_VALUES = {
  title: "",
  description: "",
};

const CreateOfferModal = ({ open, onOpenChange, userId, threadId }) => {
  const { data: projects, isLoading } = useGetUserProjectsQuery(userId, open);
  const [media, setMedia] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });
  const { mutate: uploadImage, isPending: isUploading } = useImageUpload();

  const { mutate: createOffer, isPending: isCreatingOffer } =
    useCreateThreadOffer(threadId);
  // This will be called if form is valid
  const onSubmit = (data) => {
    const basePayload = {
      title: data?.title,
      project: data?.project,
      description: data?.description,
      amount: data?.price,
      deadline: data?.deadline,
    };

    if (media instanceof File) {
      // Only upload if the user selected a new file
      uploadImage(media, {
        onSuccess: (response) => {
          const payload = {
            ...basePayload,
            media_url: response?.profile_image,
          };
          createOffer(payload, {
            onSuccess: () => {
              reset();
              setMedia(null);
              onOpenChange();
            },
            onError: (error) => {
              toast.error(
                error?.response?.data?.detail || "Something went wrong"
              );
            },
          });
        },
        onError: (error) => {
          toast.error(error?.response?.data?.detail || "Something went wrong");
        },
      });
    } else {
      // No new file, just send base data
      createOffer(basePayload, {
        onSuccess: () => {
          reset();
          setMedia(null);
          onOpenChange();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.detail || "Something went wrong");
        },
      });
    }
  };

  const handleCancel = () => {
    onOpenChange();
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="hide-scrollbar max-h-[90vh] overflow-y-auto border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Offer</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            Set your terms and take the next step in collaboration.
          </p>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <CentralInput
            error={errors.title?.message}
            label="Offer Title"
            placeholder="Offer Title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />

          <CentralSelect
            contentClassName="border border-[#FFFFFF0F] bg-[#000]"
            control={control}
            errors={errors}
            label="Project"
            loading={isLoading}
            name="project"
            options={projects?.map((project) => ({
              label: project?.conversation__session_name || "N/A",
              value: project?.id || "N/A",
            }))}
            placeholder="Select Project"
            rules={{ required: "Please select a project" }}
            triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
          />

          <CentralTextarea
            error={errors.description?.message}
            label="Description"
            placeholder="Type your message here..."
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
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

          <DateInput
            label="Delivery Date"
            placeholder="Deadline"
            error={errors.deadline?.message}
            {...register("deadline", { required: "Deadline is required" })}
          />

          <div>
            <Label>Media</Label>
            <UploadCoverCard
              defaultImage={media}
              onFileSelect={(file) => setMedia(file)}
              text="to Upload relevant media (optional)"
            />
          </div>

          <DialogFooter className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
              onClick={handleCancel}
              title="Cancel"
              type="button"
            />
            <PrimaryButton
              className="flex-1 rounded-lg"
              loading={isUploading || isCreatingOffer}
              title="Send Offer"
              type="submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferModal;
