import { Check, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const CentralMultiSelect = forwardRef(
  (
    {
      control,
      name,
      label,
      placeholder = "Select options",
      options = [],
      rules = {},
      className = "",
      triggerClassName = "",
      contentClassName = "",
      showLabel = true,
      errors = {},
      id,
      searchable = true,
    },
    ref
  ) => {
    const selectId = id || `multiselect-${name}`;
    const hasError = !!errors[name];
    const triggerRef = useRef(null);
    const [popoverWidth, setPopoverWidth] = useState("auto");

    useEffect(() => {
      if (triggerRef.current) {
        setPopoverWidth(`${triggerRef.current.offsetWidth}px`);
      }
    }, [triggerRef.current]);

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selectedValues = field.value || [];

          const toggleValue = (value) => {
            if (selectedValues.includes(value)) {
              field.onChange(selectedValues.filter((v) => v !== value));
            } else {
              field.onChange([...selectedValues, value]);
            }
          };

          const allValues = options.map((o) => o.value || o);
          const allSelected =
            selectedValues.length === allValues.length && allValues.length > 0;

          const handleSelectAllToggle = () => {
            if (allSelected) {
              field.onChange([]); // deselect all
            } else {
              field.onChange(allValues); // select all
            }
          };

          const removeValue = (value) => {
            field.onChange(selectedValues.filter((v) => v !== value));
          };

          return (
            <div className={`flex flex-col ${className}`} ref={ref}>
              {showLabel && label && (
                <label
                  className="mb-1 font-medium text-gray-200 text-sm"
                  htmlFor={selectId}
                >
                  {label}
                </label>
              )}

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      `flex min-h-[42px] w-full flex-wrap items-center gap-2 rounded border bg-black/60 px-3 py-2 text-sm text-white ${
                        hasError ? "!border-red-500" : "border-[#FFFFFF0F]"
                      } focus:outline-none`,
                      triggerClassName
                    )}
                    id={selectId}
                    ref={triggerRef}
                    type="button"
                  >
                    {selectedValues.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {options
                          .filter((o) => selectedValues.includes(o.value || o))
                          .map((o) => (
                            <span
                              className="flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1 font-medium text-xs"
                              key={o.value || o}
                            >
                              {o.label || o}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeValue(o.value || o);
                                }}
                              />
                            </span>
                          ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">{placeholder}</span>
                    )}
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className={cn(
                    "rounded-lg border border-[#FFFFFF0F] bg-black p-0 text-white shadow-lg",
                    contentClassName
                  )}
                  style={{ width: popoverWidth }}
                >
                  <Command>
                    {searchable && (
                      <CommandInput
                        className="text-sm"
                        placeholder="Search..."
                      />
                    )}
                    <CommandList>
                      <CommandEmpty>No options found.</CommandEmpty>

                      {/* Select / Deselect All */}
                      <CommandGroup>
                        <CommandItem
                          className="cursor-pointer font-medium text-blue-400 hover:bg-blue-500/20"
                          onSelect={handleSelectAllToggle}
                        >
                          {allSelected ? "Deselect All" : "Select All"}
                        </CommandItem>
                      </CommandGroup>

                      <CommandGroup>
                        {options.map((option, index) => {
                          const value = option.value || option;
                          const optionLabel = option.label || option;
                          const isSelected = selectedValues.includes(value);

                          return (
                            <div key={value}>
                              <CommandItem
                                className="flex cursor-pointer items-center gap-2 hover:bg-white/10"
                                onSelect={() => toggleValue(value)}
                              >
                                <div
                                  className={cn(
                                    "flex h-4 w-4 items-center justify-center rounded-sm border border-white/30",
                                    isSelected &&
                                      "border-transparent bg-[var(--dark-blue)]"
                                  )}
                                >
                                  {isSelected && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span>{optionLabel}</span>
                              </CommandItem>

                              {/* Divider (skip after last item) */}
                              {index < options.length - 1 && (
                                <div className="my-1 h-px w-full bg-white/10" />
                                // or use <Separator className="my-1 bg-white/10" />
                              )}
                            </div>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {hasError && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          );
        }}
        rules={rules}
      />
    );
  }
);

CentralMultiSelect.displayName = "CentralMultiSelect";

export default CentralMultiSelect;
