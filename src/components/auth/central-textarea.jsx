import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

const CentralTextarea = memo(
  forwardRef(
    (
      { icon, label, id, placeholder, error, className, rows = 4, ...props },
      ref
    ) => {
      // Generate an id if not provided
      const textareaId =
        id ||
        `central-textarea-${placeholder?.toLowerCase().replace(/\s+/g, "-")}`;

      return (
        <div className={className}>
          {label && (
            <label
              className="mb-1 block text-[var(--text)] text-sm"
              htmlFor={textareaId}
            >
              {label}
            </label>
          )}
          <div
            className={cn(
              "flex items-start justify-center rounded-[6px] border border-[var(--border)] bg-[var(--card-bg)] md:bg-[var(--glassic)]",
              error && "border-red-500"
            )}
          >
            {icon && (
              <span className="pt-3 pl-4 text-[var(--text)]">{icon}</span>
            )}
            <textarea
              aria-invalid={!!error}
              className={cn(
                "w-full resize-none rounded-[6px] bg-transparent p-3 text-[var(--text)] placeholder:text-[var(--gray)] focus:outline-none focus:ring-0"
              )}
              id={textareaId}
              placeholder={placeholder}
              ref={ref}
              rows={rows}
              {...props}
            />
          </div>
          {error && (
            <p className="mt-1 text-red-500 text-xs" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

CentralTextarea.displayName = "CentralTextarea";

export default CentralTextarea;
