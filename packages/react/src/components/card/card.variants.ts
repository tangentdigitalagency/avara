import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "flex flex-col transition-[box-shadow,transform,border-color,background-color] duration-200",
  {
    variants: {
      variant: {
        outline: "border bg-surface",
        solid: "border",
        soft: "border border-transparent",
        ghost: "border border-transparent bg-neutral-500/[0.03] dark:bg-neutral-500/[0.06]",
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
        xs: "gap-3 py-3",
        sm: "gap-3 py-4",
        md: "gap-4 py-5",
        lg: "gap-5 py-6",
        xl: "gap-6 py-8",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      isHoverable: {
        true: "hover:shadow-md hover:-translate-y-0.5",
        false: "",
      },
      isPressable: {
        true: "cursor-pointer text-left hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        false: "",
      },
      isDisabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      // Outline
      { variant: "outline", color: "primary", class: "border-primary-200 dark:border-primary-800" },
      {
        variant: "outline",
        color: "secondary",
        class: "border-secondary-200 dark:border-secondary-800",
      },
      { variant: "outline", color: "neutral", class: "border-border" },
      { variant: "outline", color: "success", class: "border-success-200 dark:border-success-800" },
      { variant: "outline", color: "warning", class: "border-warning-200 dark:border-warning-800" },
      { variant: "outline", color: "danger", class: "border-danger-200 dark:border-danger-800" },
      { variant: "outline", color: "info", class: "border-info-200 dark:border-info-800" },

      // Solid
      {
        variant: "solid",
        color: "primary",
        class: "border-transparent bg-primary-500 text-primary-950",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "border-transparent bg-secondary-500 text-secondary-950",
      },
      {
        variant: "solid",
        color: "neutral",
        class:
          "border-transparent bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
      },
      { variant: "solid", color: "success", class: "border-transparent bg-success-500 text-white" },
      {
        variant: "solid",
        color: "warning",
        class: "border-transparent bg-warning-500 text-neutral-900",
      },
      { variant: "solid", color: "danger", class: "border-transparent bg-danger-500 text-white" },
      { variant: "solid", color: "info", class: "border-transparent bg-info-500 text-white" },

      // Soft
      { variant: "soft", color: "primary", class: "bg-primary-500/10 dark:bg-primary-500/20" },
      {
        variant: "soft",
        color: "secondary",
        class: "bg-secondary-500/10 dark:bg-secondary-500/20",
      },
      { variant: "soft", color: "neutral", class: "bg-neutral-500/10 dark:bg-neutral-500/20" },
      { variant: "soft", color: "success", class: "bg-success-500/10 dark:bg-success-500/20" },
      { variant: "soft", color: "warning", class: "bg-warning-500/10 dark:bg-warning-500/20" },
      { variant: "soft", color: "danger", class: "bg-danger-500/10 dark:bg-danger-500/20" },
      { variant: "soft", color: "info", class: "bg-info-500/10 dark:bg-info-500/20" },
      // Ghost
      {
        variant: "ghost",
        color: "primary",
        class: "bg-primary-500/[0.03] dark:bg-primary-500/[0.05]",
      },
      {
        variant: "ghost",
        color: "secondary",
        class: "bg-secondary-500/[0.03] dark:bg-secondary-500/[0.05]",
      },
      {
        variant: "ghost",
        color: "neutral",
        class: "bg-neutral-500/[0.02] dark:bg-neutral-500/[0.04]",
      },
      {
        variant: "ghost",
        color: "success",
        class: "bg-success-500/[0.03] dark:bg-success-500/[0.05]",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "bg-warning-500/[0.03] dark:bg-warning-500/[0.05]",
      },
      {
        variant: "ghost",
        color: "danger",
        class: "bg-danger-500/[0.03] dark:bg-danger-500/[0.05]",
      },
      { variant: "ghost", color: "info", class: "bg-info-500/[0.03] dark:bg-info-500/[0.05]" },

      { isPressable: true, color: "primary", class: "focus-visible:ring-primary-500" },
      { isPressable: true, color: "secondary", class: "focus-visible:ring-secondary-500" },
      { isPressable: true, color: "neutral", class: "focus-visible:ring-neutral-500" },
      { isPressable: true, color: "success", class: "focus-visible:ring-success-500" },
      { isPressable: true, color: "warning", class: "focus-visible:ring-warning-500" },
      { isPressable: true, color: "danger", class: "focus-visible:ring-danger-500" },
      { isPressable: true, color: "info", class: "focus-visible:ring-info-500" },
    ],
    defaultVariants: {
      variant: "outline",
      color: "neutral",
      size: "md",
      radius: "lg",
      shadow: "none",
      fullWidth: false,
      isHoverable: false,
      isPressable: false,
      isDisabled: false,
    },
  },
);

export const cardSectionVariants = cva("", {
  variants: {
    size: {
      xs: "px-3",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
