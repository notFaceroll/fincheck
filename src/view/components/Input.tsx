import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  const inputId = id ?? name;
  return (
    <div className="relative">
      <input
        {...props}
        name={name}
        id={inputId}
        className="px-3 placeholder-shown:pt-0 pt-4 bg-white border h-[52px] w-full text-gray-800 border-gray-500 rounded-lg peer focus:border-gray-800 transition-all outline-none"
        placeholder=" "
      />
      <label
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        htmlFor={inputId}
      >
        {placeholder}
      </label>
    </div>
  );
}
