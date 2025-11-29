"use client";
import { Brain } from "lucide-react";
import { memo } from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

export const Response = memo(
  ({ className, isUser = false, status, header, children, ...props }) => {
    // Check if content contains HTML tags for AI messages
    const hasHtmlContent =
      !isUser && typeof children === "string" && /<[^>]+>/.test(children);

    return (
      <div
        className={cn(
          "w-full overflow-hidden break-words rounded-md ",
          isUser ? "bg-[#4000FF] text-white p-2" : "p-0"
        )}
      >
        {(status || header) && !isUser ? (
          <div className="mb-1 flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-500" />
            {status ? (
              <span className="shiny-text text-xs opacity-80">{status}</span>
            ) : (
              header
            )}
          </div>
        ) : null}

        {hasHtmlContent ? (
          <div
            className={cn(
              "ai-html-content size-full break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
              className
            )}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        ) : (
          <div className="streamdown-wrapper" data-streamdown="true">
            <Streamdown
              className={cn(
                "size-full break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
                className
              )}
              {...props}
            >
              {children}
            </Streamdown>
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.status === nextProps.status
);

Response.displayName = "Response";
