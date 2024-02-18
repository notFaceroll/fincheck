import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "h-12 px-6 mt-2 font-medium text-white transition-all bg-teal-900 rounded-2xl hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center",
        variant === 'danger' && "bg-red-900 hover:bg-red-800",
        variant === 'ghost' && "border border-gray-800 bg-transparent hover:bg-gray-100 text-gray-800",
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
