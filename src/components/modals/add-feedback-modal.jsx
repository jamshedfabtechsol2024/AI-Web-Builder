import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CentralTextarea from "../auth/central-textarea";
import PrimaryButton from "../buttons/primary-button";
import { Rating, RatingButton } from "../ui/kibo-ui/rating";
import { Label } from "../ui/label";

// Constants
const INITIAL_VALUES = {
  message: "",
  rating: 0,
};

const AddFeedbackModal = ({
  open,
  onOpenChange,
  onSubmitReview,
  loading,
  type = "user",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
  });

  const handleCancel = () => {
    reset();
    onOpenChange();
  };

  const onSubmit = (data) => {
    onSubmitReview(data, () => {
      // Reset form
      reset(INITIAL_VALUES);
      onOpenChange();
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "user"
              ? "Add Review & Feedback"
              : "Give Feedbackto Staron AI"}
          </DialogTitle>
          <p className="text-[var(--light-white)] text-xs 2xl:text-sm">
            Share your experience with the{" "}
            {type === "user" ? "Developer" : "Staron AI"} to help improve
            service quality and assist other clients in making decisions
          </p>
        </DialogHeader>

        <form className="space-y-6 py-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Rating  */}
          <div>
            <Label>Rating</Label>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <Rating
                  onValueChange={field.onChange}
                  value={field.value} // update form state
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton
                      className="text-yellow-400"
                      key={`star-${index + 1}`}
                      value={index + 1}
                    />
                  ))}
                </Rating>
              )}
            />
            {errors.rating && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.rating.message}
              </p>
            )}
          </div>

          <CentralTextarea
            error={errors.message?.message}
            label="Message"
            placeholder="Type your message here..."
            rows={5}
            {...register("message", { required: "Message is required" })}
          />

          {/* Footer */}
          <DialogFooter className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
              onClick={handleCancel}
              title="Cancel"
            />
            <PrimaryButton
              className="flex-1 rounded-lg"
              loading={loading}
              title="Save"
              type="submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeedbackModal;
