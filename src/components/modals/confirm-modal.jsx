// components/modals/ConfirmModal.jsx

import PrimaryButton from "@/components/buttons/primary-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConfirmModal = ({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "Please confirm this action.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-[var(--text)] text-sm">{description}</p>
        </div>

        <DialogFooter className="flex w-full gap-2">
          <PrimaryButton
            className="flex-1 rounded-full bg-gray-700 hover:bg-gray-600"
            disabled={loading}
            onClick={handleCancel}
            title={cancelText}
          />
          <PrimaryButton
            className="flex-1 rounded-full"
            loading={loading}
            onClick={handleConfirm}
            title={confirmText}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
