import { Card } from "../ui/card";

const RequestDetailCard = ({
  requestedBy,
  email,
  userType,
  projectType,
  submittedOn,
  assignedDevelopers,
  currentStatus,
  description,
}) => {
  const statusClass =
    {
      Completed: "text-green-600",
      Pending: "text-yellow-500",
      InProgress: "text-blue-500",
    }[currentStatus] ?? "text-gray-400";

  return (
    <Card className="!p-4 !py-6 gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Requested by:", value: requestedBy },
          { label: "Email:", value: email },
          { label: "User Type:", value: userType },
          { label: "Project :", value: projectType },
          { label: "Submitted On:", value: submittedOn },
          {
            label: "Assigned Developers:",
            value: assignedDevelopers || "Not yet",
          },
          { label: "Current Status:", value: currentStatus, status: true },
        ].map((field, index) => (
          <div className="flex flex-col gap-1" key={field?.label || index}>
            <p className="text-[#969595] text-lg">{field.label}</p>
            <p
              className={`text-sm ${
                field.status ? `font-medium ${statusClass}` : ""
              }`}
            >
              {field.value}
            </p>
          </div>
        ))}
      </div>

      {/* Description */}
      {description && (
        <div className="mt-4 flex flex-col gap-1">
          <p className="text-[#969595] text-lg">Description:</p>
          <p className="whitespace-pre-line text-sm">{description}</p>
        </div>
      )}
    </Card>
  );
};

export default RequestDetailCard;
