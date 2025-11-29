import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePublishProjectMutation } from "@/hooks/use-project";
import CentralInput from "../auth/central-input";
import CentralTextarea from "../auth/central-textarea";
import PrimaryButton from "../buttons/primary-button";
import CentralSelect from "../select/central-select";

// Regex pattern for repository name validation
const REPO_NAME_PATTERN = /^[a-zA-Z0-9-_]+$/;

const INITIAL_VALUES = {
  repo_name: "",
  visibility: "true",
  description: "",
};

const PublishModal = ({ open, onOpenChange }) => {
  const { id: projectId } = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: publishProject, isPending } = usePublishProjectMutation();

  const onSubmit = (data) => {
    const payload = {
      repo_name: data.repo_name,
      private: data.visibility === "true",
      description: data.description,
    };
    // Convert string values back to boolean for processing
    publishProject(
      { projectId, payload },
      {
        onSuccess: () => {
          toast.success("Project published successfully");

          onOpenChange(false);
          reset(INITIAL_VALUES);
        },
      }
    );
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish to GitHub</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            Here you can publish your project to GitHub .
          </p>
        </DialogHeader>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CentralInput
            error={errors.repo_name?.message}
            label="Repository Name"
            placeholder="Enter repository name"
            type="text"
            {...register("repo_name", {
              required: "Repository name is required",
              minLength: {
                value: 3,
                message: "Repository name must be at least 3 characters",
              },
              pattern: {
                value: REPO_NAME_PATTERN,
                message:
                  "Repository name can only contain letters, numbers, hyphens, and underscores",
              },
            })}
          />
          {/* Private */}
          <CentralSelect
            contentClassName="border border-[#FFFFFF0F] bg-[#000]"
            control={control}
            errors={errors}
            label="Visibility"
            name="visibility"
            options={[
              { value: "false", label: "Public" },
              { value: "true", label: "Private" },
            ]}
            placeholder="Select visibility"
            rules={{ required: "Please select visibility" }}
            triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
          />

          {/* Description */}
          <CentralTextarea
            error={errors.description?.message}
            label="Description"
            placeholder="Describe your project..."
            rows={4}
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters",
              },
            })}
          />

          <div className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
              disabled={isPending}
              onClick={handleCancel}
              title="Cancel"
              type="button"
            />
            <PrimaryButton
              className="flex-1 rounded-lg"
              loading={isPending}
              title="Publish"
              type="submit"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
