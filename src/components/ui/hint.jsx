import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Hint = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        align={align}
        alignOffset={alignOffset}
        className="rounded border-white bg-white text-black"
        side={side}
        sideOffset={sideOffset}
      >
        <p className="font-semibold capitalize">{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
