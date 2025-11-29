import { X } from "lucide-react";
import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SkillsInput = forwardRef(
  (
    {
      value = [],
      onChange,
      placeholder = "Add a skill and press Enter",
      label,
      id,
      error,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");

    // Generate id if not provided
    const inputId =
      id || `skills-input-${placeholder?.toLowerCase().replace(/\s+/g, "-")}`;

    const addSkill = (skill) => {
      const trimmed = skill.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
    };

    const removeSkill = (skill) => {
      onChange(value.filter((s) => s !== skill));
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkill(inputValue);
        setInputValue("");
      }
      if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
        removeSkill(value[value.length - 1]); // backspace deletes last skill
      }
    };

    return (
      <div className={className}>
        {label && (
          <label
            className="mb-1 block text-[var(--text)] text-sm"
            htmlFor={inputId}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex flex-wrap items-center gap-2 rounded-[6px] border border-[var(--border)] bg-[var(--card-bg)] px-2 py-2 md:bg-[var(--glassic)]",
            "h-auto min-h-[48px]",
            error && "border-red-500"
          )}
        >
          {icon && <span className="pl-2 text-[var(--text)]">{icon}</span>}

          {/* Render badges */}
          {value.map((skill) => (
            <span
              className="flex items-center gap-2 rounded-full border border-white/30 bg-black px-3 py-1 text-sm"
              key={skill}
            >
              {skill}
              <button
                className="text-white/60 hover:text-white"
                onClick={() => removeSkill(skill)}
                type="button"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {/* Input */}
          <Input
            aria-invalid={!!error}
            className={cn(
              "transform-border h-8 min-w-[120px] flex-1 border-none bg-transparent text-[var(--text)] shadow-none placeholder:text-[var(--gray)] focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-none focus-visible:ring-transparent"
            )}
            id={inputId}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={ref}
            value={inputValue}
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
);

SkillsInput.displayName = "SkillsInput";

export default SkillsInput;
