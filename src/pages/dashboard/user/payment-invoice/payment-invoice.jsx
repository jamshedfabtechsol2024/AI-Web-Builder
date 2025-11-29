import PrimaryButton from "@/components/buttons/primary-button";
import { SEOMeta } from "@/components/seo/seo-meta";
import InvoiceDetails from "./invoice-details";

const PaymentInvoice = () => (
  <>
    <SEOMeta
      description="Manage your AI-powered website projects from the Admin Dashboard. Track performance, configure settings, and streamline your workflow with ease."
      imagePath=""
      keywords="admin dashboard, Staron AI, website management, analytics, settings, projects"
      path="/"
      title="Project Invoice - Staron AI"
    />

    <main className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="mb-4 flex flex-col gap-1">
          <h1 className="text-xl">Project Invoice</h1>
          <p className="text-[#696969] text-xs">
            Review and confirm the project details before making a secure
            payment.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton
            className="!py-2 rounded-full bg-[var(--light-blue)] px-8 text-white"
            title="Pay Now"
          />
        </div>
      </div>

      <InvoiceDetails />
    </main>
  </>
);

export default PaymentInvoice;
