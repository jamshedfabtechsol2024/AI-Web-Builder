import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWithdrawOfferMutation } from "@/hooks/use-thread";
import PrimaryButton from "../buttons/primary-button";

const WithdrawModal = ({ open, onOpenChange, offerId, messageId }) => {
  const { mutate: withdrawOffer, isPending } = useWithdrawOfferMutation();

  const handleWithdrawal = () => {
    withdrawOffer(
      { offerId, payload: { message_id: messageId } }, // 👈 pass as object
      {
        onSuccess: () => {
          toast.success("Offer withdrawn successfully");
          onOpenChange();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.detail || "Something went wrong");
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdrawal Request</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-[var(--text)] text-sm">
            Are you sure you want to withdraw your offer request?
          </p>
        </div>

        <DialogFooter className="flex w-full gap-2">
          <PrimaryButton
            className="flex-1 rounded-full"
            loading={isPending}
            onClick={handleWithdrawal}
            title="Withdrawal"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
