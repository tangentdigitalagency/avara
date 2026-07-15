export type ToastPlacement =
  "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export const toastViewportPlacementClass: Record<ToastPlacement, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};
export const toastCardColorClass: Record<
  "default" | "primary" | "success" | "warning" | "danger" | "info" | "loading",
  string
> = {
  default: "bg-surface border-border text-foreground",
  loading: "bg-surface border-border text-foreground",
  primary: "bg-primary-500 border-primary-600 text-primary-950",
  success: "bg-success-500 border-success-600 text-white",
  warning: "bg-warning-500 border-warning-600 text-neutral-900",
  danger: "bg-danger-500 border-danger-600 text-white",
  info: "bg-info-500 border-info-600 text-white",
};
