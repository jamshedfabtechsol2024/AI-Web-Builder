import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React, { forwardRef, memo } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput as CommandInputPrimitive,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const PhoneInput = memo(
  forwardRef(
    ({ error, className, label, id, onChange, value, name, ...props }, ref) => {
      name = name || "phoneNumber";

      const inputId = id || `${name}-input`;

      return (
        <div className={className}>
          {label && (
            <label className="mb-1 block text-sm" htmlFor={inputId}>
              {label}
            </label>
          )}
          <div
            className={cn(
              "!shadow-none flex h-12 items-center rounded-[6px] border border-[var(--border)] bg-[var(--card-bg)] md:bg-[var(--glassic)]",
              error && "border-red-500"
            )}
          >
            <RPNInput.default
              className="!shadow-none !border-none flex w-full"
              countrySelectComponent={CountrySelect}
              defaultCountry="US"
              flagComponent={FlagComponent}
              inputComponent={InputComponent}
              name={name}
              onChange={(val) => {
                if (onChange) {
                  onChange(val);
                }
              }}
              ref={ref}
              value={value}
              {...props}
            />
          </div>
          {error && (
            <p className="mt-1 text-red-500 text-xs" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

PhoneInput.displayName = "PhoneInput";

const InputComponent = forwardRef(({ className, ...props }, ref) => (
  <Input
    className={cn(
      "h-full w-full border-none bg-transparent px-3 text-sm shadow-none placeholder:text-white focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-transparent md:placeholder:text-[var(--gray)]",
      className
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}) => {
  const scrollAreaRef = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        open && setSearchValue("");
      }}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <Button
          className="mt-1 flex h-full items-center gap-1 rounded-r-none rounded-l-[6px] border-white/20 border-r px-3 focus:z-10"
          disabled={disabled}
          size="sm"
          type="button"
          variant="ghost"
        >
          <div className="flex h-full items-center gap-1">
            <FlagComponent
              country={selectedCountry}
              countryName={selectedCountry}
            />
            <ChevronsUpDown
              className={cn(
                "-mr-2 size-3 text-[var(--text)] opacity-50",
                disabled ? "hidden" : "opacity-100"
              )}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[280px] border border-white/20 bg-white/70 p-0 backdrop-blur-lg md:bg-[var(--glassic)]"
      >
        <Command className="bg-transparent">
          <CommandInputPrimitive
            className="text-sm"
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
            value={searchValue}
          />
          <CommandList>
            <ScrollArea className="h-72" ref={scrollAreaRef}>
              <CommandEmpty className="py-2 text-center text-foreground/70 text-sm">
                No country found.
              </CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      country={value}
                      countryName={label}
                      key={value}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                      selectedCountry={selectedCountry}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem
      className="gap-2 text-sm hover:bg-white/10 aria-selected:bg-white/10"
      onSelect={handleSelect}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1">{countryName}</span>
      <span className="text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 items-center overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export default PhoneInput;
