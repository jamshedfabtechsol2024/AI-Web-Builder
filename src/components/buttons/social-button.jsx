import { Loader2 } from "lucide-react"; // spinner icon
import { memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const SocialButton = memo(
  ({
    icon,
    title = "Social Button",
    onClick,
    type = "button",
    className,
    loading = false,
  }) => (
    <Button
      className={cn(
        "flex h-12 cursor-pointer items-center gap-2 border border-[var(--border)] bg-transparent text-[var(--text)]",
        loading && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={loading}
      onClick={loading ? undefined : onClick}
      type={type}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {title}
    </Button>
  )
);

SocialButton.displayName = "SocialButton";

export default SocialButton;
