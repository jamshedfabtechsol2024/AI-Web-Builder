import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PrimaryButton from "../buttons/primary-button";

const ApproveModal = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const handleApprove = () => {
    navigate("/payment-invoice");
    onOpenChange();
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Project Approved</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-[var(--text)] text-sm">
            Your project has been approved. Would you like to proceed with the
            payment now?
          </p>
        </div>

        <DialogFooter className="flex w-full gap-2">
          <PrimaryButton
            className="flex-1 rounded-full"
            onClick={handleApprove}
            title="Pay Now"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveModal;
