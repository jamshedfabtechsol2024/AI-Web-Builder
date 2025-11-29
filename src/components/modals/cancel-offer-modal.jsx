import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRejectOfferMutation } from "@/hooks/use-thread";
import PrimaryButton from "../buttons/primary-button";

const CancelOfferModal = ({ open, onOpenChange, offerId, messageId }) => {
  const { mutate: rejectOffer, isPending } = useRejectOfferMutation();

  const handleCancel = () => {
    rejectOffer(
      { offerId, payload: { message_id: messageId } },
      {
        onSuccess: () => {
          toast.success("Offer rejected successfully");
          onOpenChange();
        },
      }
    );
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Decline Offer</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-[var(--text)] text-sm">
            Are you sure you want to Decline this offer Request?
          </p>
        </div>

        <DialogFooter className="flex w-full gap-2">
          <PrimaryButton
            className="flex-1 rounded-full bg-[#BF0205]"
            loading={isPending}
            onClick={handleCancel}
            title="Decline"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOfferModal;
