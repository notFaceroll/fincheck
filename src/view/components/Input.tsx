import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            "px-3 placeholder-shown:pt-0 pt-4 bg-white border h-[52px] w-full text-gray-800 border-gray-500 rounded-lg peer focus:border-gray-800 transition-all outline-none",
            error && "!border-red-900",
            className
          )}
          placeholder=" "
        />
        <label
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
          htmlFor={inputId}
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
