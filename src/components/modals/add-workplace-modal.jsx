import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CentralInput from "../auth/central-input";
import PrimaryButton from "../buttons/primary-button";
import { useCreateWorkSpaceMutation } from "@/hooks/use-workplace";

// Constants
const INITIAL_VALUES = {
  name: "",
};

const AddWorkplaceModal = ({ open, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: createWorkPlace, isPending } = useCreateWorkSpaceMutation();

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
    };
    createWorkPlace(payload, {
      onSuccess: () => {
        onOpenChange(false);
        reset(INITIAL_VALUES);
      },
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Workspace</DialogTitle>
        </DialogHeader>

        <form className="space-y-6 py-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Input */}
          <CentralInput
            error={errors.name?.message}
            label="Workspace Name"
            placeholder="Type Here"
            type="text"
            {...register("name", { required: "Name is required" })}
          />

          {/* Footer */}
          <DialogFooter className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-full"
              disabled={isPending}
              title={"Save Workplace"}
              type="submit"
              loading={isPending}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkplaceModal;
