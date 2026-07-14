import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { spring } from "../../lib/motion-tokens";
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
      shadow,
      fullWidth,
      isIconOnly,
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

    if (process.env.NODE_ENV !== "production") {
      if (isIconOnly && !(props["aria-label"] || props["aria-labelledby"] || props.title)) {
        console.warn(
          "[Avara] Button: isIconOnly buttons have no visible text — pass aria-label so screen reader users know what this button does.",
        );
      }
      if (isIconOnly && children) {
        console.warn(
          "[Avara] Button: children is ignored when isIconOnly is true — pass the icon via startContent instead.",
        );
      }
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        aria-disabled={disabled || undefined}
        data-loading={isLoading || undefined}
        whileTap={disabled ? undefined : { scale: 0.96, y: 1 }}
        transition={spring.snappy}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        className={cn(
          buttonVariants({ variant, color, size, radius, shadow, fullWidth, isIconOnly }),
          className,
        )}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" aria-hidden="true" /> : startContent}
        {!isIconOnly && children}
        {!isIconOnly && !isLoading && endContent}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
