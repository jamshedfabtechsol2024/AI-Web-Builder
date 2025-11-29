import { Card } from "@/components/ui/card";

const projectDetails = {
  projectTitle: "E-commerce Website Revamp",
  developer: "Bob (bob.developer@example.com)",
  requestDate: "2025-08-28",
  projectStatus: "In Review",
  description: `
    This project involves redesigning the existing e-commerce platform to improve user experience, add responsive layouts, and integrate 
    a secure payment gateway. 

  `,
};

const invoiceItems = [
  {
    item: "Developer Service Fee",
    description: "Fixed fee for project work",
    amount: 450.0,
  },
  {
    item: "Platform Fee (10%)",
    description: "Admin + support & escrow coverage",
    amount: 45.0,
  },
  {
    item: "Taxes",
    description: "VAT / Sales Tax",
    amount: 0.0,
  },
];

const totalPayables = invoiceItems.reduce((sum, i) => sum + i.amount, 0);

const InvoiceDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="!p-4 !py-6 gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
        {/* Top Grid Section */}
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Project Title:", value: projectDetails.projectTitle },
            { label: "Developer:", value: projectDetails.developer },
            { label: "Request Date:", value: projectDetails.requestDate },
            { label: "Project Status:", value: projectDetails.projectStatus },
          ].map((field, index) => (
            <div className="flex flex-col gap-1" key={field.label || index}>
              <p className="text-[#969595] text-lg">{field.label}</p>
              <p className="text-sm">{field.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        {projectDetails.description && (
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-[#969595] text-lg">Description:</p>
            <p className="whitespace-pre-line text-sm">
              {projectDetails.description}
            </p>
          </div>
        )}
      </Card>

      <Card className="!p-4 !py-6 border border-[#FFFFFF0F] bg-[#FFFFFF0F]">
        {/* Header Row (only visible on larger screens) */}
        <div className="hidden border-white/10 border-b pb-2 font-medium text-[#969595] text-sm sm:grid sm:grid-cols-3 md:text-lg">
          <p>Item</p>
          <p>Description</p>
          <p className="text-right">Amount</p>
        </div>

        {/* Items */}
        <div className="divide-y divide-[#2C2C2C]">
          {invoiceItems.map((row, idx) => (
            <div
              className="flex flex-col py-3 text-sm sm:grid sm:grid-cols-3 sm:items-center"
              key={row.item || idx}
            >
              {/* Mobile Layout */}
              <div className="flex justify-between sm:hidden">
                <span className="text-[#969595]">Item</span>
                <span className="font-medium text-white">{row.item}</span>
              </div>
              <div className="mt-1 flex justify-between sm:hidden">
                <span className="text-[#969595]">Amount</span>
                <span className="text-white">${row.amount.toFixed(2)}</span>
              </div>

              {/* Desktop Layout */}
              <p className="hidden font-medium sm:block">{row.item}</p>
              <p className="hidden text-[#E5E5E5] sm:block">
                {row.description}
              </p>
              <p className="hidden text-right sm:block">
                ${row.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Total */}
        <div className="mt-4 flex flex-col border-white/10 border-t pt-3 font-semibold text-base sm:flex-row sm:justify-between">
          <p>Total Payables</p>
          <p className="text-right sm:text-left">${totalPayables.toFixed(2)}</p>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceDetails;
