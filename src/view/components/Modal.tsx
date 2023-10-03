import * as RdxDialog from "@radix-ui/react-dialog";
import { cn } from "../../app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  rightAction?: React.ReactNode;
  onClose?: () => void;
}

export function Modal({ open, children, title, rightAction, onClose }: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-overlay-show"
          )}
        />
        <RdxDialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none",
            "data-[state=open]:animate-content-show p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px]"
          )}
        >
          <header className="flex items-center justify-between h-12 text-gray-800">
            <button className="flex items-center justify-center w-12 h-12 outline-none" onClick={onClose}>
              <Cross2Icon className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold tracking-[-1px]">{title}</span>
            <div className="flex items-center justify-center w-12 h-12">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
