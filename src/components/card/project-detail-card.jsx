import { Image } from "lucide-react";
import { useState } from "react";
import PrimaryButton from "../buttons/primary-button";
import MediaPreviewModal from "../modals/media-preview-modal";
import { Card } from "../ui/card";

const ProjectDetailCard = ({
  projectId,
  projectName,
  price,
  paymentDate,
  deadline,
  status,
  media,
  description,
}) => {
  const [open, setOpen] = useState(false);
  const statusClass =
    {
      completed: "text-green-600",
      pending: "text-yellow-500",
      rejected: "text-red-500",
      cancelled: "text-red-500",
      withdraw: "text-red-500",
    }[status] ?? "text-blue-500";
  return (
    <Card className="!p-4 !py-6 gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Project ID:</p>
          <p className="text-sm">{projectId}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Project Name:</p>
          <p className="text-sm">{projectName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Price:</p>
          <p className="text-sm">{price}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Payment Date:</p>
          <p className="text-sm">{paymentDate}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Deadline:</p>
          <p className="text-sm">{deadline}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Status:</p>
          <p className={`font-medium text-sm ${statusClass}`}>{status}</p>
        </div>
      </div>

      {/* Media Section */}
      {media?.url && (
        <div className="mt-4 flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Media:</p>
          <div className="flex w-fit min-w-[300px] items-center justify-between rounded-lg border border-[#FFFFFF0F] bg-[#FFFFFF0F] px-4 py-1 text-white">
            {/* Left: Icon + File Name */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Image className="h-6 w-6 text-gray-300" />
                <span className="font-medium text-sm"> File Preview </span>
              </div>

              {/* Middle dot + Preview */}
              {/* <div className="flex items-center">
                <span className="text-gray-500">•</span>
                <PrimaryButton
                  className="bg-transparent px-1 text-[var(--light-blue)] hover:underline"
                  onClick={() => setOpen(true)}
                  title="Preview"
                />
              </div> */}
            </div>

            {/* Right: File Size */}
            <div className="flex items-center">
              <span className="text-gray-500">•</span>
              <PrimaryButton
                className="bg-transparent px-1 text-[var(--light-blue)] hover:underline"
                onClick={() => setOpen(true)}
                title="Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="mt-4 flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Description:</p>
          <p className="text-sm">{description}</p>
        </div>
      )}

      {media?.type && (
        <MediaPreviewModal
          onOpenChange={setOpen}
          open={open}
          type={media.type}
          url={media.url}
        />
      )}
    </Card>
  );
};

export default ProjectDetailCard;
