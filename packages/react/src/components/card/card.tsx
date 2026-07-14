import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cardVariants, cardSectionVariants } from "./card.variants";
import { cn } from "../../lib/cn";

export interface CardClassNames {
  base?: string;
  header?: string;
  body?: string;
  footer?: string;
}

interface CardContextValue {
  size: NonNullable<VariantProps<typeof cardVariants>["size"]>;
  classNames?: CardClassNames;
}

const CardContext = React.createContext<CardContextValue>({ size: "md" });
const useCardContext = () => React.useContext(CardContext);

export interface CardProps
  extends
    Omit<React.ComponentPropsWithoutRef<"div">, "color" | "onClick">,
    VariantProps<typeof cardVariants> {
  isDisabled?: boolean;
  classNames?: CardClassNames;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const CardBase = React.forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size = "md",
      radius,
      shadow,
      fullWidth,
      isHoverable,
      isPressable,
      isDisabled = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const contextValue = React.useMemo(
      () => ({ size: size ?? "md", classNames }),
      [size, classNames],
    );

    const sharedClassName = cn(
      cardVariants({
        variant,
        color,
        size,
        radius,
        shadow,
        fullWidth,
        isHoverable,
        isPressable,
        isDisabled,
      }),
      classNames?.base,
      className,
    );

    const content = <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>;

    if (isPressable) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-disabled={isDisabled || undefined}
          className={cn("appearance-none border-0 font-sans", sharedClassName)}
          onClick={(event) => {
            if (isDisabled) {
              event.preventDefault();
              return;
            }
            onClick?.(event);
          }}
          {...(props as React.ComponentPropsWithoutRef<"button">)}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={sharedClassName}
        onClick={onClick}
        {...props}
      >
        {content}
      </div>
    );
  },
);
CardBase.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    const { size, classNames } = useCardContext();
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          "grid auto-rows-min grid-cols-[1fr] gap-1 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
          cardSectionVariants({ size }),
          classNames?.header,
          className,
        )}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "Card.Header";

const CardTitle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-extrabold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "Card.Title";

const CardDescription = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted", className)} {...props} />
  ),
);
CardDescription.displayName = "Card.Description";

const CardAction = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  ),
);
CardAction.displayName = "Card.Action";

const CardBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    const { size, classNames } = useCardContext();
    return (
      <div
        ref={ref}
        data-slot="card-body"
        className={cn(cardSectionVariants({ size }), classNames?.body, className)}
        {...props}
      />
    );
  },
);
CardBody.displayName = "Card.Body";

const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    const { size, classNames } = useCardContext();
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn(
          "flex items-center",
          cardSectionVariants({ size }),
          classNames?.footer,
          className,
        )}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Body: CardBody,
  Footer: CardFooter,
});
