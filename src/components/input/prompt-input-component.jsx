import { memo } from "react";
import { Icons } from "@/components/shared/icons";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/ai-elements/prompt-input";

const PromptInputComponent = memo(
  ({ onChange, value = "", onSubmit, disabled = false }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (value.trim() && !disabled && onSubmit) {
        onSubmit(value);
      }
    };

    return (
      <div className="mobile-prompt-input relative flex h-full w-full items-center justify-center rounded-2xl text-white backdrop-blur-xl">
        <PromptInput
          className="relative w-full border-[var(--dark-blue)]/50 bg-[var(--hero-bg)] p-1 sm:p-2"
          onSubmit={handleSubmit}
        >
          <PromptInputTextarea
            className="h-16 w-full resize-none bg-transparent text-[var(--text)] placeholder:text-[var(--gray)] sm:h-20"
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            value={value}
          />

          <PromptInputToolbar>
            <div className="flex items-center gap-1 sm:gap-2">
              {/* <div className="cursor-pointer rounded-full border border-[var(--border)] bg-[var(--card-bg)] p-1.5 text-[var(--text)] sm:p-2">
                <Icons.plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </div> */}
            </div>

            <PromptInputSubmit
              className="absolute right-1 bottom-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] p-1.5 text-[var(--text)] sm:right-2 sm:bottom-2 sm:p-2"
              disabled={disabled || !value.trim()}
              status={disabled ? "submitted" : "ready"}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    );
  }
);

PromptInputComponent.displayName = "PromptInputComponent";

export default PromptInputComponent;
