import * as React from "react";
import { cn } from "../lib/cn";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = ({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps): JSX.Element => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const newOpen = !open;
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <div className="relative">
      <div onClick={handleToggle}>{trigger}</div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              if (!isControlled) {
                setInternalOpen(false);
              }
              onOpenChange?.(false);
            }}
          />
          <div className="absolute right-0 top-full mt-2 z-50">{children}</div>
        </>
      )}
    </div>
  );
};

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-lg shadow-lg border border-[#0000001a] p-3",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
PopoverContent.displayName = "PopoverContent";
