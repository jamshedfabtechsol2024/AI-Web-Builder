import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CentralInput from "@/components/auth/central-input";
import PrimaryButton from "@/components/buttons/primary-button";
import { useUpdateProjectName } from "@/hooks/use-project";

const INITIAL_VALUES = {
  name: "",
};

const UpdateProjectNameModal = ({
  open,
  onOpenChange,
  initialName = "",
  conversationId,
}) => {
  const { id: projectId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
    values: { name: initialName || "" },
  });

  const { mutate: updateName, isPending } = useUpdateProjectName();

  useEffect(() => {
    if (open) {
      reset({ name: initialName || "" });
    }
  }, [open, initialName, reset]);

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
    };
    updateName(
      { id: projectId, payload },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset(INITIAL_VALUES);
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            Update the project name.
          </p>
        </DialogHeader>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CentralInput
            error={errors.name?.message}
            label="Name"
            placeholder="Enter project name"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 100,
                message: "Name must be less than 100 characters",
              },
            })}
          />

          <div className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              title="Cancel"
              type="button"
            />
            <PrimaryButton
              className="flex-1 rounded-lg"
              loading={isPending}
              title="Save"
              type="submit"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectNameModal;
