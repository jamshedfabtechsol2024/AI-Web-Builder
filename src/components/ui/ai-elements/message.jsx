import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const Message = ({ className, from, ...props }) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-0 py-1",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      "[&>div]:min-w-0 [&>div]:max-w-[100%]",
      className
    )}
    {...props}
  />
);

export const MessageContent = ({ children, className, ...props }) => (
  <div
    className={cn(
      "flex flex-col gap-0 overflow-hidden rounded-lg px-2 py-1 text-foreground text-sm",
      "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
      "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
      "is-user:dark",
      "break-words",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const MessageAvatar = ({ src, name, className, ...props }) => (
  <Avatar className={cn("size-8 ring-1 ring-border", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
