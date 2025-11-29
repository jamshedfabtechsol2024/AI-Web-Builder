import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import CentralSelect from "../select/central-select";
import PrimaryButton from "../buttons/primary-button";
import { useGetWorkspaces } from "@/hooks/use-workplace";
import { useForm } from "react-hook-form";

const WorkspaceSelectModal = ({ open, onOpenChange, onConfirm, loading }) => {
  const { data: workspaces, isLoading } = useGetWorkspaces();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { workspace: "" },
  });

  const onSubmit = (data) => {
    const selectedId = data?.workspace;
    if (!selectedId) return;
    onConfirm(selectedId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="hide-scrollbar max-h-[90vh] overflow-y-auto border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Workspace</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            Choose a workspace to move this project into.
          </p>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* WORKSPACE SELECT */}
          <CentralSelect
            name="workspace"
            label="Workspace"
            placeholder="Select Workspace"
            control={control}
            loading={isLoading}
            errors={errors}
            rules={{ required: "Please select a workspace" }}
            options={workspaces?.map((ws) => ({
              label: ws?.name || "Untitled Workspace",
              value: ws?.id,
            }))}
            contentClassName="border border-[#FFFFFF0F] bg-[#000]"
            triggerClassName="w-full border border-[#FFFFFF0F] bg-black/60 py-6 md:bg-[var(--glassic)]"
          />

          <DialogFooter className="flex w-full gap-2">
            <PrimaryButton
              className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
              title="Cancel"
              type="button"
              onClick={onOpenChange}
              disabled={loading}
            />

            <PrimaryButton
              className="flex-1 rounded-lg"
              title="Move"
              type="submit"
              loading={loading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceSelectModal;
