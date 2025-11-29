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

// Constants
const INITIAL_VALUES = {
  email: "",
};

const VerifyEmailModal = ({ open, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  // This will be called if form is valid
  const onSubmit = () => {
    // console.log('Form data:', data);
    // handle save logic here
    onOpenChange();
  };

  const handleCancel = () => {
    onOpenChange();
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Email</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            We’ll send a 6-digit verification code on your email address
          </p>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <CentralInput
            error={errors.email?.message}
            label="Email Address"
            placeholder="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />

          <DialogFooter className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
              onClick={handleCancel}
              title="Cancel"
              type="button"
            />
            <PrimaryButton
              className="flex-1 rounded-lg"
              title="Save"
              type="submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyEmailModal;
