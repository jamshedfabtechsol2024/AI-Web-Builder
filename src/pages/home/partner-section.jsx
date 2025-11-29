import { InfiniteMovingPartner } from "@/components/ui/infinite-moving-partners";
import { PARTNERS_LOGO } from "@/data/partner-data";

function PartnerSection() {
  return (
    <section className="mb-2 w-full space-y-12 border-[var(--border)] border-t border-b bg-[var(--background)] py-16">
      <div className="flex flex-col gap-6">
        <InfiniteMovingPartner
          direction="left"
          items={PARTNERS_LOGO}
          speed="slow"
        />
      </div>
    </section>
  );
}

export default PartnerSection;
