import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { motion } from "motion/react";
import { X } from "lucide-react";
import {
  modalAnimations,
  spring,
  usePrefersReducedMotion,
  type ModalAnimation,
} from "@avara/motion";
import { modalBackdropVariants, modalViewportVariants, modalPopupVariants } from "./modal.variants";

import { cn } from "../../lib/cn";
import type { SlotClassNames } from "../../lib/slot-class-names";

export type ModalClassNames = SlotClassNames<
  "base" | "header" | "body" | "footer" | "backdrop" | "closeButton"
>;
type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
type ModalRadius = "sm" | "md" | "lg" | "xl";
type ModalBackdrop = "transparent" | "opaque" | "blur";
type ModalPlacement = "auto" | "center" | "top";

export interface ModalProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  showCloseButton?: boolean;
  size?: ModalSize;
  radius?: ModalRadius;
  backdrop?: ModalBackdrop;
  placement?: ModalPlacement;
  scrollBehavior?: "inside" | "outside";
  animation?: ModalAnimation;
  classNames?: ModalClassNames;
  children: React.ReactNode;
}

const backdropFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ModalRoot = ({
  isOpen,
  defaultOpen,
  onOpenChange,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  showCloseButton = true,
  size,
  radius,
  backdrop,
  placement,
  scrollBehavior = "outside",
  animation = "scale",
  classNames,
  children,
}: ModalProps) => {
  const actionsRef = React.useRef<{ unmount: () => void; close: () => void } | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = modalAnimations[prefersReducedMotion ? "none" : animation];

  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={defaultOpen}
      modal
      actionsRef={actionsRef}
      disablePointerDismissal={!isDismissable}
      onOpenChange={(open, eventDetails) => {
        if (!open && isKeyboardDismissDisabled && eventDetails.reason === "escape-key") {
          eventDetails.cancel();
          return;
        }
        if (!open) {
          // Keep Popup/Backdrop mounted so Motion can play the exit animation;
          // we manually unmount once it finishes (see onAnimationComplete below).
          eventDetails.preventUnmountOnClose();
        }
        onOpenChange?.(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          render={(props, state) => {
            /* eslint-disable @typescript-eslint/no-unused-vars -- destructured only to exclude from the spread below (React/Motion event type conflict) */
            const {
              onDrag,
              onDragStart,
              onDragEnd,
              onAnimationStart,
              onAnimationEnd,
              ...restProps
            } = props;
            /* eslint-enable @typescript-eslint/no-unused-vars */
            return (
              <motion.div
                {...restProps}
                initial="initial"
                animate={state.open ? "animate" : "exit"}
                variants={backdropFade}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                className={cn(modalBackdropVariants({ backdrop }), classNames?.backdrop)}
              />
            );
          }}
        />
        <div className={cn(modalViewportVariants({ placement }))}>
          <Dialog.Popup
            render={(props, state) => {
              /* eslint-disable @typescript-eslint/no-unused-vars -- destructured only to exclude from the spread below (React/Motion event type conflict) */
              const {
                onDrag,
                onDragStart,
                onDragEnd,
                onAnimationStart,
                onAnimationEnd,
                ...restProps
              } = props;
              /* eslint-enable @typescript-eslint/no-unused-vars */
              return (
                <motion.div
                  {...restProps}
                  initial="initial"
                  animate={state.open ? "animate" : "exit"}
                  variants={variants}
                  transition={spring.snappy}
                  onAnimationComplete={(definition) => {
                    if (definition === "exit") {
                      actionsRef.current?.unmount();
                    }
                  }}
                  className={cn(
                    modalPopupVariants({ size, radius, placement }),
                    scrollBehavior === "inside" && "max-h-[85vh]",
                    classNames?.base,
                  )}
                >
                  {showCloseButton && (
                    <Dialog.Close
                      className={cn(
                        "absolute right-4 top-4 rounded-md text-muted transition-colors hover:text-foreground",
                        classNames?.closeButton,
                      )}
                      aria-label="Close"
                    >
                      <X className="size-4" />
                    </Dialog.Close>
                  )}
                  {restProps.children}
                </motion.div>
              );
            }}
          >
            {children}
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
ModalRoot.displayName = "Modal";

const ModalHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn("flex flex-col gap-1 border-b border-border px-6 py-4", className)}
    {...props}
  />
);
ModalHeader.displayName = "Modal.Header";

const ModalTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Title>) => (
  <Dialog.Title className={cn("text-lg font-extrabold", className)} {...props} />
);
ModalTitle.displayName = "Modal.Title";

const ModalDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Description>) => (
  <Dialog.Description className={cn("text-sm text-muted", className)} {...props} />
);
ModalDescription.displayName = "Modal.Description";

const ModalBody = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)} {...props} />
);
ModalBody.displayName = "Modal.Body";

const ModalFooter = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn(
      "flex items-center justify-end gap-2 border-t border-border px-6 py-4",
      className,
    )}
    {...props}
  />
);
ModalFooter.displayName = "Modal.Footer";

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
});
