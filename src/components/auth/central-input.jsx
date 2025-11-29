import { forwardRef, memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
const CentralInput = memo(
  forwardRef(
    (
      {
        icon,
        label,
        id,
        type = "text",
        placeholder,
        error,
        className,
        ...props
      },
      ref
    ) => {
      const [showPassword, setShowPassword] = useState(false);
      const isPassword = type === "password";
      const inputId =
        id ||
        `central-input-${placeholder?.toLowerCase().replace(/\s+/g, "-")}`;
      return (
        <div className={className}>
          {label && (
            <label
              className="mb-1 block text-[var(--text)] text-sm"
              htmlFor={inputId}
            >
              {label}
            </label>
          )}
          <div
            className={cn(
              "flex h-12 items-center justify-center rounded-[6px] border border-[var(--border)] bg-[var(--card-bg)] md:bg-[var(--glassic)]",
              error && "border-red-500"
            )}
          >
            {/* Left icon */}
            {icon && <span className="pl-4 text-[var(--text)]">{icon}</span>}
            <Input
              aria-invalid={!!error}
              className={cn(
                "transform-border border-none bg-transparent text-[var(--text)] shadow-none placeholder:text-[var(--gray)] focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-none focus-visible:ring-transparent"
              )}
              id={inputId}
              placeholder={placeholder}
              ref={ref}
              type={isPassword && showPassword ? "text" : type}
              {...props}
            />
            {/* Password toggle icon */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-4 text-[var(--gray)]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
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
CentralInput.displayName = "CentralInput";
export default CentralInput;
