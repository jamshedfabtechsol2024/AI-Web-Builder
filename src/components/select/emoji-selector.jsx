import * as React from "react";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "../shared/icons";

export default function EmojiSelector({ onSelect }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Icons.Emoji
          className="-translate-y-1/2 absolute top-1/2 right-2 h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-200 sm:right-3 sm:h-5 sm:w-5"
          onClick={() => setIsOpen(true)}
        />
      </PopoverTrigger>

      <PopoverContent className="w-fit border-[var(--border)] bg-[var(--background)] p-0">
        <EmojiPicker
          className="h-[342px]"
          onEmojiSelect={({ emoji }) => {
            setIsOpen(false);

            onSelect?.(emoji); // callback to parent
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
