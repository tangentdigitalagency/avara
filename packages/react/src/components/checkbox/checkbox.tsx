import * as React from "react";
import type { SlotClassNames } from "../../lib/slot-class-names";
import { Field } from "@base-ui/react/field";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { type VariantProps } from "class-variance-authority";
import { Minus, Loader2 } from "lucide-react";
import {
  checkboxVariants,
  checkboxIndicatorVariants,
  checkboxWaveVariants,
} from "./checkbox.variants";
import { cn } from "../../lib/cn";

export type CheckboxClassNames = SlotClassNames<
  "base" | "row" | "box" | "indicator" | "label" | "description" | "errorMessage"
>;

export interface CheckboxProps
  extends
    Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "className" | "render" | "children">,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isIndeterminate?: boolean;
  isLoading?: boolean;
  className?: string;
  classNames?: CheckboxClassNames;
}

function DrawnCheckIcon({ delayMs }: { delayMs: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M2.5 8.5 6 12l7.5-9"
        style={{ transitionDelay: `${delayMs}ms` }}
        className="[stroke-dasharray:20] [stroke-dashoffset:20] transition-[stroke-dashoffset] duration-300 ease-(--ease-spring) group-data-checked/indicator:[stroke-dashoffset:0]"
      />
    </svg>
  );
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      radius,
      motion = "pop",
      label,
      description,
      errorMessage,
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      isReadOnly = false,
      isIndeterminate = false,
      isLoading = false,
      id,
      checked,
      defaultChecked,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const drawDelay = motion === "stagger" ? 300 : motion === "wave" ? 150 : 60;

    return (
      <Field.Root
        invalid={isInvalid}
        disabled={isDisabled}
        className={cn("flex flex-col gap-1", classNames?.base, className)}
      >
        <div className={cn("flex items-start gap-2", classNames?.row)}>
          <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            nativeButton
            render={<button type="button" />}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            indeterminate={isIndeterminate}
            disabled={isDisabled}
            readOnly={isReadOnly || isLoading}
            required={isRequired}
            aria-busy={isLoading || undefined}
            className={cn(
              checkboxVariants({ variant, color, size, radius, isInvalid, isLoading, motion }),
              classNames?.box,
            )}
            {...props}
          >
            {motion === "wave" && <span className={checkboxWaveVariants()} aria-hidden="true" />}
            <CheckboxPrimitive.Indicator
              keepMounted
              className={cn(checkboxIndicatorVariants({ isLoading }), classNames?.indicator)}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : isIndeterminate ? (
                <Minus aria-hidden="true" />
              ) : (
                <DrawnCheckIcon delayMs={drawDelay} />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

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

Checkbox.displayName = "Checkbox";
