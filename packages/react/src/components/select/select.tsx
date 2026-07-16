import * as React from "react";
import type { SlotClassNames } from "../../lib/slot-class-names";
import { Field } from "@base-ui/react/field";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, X } from "lucide-react";
import { selectTriggerVariants, selectPopupVariants, selectItemVariants } from "./select.variants";
import { cn } from "../../lib/cn";

export type SelectClassNames = SlotClassNames<
  "base" | "trigger" | "value" | "popup" | "item" | "label" | "description" | "errorMessage"
>;

export interface SelectItemOption {
  value: string;
  label: string;
  description?: string;
  isDisabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  items: SelectItemOption[];
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  onValueChange?: (value: string | string[] | null) => void;
  isMultiple?: boolean;
  placeholder?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isClearable?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  classNames?: SelectClassNames;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      classNames,
      variant,
      color,
      size,
      radius,
      items,
      value,
      defaultValue,
      onValueChange,
      isMultiple = false,
      placeholder = "Select an option",
      label,
      description,
      errorMessage,
      isInvalid = false,
      isRequired = false,
      isDisabled = false,
      isReadOnly = false,
      isClearable = false,
      side = "bottom",
      align = "start",
      sideOffset = 4,
    },
    ref,
  ) => {
    const hasValue = isMultiple
      ? Array.isArray(value ?? defaultValue) && (value ?? defaultValue)!.length > 0
      : Boolean(value ?? defaultValue);

    return (
      <Field.Root
        invalid={isInvalid}
        disabled={isDisabled}
        className={cn("flex flex-col gap-1", classNames?.base, className)}
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

        <SelectPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          multiple={isMultiple}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              selectTriggerVariants({ variant, color, size, radius, isInvalid }),
              classNames?.trigger,
            )}
          >
            <SelectPrimitive.Value
              className={cn("truncate", !hasValue && "text-muted", classNames?.value)}
            >
              {(selectedValue: string | string[] | null) => {
                if (
                  !selectedValue ||
                  (Array.isArray(selectedValue) && selectedValue.length === 0)
                ) {
                  return placeholder;
                }
                const values = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
                return values
                  .map((v) => items.find((item) => item.value === v)?.label ?? v)
                  .join(", ");
              }}
            </SelectPrimitive.Value>

            <div className="flex items-center gap-1 shrink-0">
              {isClearable && hasValue && (
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label="Clear selection"
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onValueChange?.(isMultiple ? [] : null);
                  }}
                  className="rounded-full p-0.5 text-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </span>
              )}
              <SelectPrimitive.Icon>
                <ChevronDown className="text-muted transition-transform duration-150 data-open:rotate-180" />
              </SelectPrimitive.Icon>
            </div>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Positioner
              side={side}
              align={align}
              sideOffset={sideOffset}
              alignItemWithTrigger={false}
            >
              <SelectPrimitive.Popup className={cn(selectPopupVariants, classNames?.popup)}>
                <SelectPrimitive.List>
                  {items.map((item) => (
                    <SelectPrimitive.Item
                      key={item.value}
                      value={item.value}
                      disabled={item.isDisabled}
                      className={cn(selectItemVariants, classNames?.item)}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-muted truncate">{item.description}</span>
                        )}
                      </div>
                      <SelectPrimitive.ItemIndicator>
                        <Check className="size-4 text-primary-600 dark:text-primary-400" />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.List>
              </SelectPrimitive.Popup>
            </SelectPrimitive.Positioner>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

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

Select.displayName = "Select";
