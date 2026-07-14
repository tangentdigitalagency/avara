import { cva } from "class-variance-authority";

export const modalBackdropVariants = cva("fixed inset-0", {
  variants: {
    backdrop: {
      transparent: "bg-transparent",
      opaque: "bg-black/50 dark:bg-black/70",
      blur: "bg-black/30 dark:bg-black/50 backdrop-blur-md",
    },
  },
  defaultVariants: {
    backdrop: "opaque",
  },
});

export const modalViewportVariants = cva("fixed inset-0 flex justify-center overflow-y-auto", {
  variants: {
    placement: {
      auto: "items-end p-0 sm:items-center sm:p-4",
      center: "items-center p-4",
      top: "items-start pt-16 p-4",
    },
  },
  defaultVariants: {
    placement: "auto",
  },
});

export const modalPopupVariants = cva(
  "relative w-full flex flex-col bg-surface border border-border shadow-lg outline-none",
  {
    variants: {
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-none h-full",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      placement: {
        auto: "max-sm:w-full max-sm:rounded-t-xl max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0",
        center: "",
        top: "",
      },
    },
    compoundVariants: [
      // Full-screen never has rounded corners, regardless of the radius prop
      { size: "full", radius: "sm", class: "rounded-none" },
      { size: "full", radius: "md", class: "rounded-none" },
      { size: "full", radius: "lg", class: "rounded-none" },
      { size: "full", radius: "xl", class: "rounded-none" },
    ],
    defaultVariants: {
      size: "md",
      radius: "lg",
      placement: "auto",
    },
  },
);
