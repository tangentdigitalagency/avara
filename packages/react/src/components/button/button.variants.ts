import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-extrabold [&_svg]:shrink-0 transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border bg-transparent",
        soft: "bg-transparent",
        ghost: "bg-transparent",
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
        md: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-4",
        xl: "h-14 px-8 text-lg [&_svg]:size-5",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      shadow: {
        none: "",
        sm: "shadow-sm hover:shadow-md hover:-translate-y-0.5",
        md: "shadow-md hover:shadow-lg hover:-translate-y-0.5",
        lg: "shadow-lg hover:-translate-y-1",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      isIconOnly: {
        true: "p-0 aspect-square",
        false: "",
      },
    },
    compoundVariants: [
      // Solid
      {
        variant: "solid",
        color: "primary",
        class: "bg-primary-500 text-primary-950 hover:bg-primary-400 active:bg-primary-600",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "bg-secondary-500 text-secondary-950 hover:bg-secondary-400 active:bg-secondary-600",
      },
      {
        variant: "solid",
        color: "neutral",
        class:
          "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
      },
      {
        variant: "solid",
        color: "success",
        class: "bg-success-500 text-white hover:bg-success-600",
      },
      {
        variant: "solid",
        color: "warning",
        class: "bg-warning-500 text-neutral-900 hover:bg-warning-600",
      },
      { variant: "solid", color: "danger", class: "bg-danger-500 text-white hover:bg-danger-600" },
      { variant: "solid", color: "info", class: "bg-info-500 text-white hover:bg-info-600" },

      // Outline
      {
        variant: "outline",
        color: "primary",
        class: "border-primary-500 text-primary-700 hover:bg-primary-500/10 dark:text-primary-400",
      },
      {
        variant: "outline",
        color: "secondary",
        class:
          "border-secondary-500 text-secondary-700 hover:bg-secondary-500/10 dark:text-secondary-400",
      },
      {
        variant: "outline",
        color: "neutral",
        class: "border-border text-foreground hover:bg-neutral-500/10",
      },
      {
        variant: "outline",
        color: "success",
        class: "border-success-500 text-success-600 hover:bg-success-500/10 dark:text-success-500",
      },
      {
        variant: "outline",
        color: "warning",
        class: "border-warning-500 text-warning-700 hover:bg-warning-500/10 dark:text-warning-500",
      },
      {
        variant: "outline",
        color: "danger",
        class: "border-danger-500 text-danger-600 hover:bg-danger-500/10 dark:text-danger-500",
      },
      {
        variant: "outline",
        color: "info",
        class: "border-info-500 text-info-600 hover:bg-info-500/10 dark:text-info-500",
      },

      // Soft
      {
        variant: "soft",
        color: "primary",
        class: "bg-primary-500/15 text-primary-700 hover:bg-primary-500/25 dark:text-primary-400",
      },
      {
        variant: "soft",
        color: "secondary",
        class:
          "bg-secondary-500/15 text-secondary-700 hover:bg-secondary-500/25 dark:text-secondary-400",
      },
      {
        variant: "soft",
        color: "neutral",
        class: "bg-neutral-500/10 text-foreground hover:bg-neutral-500/20",
      },
      {
        variant: "soft",
        color: "success",
        class: "bg-success-500/15 text-success-600 hover:bg-success-500/25 dark:text-success-500",
      },
      {
        variant: "soft",
        color: "warning",
        class: "bg-warning-500/15 text-warning-700 hover:bg-warning-500/25 dark:text-warning-500",
      },
      {
        variant: "soft",
        color: "danger",
        class: "bg-danger-500/15 text-danger-600 hover:bg-danger-500/25 dark:text-danger-500",
      },
      {
        variant: "soft",
        color: "info",
        class: "bg-info-500/15 text-info-600 hover:bg-info-500/25 dark:text-info-500",
      },

      // Ghost
      {
        variant: "ghost",
        color: "primary",
        class: "text-primary-700 hover:bg-primary-500/10 dark:text-primary-400",
      },
      {
        variant: "ghost",
        color: "secondary",
        class: "text-secondary-700 hover:bg-secondary-500/10 dark:text-secondary-400",
      },
      { variant: "ghost", color: "neutral", class: "text-foreground hover:bg-neutral-500/10" },
      {
        variant: "ghost",
        color: "success",
        class: "text-success-600 hover:bg-success-500/10 dark:text-success-500",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "text-warning-700 hover:bg-warning-500/10 dark:text-warning-500",
      },
      {
        variant: "ghost",
        color: "danger",
        class: "text-danger-600 hover:bg-danger-500/10 dark:text-danger-500",
      },
      {
        variant: "ghost",
        color: "info",
        class: "text-info-600 hover:bg-info-500/10 dark:text-info-500",
      },

      // Focus visible ring
      { color: "primary", class: "focus-visible:ring-primary-500" },
      { color: "secondary", class: "focus-visible:ring-secondary-500" },
      { color: "neutral", class: "focus-visible:ring-neutral-500" },
      { color: "success", class: "focus-visible:ring-success-500" },
      { color: "warning", class: "focus-visible:ring-warning-500" },
      { color: "danger", class: "focus-visible:ring-danger-500" },
      { color: "info", class: "focus-visible:ring-info-500" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      radius: "full",
      shadow: "none",
      fullWidth: false,
      isIconOnly: false,
    },
  },
);
