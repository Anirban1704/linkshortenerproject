"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

type TriggerProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
> & {
  asChild?: boolean;
};

function DialogTrigger({ asChild = false, children, ...props }: TriggerProps) {
  if (asChild) {
    let renderElement: React.ReactElement | undefined;

    try {
      renderElement = React.Children.only(children) as React.ReactElement;
    } catch {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "DialogTrigger: `asChild` requires exactly one valid React element child.",
        );
      }
      return (
        <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
      );
    }

    return <DialogPrimitive.Trigger render={renderElement} {...props} />;
  }

  return (
    <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>
  );
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/70", className)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          className,
        )}
        {...props}
      >
        <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl outline-none">
          {children}
        </div>
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-semibold text-zinc-50", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("mt-2 text-sm leading-6 text-zinc-400", className)}
      {...props}
    />
  );
}

function DialogCloseButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg text-zinc-400 transition cursor-pointer hover:bg-zinc-800 hover:text-zinc-100",
        className,
      )}
      {...props}
    >
      <XIcon className="size-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
};
