import { cva } from "class-variance-authority";
import { colorFocusRingClass } from "../../lib/color-focus-ring";

export const switchVariants = cva(
  "peer relative inline-flex shrink-0 items-center rounded-full border border-border bg-neutral-200 dark:bg-neutral-700 p-0.5 transition-[background-color,border-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-disabled:opacity-50 data-disabled:pointer-events-none data-readonly:cursor-default backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturate)",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent border-2",
        soft: "",
        ghost: "bg-transparent border-transparent",
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
        xs: "w-7 h-4",
        sm: "w-8 h-[18px]",
        md: "w-[38px] h-[22px]",
        lg: "w-11 h-[26px]",
        xl: "w-[50px] h-[30px]",
      },
      isInvalid: {
        true: "",
        false: "",
      },
      isLoading: {
        true: "cursor-wait",
        false: "",
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
        class: "data-checked:border-transparent data-checked:bg-primary-500/40",
      },
      {
        variant: "soft",
        color: "secondary",
        class: "data-checked:border-transparent data-checked:bg-secondary-500/40",
      },
      {
        variant: "soft",
        color: "neutral",
        class: "data-checked:border-transparent data-checked:bg-neutral-500/40",
      },
      {
        variant: "soft",
        color: "success",
        class: "data-checked:border-transparent data-checked:bg-success-500/40",
      },
      {
        variant: "soft",
        color: "warning",
        class: "data-checked:border-transparent data-checked:bg-warning-500/40",
      },
      {
        variant: "soft",
        color: "danger",
        class: "data-checked:border-transparent data-checked:bg-danger-500/40",
      },
      {
        variant: "soft",
        color: "info",
        class: "data-checked:border-transparent data-checked:bg-info-500/40",
      },
      {
        variant: "ghost",
        color: "primary",
        class: "data-checked:bg-primary-500/20",
      },
      {
        variant: "ghost",
        color: "secondary",
        class: "data-checked:bg-secondary-500/20",
      },
      {
        variant: "ghost",
        color: "neutral",
        class: "data-checked:bg-neutral-500/20",
      },
      {
        variant: "ghost",
        color: "success",
        class: "data-checked:bg-success-500/20",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "data-checked:bg-warning-500/20",
      },
      {
        variant: "ghost",
        color: "danger",
        class: "data-checked:bg-danger-500/20",
      },
      {
        variant: "ghost",
        color: "info",
        class: "data-checked:bg-info-500/20",
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
      isLoading: false,
    },
  },
);

export const switchThumbVariants = cva(
  "pointer-events-none relative flex items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ease-(--ease-spring) motion-reduce:transition-none [&_svg]:size-full [&_svg]:p-0.5",
  {
    variants: {
      size: {
        xs: "size-3 data-checked:translate-x-3",
        sm: "size-3.5 data-checked:translate-x-3.5",
        md: "size-[18px] data-checked:translate-x-4",
        lg: "size-[22px] data-checked:translate-x-[18px]",
        xl: "size-[26px] data-checked:translate-x-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
