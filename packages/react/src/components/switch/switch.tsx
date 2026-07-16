import * as React from "react";
import type { SlotClassNames } from "../../lib/slot-class-names";
import { Field } from "@base-ui/react/field";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { switchVariants, switchThumbVariants } from "./switch.variants";
import { cn } from "../../lib/cn";

export type SwitchClassNames = SlotClassNames<
  "base" | "row" | "track" | "thumb" | "label" | "description" | "errorMessage"
>;

export interface SwitchProps
  extends
    Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, "className" | "render" | "children">,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isLoading?: boolean;
  thumbIcon?: React.ReactNode | ((checked: boolean) => React.ReactNode);
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  classNames?: SwitchClassNames;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      label,
      description,
      errorMessage,
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      isReadOnly = false,
      isLoading = false,
      thumbIcon,
      startContent,
      endContent,
      id,
      checked,
      defaultChecked,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const resolvedThumbIcon =
      typeof thumbIcon === "function" ? thumbIcon(checked ?? defaultChecked ?? false) : thumbIcon;

    return (
      <Field.Root
        invalid={isInvalid}
        disabled={isDisabled}
        className={cn("flex flex-col gap-1", classNames?.base, className)}
      >
        <div className={cn("flex items-center gap-2", classNames?.row)}>
          <SwitchPrimitive.Root
            ref={ref}
            id={id}
            nativeButton
            render={<button type="button" />}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            disabled={isDisabled}
            readOnly={isReadOnly || isLoading}
            required={isRequired}
            aria-busy={isLoading || undefined}
            className={cn(
              "group",
              switchVariants({ variant, color, size, isInvalid, isLoading }),
              classNames?.track,
            )}
            {...props}
          >
            {startContent && (
              <span className="pointer-events-none absolute left-1 flex items-center justify-center text-current opacity-100 transition-opacity duration-200 group-data-checked:opacity-30 [&_svg]:size-3">
                {startContent}
              </span>
            )}
            <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }), classNames?.thumb)}>
              {isLoading ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                resolvedThumbIcon
              )}
            </SwitchPrimitive.Thumb>
            {endContent && (
              <span className="pointer-events-none absolute right-1 flex items-center justify-center text-current opacity-30 transition-opacity duration-200 group-data-checked:opacity-100 [&_svg]:size-3">
                {endContent}
              </span>
            )}
          </SwitchPrimitive.Root>

          {label && (
            <Field.Label
              className={cn("text-sm font-medium leading-none select-none", classNames?.label)}
            >
              {label}
              {isRequired && (
                <span className="text-danger-500 ml-0.5" aria-hidden="true">
                  *
                </span>
              )}
            </Field.Label>
          )}
        </div>

        {description && !isInvalid && (
          <Field.Description className={cn("text-xs text-muted", classNames?.description)}>
            {description}
          </Field.Description>
        )}

        <Field.Error
          match={isInvalid}
          className={cn("text-xs text-danger-600 dark:text-danger-500", classNames?.errorMessage)}
        >
          {errorMessage}
        </Field.Error>
      </Field.Root>
    );
  },
);

Switch.displayName = "Switch";
