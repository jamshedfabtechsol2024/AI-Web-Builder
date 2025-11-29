import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrimaryButton from "../buttons/primary-button";

// In a real app, this would come from an API or context
const DEVELOPERS = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
];

const AssignDeveloperModal = ({ open, onOpenChange }) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  const handleSave = () => {
    // Save logic would go here
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedDeveloper("");
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border border-[#FFFFFF0F] bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Developer</DialogTitle>
          <p className="text-[var(--light-white)] text-sm">
            Here you can assign developers to this request.
          </p>
        </DialogHeader>

        <div className="py-6">
          <Select
            onValueChange={setSelectedDeveloper}
            value={selectedDeveloper}
          >
            <SelectTrigger className="w-full border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
              <SelectValue placeholder="Select Developer" />
            </SelectTrigger>
            <SelectContent className="border border-[#FFFFFF0F] bg-[#000]">
              <SelectGroup>
                <SelectLabel>Developers</SelectLabel>
                {DEVELOPERS.map((developer) => (
                  <SelectItem key={developer.id} value={developer.id}>
                    {developer.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex w-full gap-2">
          <PrimaryButton
            className="flex-1 rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F]"
            onClick={handleCancel}
            title="Cancel"
          />
          <PrimaryButton
            className="flex-1 rounded-lg"
            disabled={!selectedDeveloper}
            onClick={handleSave}
            title="Save"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeveloperModal;
