import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";

const DateInput = forwardRef(
  ({ label, error, placeholder, id, className, ...props }, ref) => {
    const inputId =
      id || `date-input-${placeholder?.toLowerCase().replace(/\s+/g, "-")}`;

    // Get today's date in YYYY-MM-DD format
    const today = useMemo(() => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }, []);

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-[var(--text)] text-sm"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center h-12 rounded-[6px] border bg-[var(--card-bg)] md:bg-[var(--glassic)]",
            error ? "border-red-500" : "border-[var(--border)]"
          )}
        >
          <input
            type="date"
            id={inputId}
            placeholder={placeholder}
            ref={ref}
            min={today} // <-- Disable past dates
            {...props}
            className="flex-1 h-full px-4 bg-transparent border-none text-[var(--text)] placeholder:text-[var(--gray)] focus:outline-none focus:ring-0"
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
);

DateInput.displayName = "DateInput";

export default DateInput;
