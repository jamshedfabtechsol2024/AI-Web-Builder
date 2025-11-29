import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PrimaryButton from "../buttons/primary-button";
import { useDeleteProjectMutation } from "@/hooks/use-project";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MoveTrashModal = ({ open, onOpenChange, id }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: deleteProject, isPending } = useDeleteProjectMutation();
  const isProjectDetailPage = location.pathname.startsWith("/project/");
  const handleCancel = () => {
    console.log("id", id);

    deleteProject(id, {
      onSuccess: () => {
        if (isProjectDetailPage) {
          onOpenChange();
          navigate("/recently");
        } else {
          onOpenChange();
        }
      },
    });
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move File to Trash</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-[var(--text)] text-sm">
            You are about to move the file project name to trash.
          </p>
          <p className="text-[var(--text)] text-sm">
            You can always restore it later from the trash section.
          </p>
        </div>

        <DialogFooter className="flex w-full gap-2">
          <PrimaryButton
            className="flex-1 rounded-full"
            onClick={handleCancel}
            title="Move to Trash"
            loading={isPending}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveTrashModal;
