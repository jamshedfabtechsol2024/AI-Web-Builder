import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCommitChangesMutation } from "@/hooks/use-project";
import CentralTextarea from "../auth/central-textarea";
import PrimaryButton from "../buttons/primary-button";

const INITIAL_VALUES = {
  commit_message: "",
};

const CommitModal = ({ open, onOpenChange }) => {
  const { id: projectId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: commitChanges, isPending } = useCommitChangesMutation();

  const onSubmit = (data) => {
    const payload = {
      commit_message: data.commit_message,
    };
    commitChanges(
      { projectId, payload },
      {
        onSuccess: () => {
          toast.success("Changes committed successfully");
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
          <DialogTitle>Commit Changes</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            Add a commit message to describe your changes.
          </p>
        </DialogHeader>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CentralTextarea
            error={errors.commit_message?.message}
            label="Commit Message"
            placeholder="Write your commit message..."
            rows={4}
            {...register("commit_message", {
              required: "Commit message is required",
              maxLength: {
                value: 300,
                message: "Commit message must be less than 300 characters",
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
              title="Commit"
              type="submit"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommitModal;
