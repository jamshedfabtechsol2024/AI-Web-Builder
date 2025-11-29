import { memo } from "react";
import { Separator } from "../ui/separator";

const OrSeparator = memo(() => (
  <div className="relative my-2 flex items-center justify-center gap-6 overflow-hidden">
    <Separator className="bg-[var(--separator)]" />
    <span className="px-4 text-[var(--text)] text-sm">or</span>
    <Separator className="bg-[var(--separator)]" />
  </div>
));

OrSeparator.displayName = "OrSeparator";

export default OrSeparator;
