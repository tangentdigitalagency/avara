import * as React from "react";
import type { SlotClassNames } from "../../lib/slot-class-names";
import { Field } from "@base-ui/react/field";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { type VariantProps } from "class-variance-authority";
import { radioVariants, radioIndicatorVariants, radioGroupVariants } from "./radio.variants";
import { cn } from "../../lib/cn";

export type RadioGroupClassNames = SlotClassNames<
  "base" | "items" | "label" | "description" | "errorMessage"
>;
export type RadioClassNames = SlotClassNames<
  "base" | "row" | "circle" | "indicator" | "label" | "description"
>;

type RadioSharedProps = VariantProps<typeof radioVariants>;

interface RadioGroupContextValue extends RadioSharedProps {
  isInvalid: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({ isInvalid: false });

export interface RadioGroupProps
  extends
    Omit<React.ComponentProps<typeof RadioGroupPrimitive>, "className" | "children">,
    RadioSharedProps,
    VariantProps<typeof radioGroupVariants> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
  classNames?: RadioGroupClassNames;
  children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      motion,
      orientation,
      label,
      description,
      errorMessage,
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      isReadOnly = false,
      value,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const contextValue = React.useMemo(
      () => ({ variant, color, size, motion, isInvalid }),
      [variant, color, size, motion, isInvalid],
    );

    return (
      <Field.Root
        invalid={isInvalid}
        disabled={isDisabled}
        className={cn("flex flex-col gap-2", classNames?.base, className)}
      >
        {label && (
          <Field.Label className={cn("text-sm font-medium", classNames?.label)}>
            {label}
            {isRequired && (
              <span className="text-danger-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Field.Label>
        )}

        {description && !isInvalid && (
          <Field.Description className={cn("text-xs text-muted", classNames?.description)}>
            {description}
          </Field.Description>
        )}

        <RadioGroupPrimitive
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          className={cn(radioGroupVariants({ orientation }), classNames?.items)}
          {...props}
        >
          <RadioGroupContext.Provider value={contextValue}>{children}</RadioGroupContext.Provider>
        </RadioGroupPrimitive>

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

RadioGroup.displayName = "RadioGroup";

export interface RadioProps
  extends
    Omit<React.ComponentProps<typeof RadioPrimitive.Root>, "className" | "render">,
    Partial<RadioSharedProps> {
  label?: string;
  description?: string;
  isDisabled?: boolean;
  className?: string;
  classNames?: RadioClassNames;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      motion,
      label,
      description,
      isDisabled,
      value,
      ...props
    },
    ref,
  ) => {
    const group = React.useContext(RadioGroupContext);
    const labelId = React.useId();
    const resolvedVariant = variant ?? group.variant;
    const resolvedColor = color ?? group.color;
    const resolvedSize = size ?? group.size;
    const resolvedMotion = motion ?? group.motion;

    return (
      <label className={cn("flex items-start gap-2 cursor-pointer", classNames?.row)}>
        <RadioPrimitive.Root
          ref={ref}
          value={value}
          nativeButton
          render={<button type="button" />}
          disabled={isDisabled}
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            radioVariants({
              variant: resolvedVariant,
              color: resolvedColor,
              size: resolvedSize,
              isInvalid: group.isInvalid,
              motion: resolvedMotion,
            }),
            classNames?.circle,
          )}
          {...props}
        >
          <RadioPrimitive.Indicator
            className={cn(radioIndicatorVariants(), classNames?.indicator)}
          />
        </RadioPrimitive.Root>

        {(label || description) && (
          <div className={cn("flex flex-col", classNames?.base, className)}>
            {label && (
              <span id={labelId} className={cn("text-sm font-medium leading-none", classNames?.label)}>
                {label}
              </span>
            )}
            {description && (
              <span className={cn("text-xs text-muted mt-1", classNames?.description)}>
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  },
);

Radio.displayName = "Radio";
