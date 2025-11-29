import { ChevronDown, Code, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const JsonSelector = ({
  messages,
  onJsonSelect,
  currentJsonId,
  isActive = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter messages that have generated JSON
  const messagesWithJson = messages?.filter((msg) => msg.hasJson) || [];

  if (messagesWithJson.length === 0) {
    return null;
  }

  // Find the currently selected version
  const currentVersion =
    messagesWithJson.findIndex((msg) => msg.id === currentJsonId) + 1;

  // If no version is selected, default to the latest version (last one in array)
  const defaultVersion =
    currentVersion > 0 ? currentVersion : messagesWithJson.length;
  const buttonText = `Version ${defaultVersion}`;

  const handleJsonSelect = (messageId, jsonData) => {
    onJsonSelect(messageId, jsonData);
    setIsOpen(false);
  };

  return (
    <div className="mt-3 rounded-lg border-[var(--border)] bg-[var(--card-bg)] p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-medium text-[var(--text)] text-xs">
          Available versions:
        </span>
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              className={`h-8 px-3 font-medium text-xs transition-all duration-200 ${
                isActive
                  ? "border-[var(--blue)] bg-[var(--primary)] text-[var(--text)] shadow-sm hover:bg-[var(--secondary)]"
                  : "border-[var(--border)] bg-[var(--input)] text-[var(--text)] hover:border-[var(--blue)] hover:bg-[var(--primary)]"
              }`}
              disabled={disabled}
              size="sm"
              variant="outline"
            >
              <Code className="mr-1 h-3 w-3" />
              <span className="max-w-24 truncate">{buttonText}</span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-64 border-[var(--border)] bg-[var(--card-bg)] shadow-lg"
          >
            {messagesWithJson.map((message, index) => (
              <DropdownMenuItem
                className={`cursor-pointer transition-colors ${
                  currentJsonId === message.id ||
                  (!currentJsonId && index === messagesWithJson.length - 1)
                    ? "border-[var(--blue)] border-l-2 bg-[var(--primary)] font-semibold text-[var(--text)]"
                    : "hover:bg-[var(--secondary)] hover:text-[var(--text)]"
                }`}
                key={message.id}
                onClick={() =>
                  handleJsonSelect(message.id, message.generated_json)
                }
              >
                <div className="flex w-full items-center gap-2">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      currentJsonId === message.id ||
                      (!currentJsonId && index === messagesWithJson.length - 1)
                        ? "bg-[var(--blue)] text-white"
                        : "bg-[var(--secondary)] text-[var(--text)]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[var(--blue)]" />
                      <span className="truncate font-medium text-[var(--text)] text-xs">
                        Version {index + 1}
                        {(currentJsonId === message.id ||
                          (!currentJsonId &&
                            index === messagesWithJson.length - 1)) && (
                          <span className="ml-1 text-[var(--blue)] text-xs">
                            (Selected)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  {(currentJsonId === message.id ||
                    (!currentJsonId &&
                      index === messagesWithJson.length - 1)) && (
                    <div className="h-2 w-2 rounded-full bg-[var(--blue)]" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default JsonSelector;
