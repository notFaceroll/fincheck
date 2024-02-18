import * as RdxSelect from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value?: string;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute z-10 text-gray-700 -translate-y-1/2 pointer-events-none top-1/2 left-3",
            selectedValue &&
              "text-xs left-[13px] top-2 transition-all translate-y-0"
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              "px-3 bg-white border h-[52px] w-full text-gray-800 border-gray-500 rounded-lg  focus:border-gray-800 transition-all outline-none text-left relative pt-4",
              error && "!border-red-900",
              className
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute -translate-y-1/2 right-3 top-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden bg-white p-2 rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    className="p-2 text-sm outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors text-gray-800 data-[state=checked]:font-bold"
                    value={option.value}
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
