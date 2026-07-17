import { cva } from "class-variance-authority";
import { colorFocusRingClass } from "../../lib/color-focus-ring";

export const tabsListVariants = cva(
  "relative inline-flex items-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  {
    variants: {
      variant: {
        solid:
          "rounded-lg border border-border bg-surface p-1 backdrop-blur-(--glass-blur) backdrop-saturate-(--glass-saturate)",
        underline: "border-b border-border gap-4",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
      fullWidth: {
        true: "flex w-full data-[orientation=vertical]:w-auto",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      fullWidth: false,
    },
  },
);

export const tabsTabVariants = cva(
  "relative z-10 inline-flex items-center justify-center gap-2 font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-muted data-active:text-foreground",
  {
    variants: {
      variant: {
        solid: "rounded-md",
        underline: "rounded-none",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
        xl: "px-6 py-3 text-lg",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
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
    },
    compoundVariants: [
      ...Object.entries(colorFocusRingClass).map(([color, ringClass]) => ({
        color: color as keyof typeof colorFocusRingClass,
        class: ringClass,
      })),
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      fullWidth: false,
      color: "primary",
    },
  },
);

export const tabsIndicatorColorClass: Record<
  "primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info",
  string
> = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  neutral: "bg-neutral-900 dark:bg-neutral-100",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500",
  info: "bg-info-500",
};

// Solid variant: soft-tinted block behind the active tab's text.
// Underline variant: thin, fully-opaque bar sitting at the bottom edge.
export const tabsIndicatorVariants = cva(
  "absolute transition-[transform,width,height] duration-300 ease-(--ease-spring) motion-reduce:transition-none [left:var(--active-tab-left)] [top:var(--active-tab-top)] [width:var(--active-tab-width)] [height:var(--active-tab-height)]",
  {
    variants: {
      variant: {
        solid: "rounded-md opacity-15",
        underline: "!top-auto !h-0.5 bottom-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  },
);

export const tabsPanelVariants =
  "outline-none mt-3 data-[orientation=vertical]:mt-0 data-[orientation=vertical]:ml-3 transition-[opacity,transform] duration-200 ease-(--ease-spring) motion-reduce:transition-none data-[starting-style]:opacity-0 data-[starting-style]:translate-y-1 data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-1";
