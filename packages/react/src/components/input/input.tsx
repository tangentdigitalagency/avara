import * as React from "react";
import type { SlotClassNames } from "../../lib/slot-class-names";
import { Field } from "@base-ui/react/field";
import { type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { inputVariants } from "./input.variants";
import { cn } from "../../lib/cn";

export type InputClassNames = SlotClassNames<
  "base" | "label" | "inputWrapper" | "input" | "description" | "errorMessage"
>;

export interface InputProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "color" | "value" | "defaultValue" | "className">,
    VariantProps<typeof inputVariants> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isClearable?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  classNames?: InputClassNames;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      radius,
      label,
      description,
      errorMessage,
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      isReadOnly = false,
      isClearable = false,
      startContent,
      endContent,
      value,
      defaultValue,
      onValueChange,
      id,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleClear = () => {
      handleValueChange("");
      inputRef.current?.focus();
    };

    return (
      <Field.Root
        invalid={isInvalid}
        disabled={isDisabled}
        className={cn("flex flex-col gap-1.5 text-foreground", classNames?.base, className)}
      >
        {label && (
          <Field.Label className={cn("text-sm font-semibold", classNames?.label)}>
            {label}
            {isRequired && (
              <span className="text-danger-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </Field.Label>
        )}

        <div
          className={cn(
            inputVariants({ variant, color, size, radius, isInvalid }),
            classNames?.inputWrapper,
          )}
        >
          {startContent}
          <Field.Control
            ref={inputRef}
            id={id}
            value={currentValue}
            onValueChange={handleValueChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            className={cn(classNames?.input)}
            {...props}
          />
          {isClearable && currentValue && !isDisabled && !isReadOnly && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted hover:text-foreground shrink-0"
              aria-label="Clear input"
            >
              <X className="size-4" />
            </button>
          )}
          {endContent}
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

Input.displayName = "Input";
