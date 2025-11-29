import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CentralSelect = forwardRef(
  (
    {
      control,
      name,
      label,
      placeholder = "Select an option",
      options = [],
      rules = {},
      className = "",
      triggerClassName = "",
      contentClassName = "",
      showLabel = true,
      errors = {},
      id,
      loading = false, // 👈 added loading prop
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${name}`;
    const hasError = !!errors[name];

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className={`flex flex-col ${className}`} ref={ref}>
            {showLabel && label && (
              <label className="mb-1 font-medium text-sm" htmlFor={selectId}>
                {label}
              </label>
            )}

            <div
              className={`w-full rounded border ${
                hasError ? "border-red-500" : "border-[#FFFFFF0F]"
              }`}
            >
              <Select
                onValueChange={field.onChange}
                value={field.value}
                {...props}
              >
                <SelectTrigger
                  className={`w-full bg-black/60 py-3 ${triggerClassName}`}
                  id={selectId}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent
                  className={`border border-[#FFFFFF0F] bg-[#000] ${contentClassName}`}
                >
                  <SelectGroup>
                    {showLabel && label && <SelectLabel>{label}</SelectLabel>}

                    {loading ? ( // 👈 show loading indicator
                      <SelectItem disabled value="loading">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Loading...
                        </div>
                      </SelectItem>
                    ) : (
                      options.map((option) => (
                        <SelectItem
                          key={option.value || option}
                          value={option.value || option}
                        >
                          {option.label || option}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {hasError && (
              <p className="mt-1 text-red-500 text-sm">
                {errors[name]?.message}
              </p>
            )}
          </div>
        )}
        rules={rules}
      />
    );
  }
);

CentralSelect.displayName = "CentralSelect";

export default CentralSelect;
