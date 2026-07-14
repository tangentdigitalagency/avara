import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { duration, ease } from "../../lib/motion-tokens";
import { buttonVariants } from "./button.variants";
import { cn } from "../../lib/cn";

export interface ButtonProps
  extends
    Omit<HTMLMotionProps<"button">, "color" | "children">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  isDisabled?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  children?: React.ReactNode;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      radius,
      isLoading = false,
      isDisabled = false,
      startContent,
      endContent,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const disabled = isDisabled || isLoading;

    return (
      <motion.button
        ref={ref}
        type="button"
        aria-disabled={disabled || undefined}
        data-loading={isLoading || undefined}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ duration: duration.fast, ease: ease.out }}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        className={cn(buttonVariants({ variant, color, size, radius }), className)}
        {...props}
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : startContent}
        {children}
        {!isLoading && endContent}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
