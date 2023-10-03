import * as RdxPopover from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn";

function PopoverRoot({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        sideOffset={16}
        className={cn(
          "flex flex-col z-[99] gap-2 p-4 bg-white border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] rounded-2xl",
          "data-[side=top]:animate-slide-down-and-fade",
          "data-[side=bottom]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
