import * as React from "react";
import { buttonVariants } from "../button/button.variants";
import { Toast } from "@base-ui/react/toast";
import { CheckCircle2, AlertTriangle, XCircle, Info, Loader2, X } from "lucide-react";
import {
  toastCardColorClass,
  toastViewportPlacementClass,
  type ToastPlacement,
} from "./toast.variants";
import { cn } from "../../lib/cn";
import type { SlotClassNames } from "../../lib/slot-class-names";

export type ToastColor =
  "default" | "primary" | "success" | "warning" | "danger" | "info" | "loading";

export type ToastClassNames = SlotClassNames<
  "base" | "title" | "description" | "action" | "closeButton"
>;
type SwipeDirection = "up" | "down" | "left" | "right";

const toastManager = Toast.createToastManager();

const toastIcons: Partial<Record<ToastColor, React.ReactNode>> = {
  loading: <Loader2 className="animate-spin" />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  danger: <XCircle />,
  info: <Info />,
};

const toastIconColorClass: Record<ToastColor, string> = {
  default: "text-muted",
  loading: "text-muted",
  primary: "text-primary-600 dark:text-primary-400",
  success: "text-success-600 dark:text-success-400",
  warning: "text-warning-600 dark:text-warning-400",
  danger: "text-danger-600 dark:text-danger-400",
  info: "text-info-600 dark:text-info-400",
};

const COLLAPSED_OFFSET_PX = 10;
const COLLAPSED_SCALE_STEP = 0.06;
const EXPANDED_GAP_PX = 6;
const CARD_WIDTH_PX = 340;
const FALLBACK_CARD_HEIGHT_PX = 72;

export interface ToasterProps {
  placement?: ToastPlacement;
  maxVisible?: number;
  stacked?: boolean;
  duration?: number | "infinite";
  showCloseButton?: boolean;
  isSwipeable?: boolean;
  swipeDirection?: SwipeDirection | SwipeDirection[];
  offset?: number;
  classNames?: ToastClassNames;
}

export function Toaster({
  placement = "bottom-right",
  maxVisible = 4,
  stacked = true,
  duration = 5000,
  showCloseButton = true,
  isSwipeable = true,
  swipeDirection = ["down", "right"],
  offset = 16,
  classNames,
}: ToasterProps) {
  return (
    <Toast.Provider
      toastManager={toastManager}
      limit={maxVisible}
      timeout={duration === "infinite" ? 0 : duration}
    >
      <Toast.Portal>
        <Toast.Viewport
          className={cn("fixed z-50 pointer-events-none", toastViewportPlacementClass[placement])}
          style={{ padding: offset, width: CARD_WIDTH_PX }}
        >
          <ToastStack
            placement={placement}
            maxVisible={maxVisible}
            stacked={stacked}
            classNames={classNames}
            showCloseButton={showCloseButton}
            isSwipeable={isSwipeable}
            swipeDirection={swipeDirection}
          />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

interface ToastCardProps {
  toast: Toast.Root.ToastObject;
  isSwipeable: boolean;
  swipeDirection: SwipeDirection | SwipeDirection[];
  showCloseButton: boolean;
  classNames?: ToastClassNames;
  className?: string;
  style?: React.CSSProperties;
  contentOpacity?: number;
  showClose?: boolean;
  cardRef?: React.Ref<HTMLDivElement>;
}

function ToastCard({
  toast: t,
  isSwipeable,
  swipeDirection,
  showCloseButton,
  classNames,
  className,
  style,
  contentOpacity = 1,
  showClose = true,
  cardRef,
}: ToastCardProps) {
  const color = (t.type as ToastColor) ?? "default";
  return (
    <Toast.Root
      ref={cardRef}
      toast={t}
      swipeDirection={isSwipeable ? swipeDirection : undefined}
      className={cn(
        "group pointer-events-auto relative overflow-hidden flex items-start gap-3 rounded-2xl border shadow-lg px-4 py-3.5",
        "transition-[transform,opacity] duration-500 ease-(--ease-spring)",
        "data-[starting-style]:opacity-0 data-[starting-style]:scale-90",
        "data-[ending-style]:opacity-0",
        toastCardColorClass[color],
        classNames?.base,
        className,
      )}
      style={style}
    >
      {toastIcons[color] && (
        <span className={cn("size-5 shrink-0 mt-0.5", toastIconColorClass[color])}>
          {toastIcons[color]}
        </span>
      )}
      <div
        className="flex flex-col gap-0.5 min-w-0 flex-1 transition-opacity duration-200"
        style={{ opacity: contentOpacity }}
      >
        <Toast.Title className={cn("text-sm font-extrabold pr-5", classNames?.title)} />
        <Toast.Description className={cn("text-sm opacity-70 pr-5", classNames?.description)} />
        {t.actionProps && (
          <Toast.Action
            className={cn(
              buttonVariants({ size: "xs", variant: "soft", color: "primary" }),
              "self-start mt-1",
              classNames?.action,
            )}
          />
        )}
      </div>
      {typeof t.timeout === "number" && t.timeout > 0 && (
        <div
          className="absolute bg-white inset-x-0 bottom-0 h-0.5 bg-current/20 origin-left animate-[toast-progress_linear_forwards] group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${t.timeout}ms` }}
          data-testid="toast-progress"
        />
      )}
      {showCloseButton && showClose && (
        <Toast.Close
          className={cn(
            "absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100 transition-colors",
            classNames?.closeButton,
          )}
          aria-label="Close"
        >
          <X className="size-3.5" />
        </Toast.Close>
      )}
    </Toast.Root>
  );
}

function ToastStack({
  placement,
  maxVisible,
  stacked,
  classNames,
  showCloseButton,
  isSwipeable,
  swipeDirection,
}: {
  placement: ToastPlacement;
  maxVisible: number;
  stacked: boolean;
  classNames?: ToastClassNames;
  showCloseButton: boolean;
  isSwipeable: boolean;
  swipeDirection: SwipeDirection | SwipeDirection[];
}) {
  const { toasts } = Toast.useToastManager();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [cardHeight, setCardHeight] = React.useState(FALLBACK_CARD_HEIGHT_PX);
  const frontmostRef = React.useRef<HTMLDivElement>(null);
  const isTop = placement.startsWith("top");

  // Newest-first, capped to maxVisible — older toasts beyond the cap are
  // genuinely dropped from render, not just hidden.
  const ordered = [...toasts].slice(0, maxVisible);
  const frontmostId = ordered[0]?.id;

  React.useEffect(() => {
    const el = frontmostRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.borderBoxSize?.[0]?.blockSize;
      if (height) setCardHeight(height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [frontmostId]);

  if (!stacked) {
    const displayOrder = isTop ? [...ordered].reverse() : ordered;
    return (
      <div className="flex flex-col gap-3">
        {displayOrder.map((t) => (
          <ToastCard
            key={t.id}
            toast={t}
            isSwipeable={isSwipeable}
            swipeDirection={swipeDirection}
            showCloseButton={showCloseButton}
            classNames={classNames}
          />
        ))}
      </div>
    );
  }

  const maxExpandedHeight = ordered.length * (cardHeight + EXPANDED_GAP_PX);

  return (
    <div className="relative" style={{ height: cardHeight + 8 }}>
      {/* Constant-size hover hitbox — never resizes, so entering/leaving never
          flickers. The visible cards animate independently inside it. */}
      <div
        className={cn("absolute inset-x-0 pointer-events-auto", isTop ? "top-0" : "bottom-0")}
        style={{ height: maxExpandedHeight }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      >
        {ordered.map((t, depth) => {
          const collapsedTransform = `scale(${1 - depth * COLLAPSED_SCALE_STEP}) translateY(${
            (isTop ? 1 : -1) * depth * COLLAPSED_OFFSET_PX
          }px)`;
          const expandedTransform = `translateY(${(isTop ? 1 : -1) * depth * (cardHeight + EXPANDED_GAP_PX)}px)`;

          return (
            <ToastCard
              key={t.id}
              toast={t}
              isSwipeable={isSwipeable}
              swipeDirection={swipeDirection}
              showCloseButton={showCloseButton}
              classNames={classNames}
              className={cn("absolute inset-x-0", isTop ? "top-0" : "bottom-0")}
              style={{
                zIndex: ordered.length - depth,
                transform: isExpanded ? expandedTransform : collapsedTransform,
              }}
              contentOpacity={depth === 0 || isExpanded ? 1 : 0}
              showClose={depth === 0 || isExpanded}
              cardRef={depth === 0 ? frontmostRef : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

interface ToastOptions {
  description?: string;
  duration?: number | "infinite";
  action?: { label: string; onClick: () => void };
}

function buildOptions(color: ToastColor, defaultPriority: "low" | "high", options?: ToastOptions) {
  return {
    type: color,
    description: options?.description,
    timeout: options?.duration === "infinite" ? 0 : (options?.duration ?? 5000),
    priority: defaultPriority,
    actionProps: options?.action
      ? { children: options.action.label, onClick: options.action.onClick }
      : undefined,
  };
}

function show(title: string, options?: ToastOptions & { color?: ToastColor }) {
  return toastManager.add({ title, ...buildOptions(options?.color ?? "default", "low", options) });
}

export const toast = Object.assign(show, {
  success: (title: string, options?: ToastOptions) =>
    toastManager.add({ title, ...buildOptions("success", "low", options) }),
  warning: (title: string, options?: ToastOptions) =>
    toastManager.add({ title, ...buildOptions("warning", "high", options) }),
  danger: (title: string, options?: ToastOptions) =>
    toastManager.add({ title, ...buildOptions("danger", "high", options) }),
  info: (title: string, options?: ToastOptions) =>
    toastManager.add({ title, ...buildOptions("info", "low", options) }),
  promise: toastManager.promise.bind(toastManager),
});
