import { Loader2 } from "lucide-react";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const PrimaryButton = memo(
  ({
    icon,
    title = "Primary Button",
    onClick,
    type = "button",
    className,
    loading = false,
    disabled = false,
  }) => (
    <Button
      className={cn(
        "flex h-12 cursor-pointer items-center gap-2 bg-[var(--dark-blue)] text-white",
        className
      )}
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </Button>
  )
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
