import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SupportForm from "@/pages/dashboard/developer/support/support-form";

const SupportModal = ({ open, onOpenChange }) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent className="hide-scrollbar max-h-[95vh] overflow-y-auto border border-[#FFFFFF0F] bg-black sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Need Help? Get in Touch</DialogTitle>
        <p className="text-[var(--text)] text-sm">
          Welcome back! Here's what's happening on your platform.
        </p>
      </DialogHeader>

      <div>
        <SupportForm type="user" />
      </div>
    </DialogContent>
  </Dialog>
);

export default SupportModal;
