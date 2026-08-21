"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogContentProps =
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title: string;
    hideHeader?: boolean;
  };

export function DialogContent({
  className,
  title,
  children,
  hideHeader = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className="
          fixed
          inset-0
          z-[80]
          bg-black/60
          backdrop-blur-sm
          data-[state=open]:animate-fade-in
        "
      />

      <DialogPrimitive.Content
        className={cn(
          `
            fixed
            left-1/2
            top-1/2
            z-[90]
            max-h-[calc(100dvh-32px)]
            w-full
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            rounded-lg
            border
            border-border
            bg-bg-surface
            shadow-xl
            outline-none
            data-[state=open]:animate-scale-in
          `,
          className
        )}
        {...props}
      >
        {!hideHeader ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <DialogPrimitive.Title className="text-lg font-semibold">
                {title}
              </DialogPrimitive.Title>

              <DialogPrimitive.Close
                aria-label="Close dialog"
                className="
                  shrink-0
                  text-text-muted
                  transition-colors
                  hover:text-text-primary
                "
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>

            <div className="mt-4">
              {children}
            </div>
          </>
        ) : (
          children
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;