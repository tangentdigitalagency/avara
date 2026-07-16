import { cva } from "class-variance-authority";
import { colorFocusRingClass } from "../../lib/color-focus-ring";

export const radioVariants = cva(
  "peer relative inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-transparent transition-[background-color,border-color,box-shadow,transform] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-90 data-disabled:opacity-50 data-disabled:pointer-events-none data-readonly:cursor-default backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturate)",
  {
    variants: {
      variant: {
        solid: "",
        outline: "",
        soft: "",
        ghost: "",
      },
      color: {
        primary: "",
        secondary: "",
        neutral: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
      },
      size: {
        xs: "size-3.5",
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-7",
      },
      isInvalid: {
        true: "",
        false: "",
      },
      // "stagger" behaves identically to "pop" here on purpose — a dot indicator
      // has no path to stagger-draw, but the prop stays for API consistency
      // with Checkbox/Switch rather than silently dropping a value elsewhere real.
      motion: {
        pop: "data-checked:[animation:checkbox-pop_0.35s_var(--ease-spring)] motion-reduce:data-checked:[animation:none]",
        wave: "",
        stagger:
          "data-checked:[animation:checkbox-pop_0.35s_var(--ease-spring)] motion-reduce:data-checked:[animation:none]",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        class: "data-checked:border-primary-500 data-checked:bg-primary-500",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "data-checked:border-secondary-500 data-checked:bg-secondary-500",
      },
      {
        variant: "solid",
        color: "neutral",
        class:
          "data-checked:border-neutral-900 data-checked:bg-neutral-900 dark:data-checked:border-neutral-100 dark:data-checked:bg-neutral-100",
      },
      {
        variant: "solid",
        color: "success",
        class: "data-checked:border-success-500 data-checked:bg-success-500",
      },
      {
        variant: "solid",
        color: "warning",
        class: "data-checked:border-warning-500 data-checked:bg-warning-500",
      },
      {
        variant: "solid",
        color: "danger",
        class: "data-checked:border-danger-500 data-checked:bg-danger-500",
      },
      {
        variant: "solid",
        color: "info",
        class: "data-checked:border-info-500 data-checked:bg-info-500",
      },
      {
        variant: "outline",
        color: "primary",
        class: "data-checked:border-primary-500",
      },
      {
        variant: "outline",
        color: "secondary",
        class: "data-checked:border-secondary-500",
      },
      {
        variant: "outline",
        color: "neutral",
        class: "data-checked:border-neutral-500",
      },
      {
        variant: "outline",
        color: "success",
        class: "data-checked:border-success-500",
      },
      {
        variant: "outline",
        color: "warning",
        class: "data-checked:border-warning-500",
      },
      {
        variant: "outline",
        color: "danger",
        class: "data-checked:border-danger-500",
      },
      {
        variant: "outline",
        color: "info",
        class: "data-checked:border-info-500",
      },
      {
        variant: "soft",
        color: "primary",
        class: "data-checked:border-transparent data-checked:bg-primary-500/15",
      },
      {
        variant: "soft",
        color: "secondary",
        class: "data-checked:border-transparent data-checked:bg-secondary-500/15",
      },
      {
        variant: "soft",
        color: "neutral",
        class: "data-checked:border-transparent data-checked:bg-neutral-500/10",
      },
      {
        variant: "soft",
        color: "success",
        class: "data-checked:border-transparent data-checked:bg-success-500/15",
      },
      {
        variant: "soft",
        color: "warning",
        class: "data-checked:border-transparent data-checked:bg-warning-500/15",
      },
      {
        variant: "soft",
        color: "danger",
        class: "data-checked:border-transparent data-checked:bg-danger-500/15",
      },
      {
        variant: "soft",
        color: "info",
        class: "data-checked:border-transparent data-checked:bg-info-500/15",
      },
      {
        variant: "ghost",
        color: "primary",
        class: "data-checked:border-primary-300",
      },
      {
        variant: "ghost",
        color: "secondary",
        class: "data-checked:border-secondary-300",
      },
      {
        variant: "ghost",
        color: "neutral",
        class: "data-checked:border-neutral-300",
      },
      {
        variant: "ghost",
        color: "success",
        class: "data-checked:border-success-300",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "data-checked:border-warning-300",
      },
      {
        variant: "ghost",
        color: "danger",
        class: "data-checked:border-danger-300",
      },
      {
        variant: "ghost",
        color: "info",
        class: "data-checked:border-info-300",
      },
      ...Object.entries(colorFocusRingClass).map(([color, ringClass]) => ({
        color: color as keyof typeof colorFocusRingClass,
        class: ringClass,
      })),
      {
        isInvalid: true,
        class: "border-danger-500 focus-visible:ring-danger-500 data-checked:border-danger-500",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      isInvalid: false,
      motion: "pop",
    },
  },
);

export const radioIndicatorVariants = cva(
  "flex items-center justify-center rounded-full bg-current opacity-0 scale-0 transition-[opacity,transform] duration-200 ease-(--ease-spring) motion-reduce:transition-none data-checked:opacity-100 data-checked:scale-100 data-[starting-style]:opacity-0 data-[starting-style]:scale-0 data-[ending-style]:opacity-0 data-[ending-style]:scale-0 size-[45%]",
);

export const radioGroupVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-col gap-3",
      horizontal: "flex-row flex-wrap gap-6",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});
