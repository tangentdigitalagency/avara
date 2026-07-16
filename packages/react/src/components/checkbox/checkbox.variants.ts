import { cva } from "class-variance-authority";
import { colorFocusRingClass } from "../../lib/color-focus-ring";

export const checkboxVariants = cva(
  "peer relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-border bg-transparent transition-[background-color,border-color,box-shadow,transform] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-90 data-disabled:opacity-50 data-disabled:pointer-events-none data-readonly:cursor-default backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturate)",
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
        xs: "size-3.5 [&_svg]:size-2.5",
        sm: "size-4 [&_svg]:size-3",
        md: "size-5 [&_svg]:size-3.5",
        lg: "size-6 [&_svg]:size-4",
        xl: "size-7 [&_svg]:size-5",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      isInvalid: {
        true: "",
        false: "",
      },
      isLoading: {
        true: "cursor-wait",
        false: "",
      },
      motion: {
        pop: "data-checked:[animation:checkbox-pop_0.35s_var(--ease-spring)] motion-reduce:data-checked:[animation:none]",
        wave: "",
        stagger: "",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        class:
          "data-checked:border-primary-500 data-checked:bg-primary-500 data-checked:text-primary-950 data-indeterminate:border-primary-500 data-indeterminate:bg-primary-500 data-indeterminate:text-primary-950",
      },
      {
        variant: "solid",
        color: "secondary",
        class:
          "data-checked:border-secondary-500 data-checked:bg-secondary-500 data-checked:text-secondary-950 data-indeterminate:border-secondary-500 data-indeterminate:bg-secondary-500 data-indeterminate:text-secondary-950",
      },
      {
        variant: "solid",
        color: "neutral",
        class:
          "data-checked:border-neutral-900 data-checked:bg-neutral-900 data-checked:text-white dark:data-checked:border-neutral-100 dark:data-checked:bg-neutral-100 dark:data-checked:text-neutral-900 data-indeterminate:border-neutral-900 data-indeterminate:bg-neutral-900 data-indeterminate:text-white dark:data-indeterminate:border-neutral-100 dark:data-indeterminate:bg-neutral-100 dark:data-indeterminate:text-neutral-900",
      },
      {
        variant: "solid",
        color: "success",
        class:
          "data-checked:border-success-500 data-checked:bg-success-500 data-checked:text-white data-indeterminate:border-success-500 data-indeterminate:bg-success-500 data-indeterminate:text-white",
      },
      {
        variant: "solid",
        color: "warning",
        class:
          "data-checked:border-warning-500 data-checked:bg-warning-500 data-checked:text-neutral-900 data-indeterminate:border-warning-500 data-indeterminate:bg-warning-500 data-indeterminate:text-neutral-900",
      },
      {
        variant: "solid",
        color: "danger",
        class:
          "data-checked:border-danger-500 data-checked:bg-danger-500 data-checked:text-white data-indeterminate:border-danger-500 data-indeterminate:bg-danger-500 data-indeterminate:text-white",
      },
      {
        variant: "solid",
        color: "info",
        class:
          "data-checked:border-info-500 data-checked:bg-info-500 data-checked:text-white data-indeterminate:border-info-500 data-indeterminate:bg-info-500 data-indeterminate:text-white",
      },
      {
        variant: "outline",
        color: "primary",
        class:
          "data-checked:border-primary-500 data-checked:text-primary-700 dark:data-checked:text-primary-400 data-indeterminate:border-primary-500 data-indeterminate:text-primary-700 dark:data-indeterminate:text-primary-400",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "data-checked:border-secondary-500 data-checked:text-secondary-700 dark:data-checked:text-secondary-400 data-indeterminate:border-secondary-500 data-indeterminate:text-secondary-700 dark:data-indeterminate:text-secondary-400",
      },
      {
        variant: "outline",
        color: "neutral",
        class:
          "data-checked:border-neutral-500 data-checked:text-foreground data-indeterminate:border-neutral-500 data-indeterminate:text-foreground",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "data-checked:border-success-500 data-checked:text-success-600 dark:data-checked:text-success-500 data-indeterminate:border-success-500 data-indeterminate:text-success-600 dark:data-indeterminate:text-success-500",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "data-checked:border-warning-500 data-checked:text-warning-700 dark:data-checked:text-warning-500 data-indeterminate:border-warning-500 data-indeterminate:text-warning-700 dark:data-indeterminate:text-warning-500",
      },
      {
        variant: "outline",
        color: "danger",
        class:
          "data-checked:border-danger-500 data-checked:text-danger-600 dark:data-checked:text-danger-500 data-indeterminate:border-danger-500 data-indeterminate:text-danger-600 dark:data-indeterminate:text-danger-500",
      },
      {
        variant: "outline",
        color: "info",
        class:
          "data-checked:border-info-500 data-checked:text-info-600 dark:data-checked:text-info-500 data-indeterminate:border-info-500 data-indeterminate:text-info-600 dark:data-indeterminate:text-info-500",
      },
      {
        variant: "soft",
        color: "primary",
        class:
          "data-checked:border-transparent data-checked:bg-primary-500/15 data-checked:text-primary-700 dark:data-checked:text-primary-400 data-indeterminate:border-transparent data-indeterminate:bg-primary-500/15 data-indeterminate:text-primary-700 dark:data-indeterminate:text-primary-400",
      },
      {
        variant: "soft",
        color: "secondary",
        class:
          "data-checked:border-transparent data-checked:bg-secondary-500/15 data-checked:text-secondary-700 dark:data-checked:text-secondary-400 data-indeterminate:border-transparent data-indeterminate:bg-secondary-500/15 data-indeterminate:text-secondary-700 dark:data-indeterminate:text-secondary-400",
      },
      {
        variant: "soft",
        color: "neutral",
        class:
          "data-checked:border-transparent data-checked:bg-neutral-500/10 data-checked:text-foreground data-indeterminate:border-transparent data-indeterminate:bg-neutral-500/10 data-indeterminate:text-foreground",
      },
      {
        variant: "soft",
        color: "success",
        class:
          "data-checked:border-transparent data-checked:bg-success-500/15 data-checked:text-success-600 dark:data-checked:text-success-500 data-indeterminate:border-transparent data-indeterminate:bg-success-500/15 data-indeterminate:text-success-600 dark:data-indeterminate:text-success-500",
      },
      {
        variant: "soft",
        color: "warning",
        class:
          "data-checked:border-transparent data-checked:bg-warning-500/15 data-checked:text-warning-700 dark:data-checked:text-warning-500 data-indeterminate:border-transparent data-indeterminate:bg-warning-500/15 data-indeterminate:text-warning-700 dark:data-indeterminate:text-warning-500",
      },
      {
        variant: "soft",
        color: "danger",
        class:
          "data-checked:border-transparent data-checked:bg-danger-500/15 data-checked:text-danger-600 dark:data-checked:text-danger-500 data-indeterminate:border-transparent data-indeterminate:bg-danger-500/15 data-indeterminate:text-danger-600 dark:data-indeterminate:text-danger-500",
      },
      {
        variant: "soft",
        color: "info",
        class:
          "data-checked:border-transparent data-checked:bg-info-500/15 data-checked:text-info-600 dark:data-checked:text-info-500 data-indeterminate:border-transparent data-indeterminate:bg-info-500/15 data-indeterminate:text-info-600 dark:data-indeterminate:text-info-500",
      },
      {
        variant: "ghost",
        color: "primary",
        class:
          "data-checked:border-primary-300 data-checked:text-primary-700 dark:data-checked:text-primary-400 data-indeterminate:border-primary-300 data-indeterminate:text-primary-700 dark:data-indeterminate:text-primary-400",
      },
      {
        variant: "ghost",
        color: "secondary",
        class:
          "data-checked:border-secondary-300 data-checked:text-secondary-700 dark:data-checked:text-secondary-400 data-indeterminate:border-secondary-300 data-indeterminate:text-secondary-700 dark:data-indeterminate:text-secondary-400",
      },
      {
        variant: "ghost",
        color: "neutral",
        class:
          "data-checked:border-neutral-300 data-checked:text-foreground data-indeterminate:border-neutral-300 data-indeterminate:text-foreground",
      },
      {
        variant: "ghost",
        color: "success",
        class:
          "data-checked:border-success-300 data-checked:text-success-600 dark:data-checked:text-success-500 data-indeterminate:border-success-300 data-indeterminate:text-success-600 dark:data-indeterminate:text-success-500",
      },
      {
        variant: "ghost",
        color: "warning",
        class:
          "data-checked:border-warning-300 data-checked:text-warning-700 dark:data-checked:text-warning-500 data-indeterminate:border-warning-300 data-indeterminate:text-warning-700 dark:data-indeterminate:text-warning-500",
      },
      {
        variant: "ghost",
        color: "danger",
        class:
          "data-checked:border-danger-300 data-checked:text-danger-600 dark:data-checked:text-danger-500 data-indeterminate:border-danger-300 data-indeterminate:text-danger-600 dark:data-indeterminate:text-danger-500",
      },
      {
        variant: "ghost",
        color: "info",
        class:
          "data-checked:border-info-300 data-checked:text-info-600 dark:data-checked:text-info-500 data-indeterminate:border-info-300 data-indeterminate:text-info-600 dark:data-indeterminate:text-info-500",
      },
      ...Object.entries(colorFocusRingClass).map(([color, ringClass]) => ({
        color: color as keyof typeof colorFocusRingClass,
        class: ringClass,
      })),
      {
        isInvalid: true,
        class:
          "border-danger-500 focus-visible:ring-danger-500 data-checked:border-danger-500 data-indeterminate:border-danger-500",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      radius: "sm",
      isInvalid: false,
      isLoading: false,
      motion: "pop",
    },
  },
);

export const checkboxWaveVariants = cva(
  "absolute inset-0 scale-0 rounded-[inherit] bg-current transition-transform duration-300 ease-(--ease-spring) motion-reduce:transition-none data-checked:scale-100",
);

export const checkboxIndicatorVariants = cva(
  "group/indicator relative flex items-center justify-center text-current [&_svg]:size-full opacity-0 scale-50 transition-[opacity,transform] duration-300 ease-(--ease-spring) motion-reduce:transition-none data-checked:opacity-100 data-checked:scale-100 data-indeterminate:opacity-100 data-indeterminate:scale-100 data-[starting-style]:opacity-0 data-[starting-style]:scale-50 data-[ending-style]:opacity-0 data-[ending-style]:scale-50",

  {
    variants: {
      isLoading: {
        true: "opacity-100 scale-100",
        false: "",
      },
    },
    defaultVariants: {
      isLoading: false,
    },
  },
);
