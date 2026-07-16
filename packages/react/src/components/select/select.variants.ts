import { cva } from "class-variance-authority";
import { colorFocusRingClass } from "../../lib/color-focus-ring";

export const selectTriggerVariants = cva(
  "peer inline-flex w-full items-center justify-between gap-2 border bg-transparent text-left transition-[background-color,border-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-disabled:opacity-50 data-disabled:pointer-events-none data-readonly:cursor-default backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturate)",
  {
    variants: {
      variant: {
        outline: "border-border bg-surface",
        solid: "border-transparent",
        soft: "border-transparent",
        ghost: "border-transparent bg-transparent",
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
        xs: "h-8 px-3 text-xs [&_svg]:size-3.5",
        sm: "h-9 px-4 text-sm [&_svg]:size-3.5",
        md: "h-11 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-5 text-base [&_svg]:size-4",
        xl: "h-14 px-6 text-lg [&_svg]:size-5",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      isInvalid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "solid", color: "primary", class: "bg-neutral-100 dark:bg-neutral-800" },
      { variant: "solid", color: "secondary", class: "bg-neutral-100 dark:bg-neutral-800" },
      { variant: "solid", color: "neutral", class: "bg-neutral-100 dark:bg-neutral-800" },
      { variant: "solid", color: "success", class: "bg-neutral-100 dark:bg-neutral-800" },
      { variant: "solid", color: "warning", class: "bg-neutral-100 dark:bg-neutral-800" },
      { variant: "solid", color: "danger", class: "bg-neutral-100 dark:bg-neutral-800" },
      { variant: "solid", color: "info", class: "bg-neutral-100 dark:bg-neutral-800" },

      { variant: "soft", color: "primary", class: "bg-primary-500/10" },
      { variant: "soft", color: "secondary", class: "bg-secondary-500/10" },
      { variant: "soft", color: "neutral", class: "bg-neutral-500/10" },
      { variant: "soft", color: "success", class: "bg-success-500/10" },
      { variant: "soft", color: "warning", class: "bg-warning-500/10" },
      { variant: "soft", color: "danger", class: "bg-danger-500/10" },
      { variant: "soft", color: "info", class: "bg-info-500/10" },

      ...Object.entries(colorFocusRingClass).map(([color, ringClass]) => ({
        color: color as keyof typeof colorFocusRingClass,
        class: ringClass,
      })),
      {
        isInvalid: true,
        class: "border-danger-500 focus-visible:ring-danger-500",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "primary",
      size: "md",
      radius: "lg",
      isInvalid: false,
    },
  },
);

export const selectPopupVariants =
  "z-50 max-h-(--available-height) w-(--anchor-width) overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg outline-none backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturate) data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 transition-[opacity,transform] duration-150 ease-(--ease-spring) motion-reduce:transition-none";

export const selectItemVariants =
  "relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-md px-3 py-2 text-sm outline-none data-highlighted:bg-primary-500/10 data-disabled:opacity-50 data-disabled:pointer-events-none data-selected:font-semibold";
