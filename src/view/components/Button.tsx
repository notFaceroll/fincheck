import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
}

export function Button(props: ButtonProps) {
  return <button className="h-12 px-6 mt-2 font-medium text-white transition-all bg-teal-900 rounded-2xl hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed" {...props} />;
}
