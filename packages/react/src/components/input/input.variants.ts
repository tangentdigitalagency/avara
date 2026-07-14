import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full items-center gap-2 transition-[border-color,background-color,box-shadow] duration-200 has-disabled:opacity-50 has-disabled:pointer-events-none [&_input]:w-full [&_input]:bg-transparent [&_input]:outline-none [&_input]:placeholder:text-muted [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        outline: "border bg-transparent",
        soft: "border border-transparent",
        solid: "border border-border",
        ghost: "border border-transparent bg-transparent",
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
      isInvalid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Outline
      {
        variant: "outline",
        color: "primary",
        isInvalid: false,
        class:
          "border-border focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/30",
      },
      {
        variant: "outline",
        color: "secondary",
        isInvalid: false,
        class:
          "border-border focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/30",
      },
      {
        variant: "outline",
        color: "neutral",
        isInvalid: false,
        class:
          "border-border focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/30",
      },
      {
        variant: "outline",
        color: "success",
        isInvalid: false,
        class:
          "border-border focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/30",
      },
      {
        variant: "outline",
        color: "warning",
        isInvalid: false,
        class:
          "border-border focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/30",
      },
      {
        variant: "outline",
        color: "danger",
        isInvalid: false,
        class:
          "border-border focus-within:border-danger-500 focus-within:ring-2 focus-within:ring-danger-500/30",
      },
      {
        variant: "outline",
        color: "info",
        isInvalid: false,
        class:
          "border-border focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30",
      },

      // Soft
      {
        variant: "soft",
        color: "primary",
        isInvalid: false,
        class: "bg-primary-500/10 focus-within:ring-2 focus-within:ring-primary-500/30",
      },
      {
        variant: "soft",
        color: "secondary",
        isInvalid: false,
        class: "bg-secondary-500/10 focus-within:ring-2 focus-within:ring-secondary-500/30",
      },
      {
        variant: "soft",
        color: "neutral",
        isInvalid: false,
        class: "bg-neutral-500/10 focus-within:ring-2 focus-within:ring-neutral-500/30",
      },
      {
        variant: "soft",
        color: "success",
        isInvalid: false,
        class: "bg-success-500/10 focus-within:ring-2 focus-within:ring-success-500/30",
      },
      {
        variant: "soft",
        color: "warning",
        isInvalid: false,
        class: "bg-warning-500/10 focus-within:ring-2 focus-within:ring-warning-500/30",
      },
      {
        variant: "soft",
        color: "danger",
        isInvalid: false,
        class: "bg-danger-500/10 focus-within:ring-2 focus-within:ring-danger-500/30",
      },
      {
        variant: "soft",
        color: "info",
        isInvalid: false,
        class: "bg-info-500/10 focus-within:ring-2 focus-within:ring-info-500/30",
      },

      // Solid
      {
        variant: "solid",
        color: "primary",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-primary-500/30",
      },
      {
        variant: "solid",
        color: "secondary",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-secondary-500/30",
      },
      {
        variant: "solid",
        color: "neutral",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-neutral-500/30",
      },
      {
        variant: "solid",
        color: "success",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-success-500/30",
      },
      {
        variant: "solid",
        color: "warning",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-warning-500/30",
      },
      {
        variant: "solid",
        color: "danger",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-danger-500/30",
      },
      {
        variant: "solid",
        color: "info",
        isInvalid: false,
        class:
          "bg-neutral-100 dark:bg-neutral-700 border-border focus-within:ring-2 focus-within:ring-info-500/30",
      },

      // Ghost
      {
        variant: "ghost",
        color: "primary",
        isInvalid: false,
        class: "focus-within:bg-primary-500/10",
      },
      {
        variant: "ghost",
        color: "secondary",
        isInvalid: false,
        class: "focus-within:bg-secondary-500/10",
      },
      {
        variant: "ghost",
        color: "neutral",
        isInvalid: false,
        class: "focus-within:bg-neutral-500/10",
      },
      {
        variant: "ghost",
        color: "success",
        isInvalid: false,
        class: "focus-within:bg-success-500/10",
      },
      {
        variant: "ghost",
        color: "warning",
        isInvalid: false,
        class: "focus-within:bg-warning-500/10",
      },
      {
        variant: "ghost",
        color: "danger",
        isInvalid: false,
        class: "focus-within:bg-danger-500/10",
      },
      { variant: "ghost", color: "info", isInvalid: false, class: "focus-within:bg-info-500/10" },

      // Invalid state overrides EVERY variant/color combo — always shows danger, regardless of the color prop
      {
        isInvalid: true,
        class:
          "border-danger-500 focus-within:border-danger-500 focus-within:ring-2 focus-within:ring-danger-500/30",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "primary",
      size: "md",
      radius: "md",
      isInvalid: false,
    },
  },
);
