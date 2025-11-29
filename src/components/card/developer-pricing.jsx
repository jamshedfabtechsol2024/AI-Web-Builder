import { memo } from "react";
import PrimaryButton from "../buttons/primary-button";
import CentralLine from "../landing/central-line";

const DeveloperPricing = memo(
  ({
    title = "N/A",
    price = 0,
    active = false,
    deliveryTime = "N/A",
    revisions = 1,
    description = "N/A",
    features = [],
    onEdit,
    onDelete,
    type = "edit",
    onSelect,
  }) => {
    return (
      <div className="flex flex-col gap-2 overflow-hidden rounded-3xl border border-transparent bg-[var(--price-card-bg)] p-4 shadow-[0.9px_-0.9px_31.2px_0px_#8482821A_inset]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[var(--text)] text-xl 2xl:text-2xl">
            {title}
          </h1>
          <p
            className={`rounded-full px-4 py-1 text-sm ${
              active
                ? "bg-[#22C55E1A] text-[#22C55E]"
                : "bg-red-100 text-red-600"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </p>
        </div>

        {/* Price */}
        <h1 className="font-semibold text-3xl text-[var(--text)]">${price}</h1>

        {/* Delivery & Revisions */}
        <div className="flex items-center gap-16">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-[var(--text)]/70 text-xs">
              Delivery Time
            </h1>
            <p className="text-[var(--text)] text-xs">{deliveryTime}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-[var(--text)]/70 text-xs">
              Revisions
            </h1>
            <p className="text-[var(--text)] text-xs">{revisions}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-[var(--text)]/70 text-xs">
            Description
          </h1>
          <p className="text-[var(--text)] text-xs">{description}</p>
        </div>

        <CentralLine showRightDot />

        {/* Features */}
        <h1 className="font-semibold text-[var(--text)]/70 text-xs">
          Features Included
        </h1>
        <ul className="list-inside list-disc space-y-1 pl-2">
          {features.map((feature) => (
            <li className="font-light text-[var(--text)] text-xs" key={feature}>
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions */}
        {type === "edit" && (
          <div className="mt-auto flex items-center gap-2">
            <PrimaryButton
              className="mt-4 h-8 flex-1 rounded-md bg-[var(--light-blue)] px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
              onClick={onEdit}
              title="Edit"
            />
            <PrimaryButton
              className="mt-4 h-8 flex-1 rounded-md bg-red-500 px-10"
              onClick={onDelete}
              title="Delete"
            />
          </div>
        )}

        {type === "select" && (
          <div className="mt-auto flex items-center gap-2">
            <PrimaryButton
              className="mt-4 h-10 w-full rounded-md bg-[var(--light-blue)] px-10 shadow-[inset_1px_1px_4px_0px_#1471EC33,inset_1px_1px_2px_0px_#1471EC66]"
              onClick={onSelect}
              title="Select Plan"
            />
          </div>
        )}
      </div>
    );
  }
);

DeveloperPricing.displayName = "DeveloperPricing";

export default DeveloperPricing;
