import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { type VariantProps } from "class-variance-authority";
import {
  tabsListVariants,
  tabsTabVariants,
  tabsIndicatorVariants,
  tabsPanelVariants,
  tabsIndicatorColorClass,
} from "./tabs.variants";
import { cn } from "../../lib/cn";

export type TabsColor =
  "primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info";
export type TabsVariant = "solid" | "underline";
export type TabsSize = "sm" | "md" | "lg" | "xl";

interface TabsContextValue {
  color: TabsColor;
  variant: TabsVariant;
  size: TabsSize;
  isDisabled: boolean;
}

const TabsContext = React.createContext<TabsContextValue>({
  color: "primary",
  variant: "solid",
  size: "md",
  isDisabled: false,
});

export interface TabsProps extends Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  "className"
> {
  color?: TabsColor;
  variant?: TabsVariant;
  size?: TabsSize;
  isDisabled?: boolean;
  className?: string;
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, color = "primary", variant = "solid", size = "md", isDisabled = false, ...props },
    ref,
  ) => {
    const contextValue = React.useMemo(
      () => ({ color, variant, size, isDisabled }),
      [color, variant, size, isDisabled],
    );
    return (
      <TabsContext.Provider value={contextValue}>
        <TabsPrimitive.Root ref={ref} className={cn(className)} {...props} />
      </TabsContext.Provider>
    );
  },
);
TabsRoot.displayName = "Tabs";

export interface TabsListProps
  extends
    Omit<React.ComponentProps<typeof TabsPrimitive.List>, "className">,
    Pick<VariantProps<typeof tabsListVariants>, "fullWidth"> {
  className?: string;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, fullWidth, children, ...props }, ref) => {
    const { color, variant, size } = React.useContext(TabsContext);
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
        <TabsPrimitive.Indicator
          className={cn(tabsIndicatorVariants({ variant }), tabsIndicatorColorClass[color])}
        />
      </TabsPrimitive.List>
    );
  },
);
TabsList.displayName = "Tabs.List";

export interface TabProps
  extends
    Omit<React.ComponentProps<typeof TabsPrimitive.Tab>, "className">,
    Pick<VariantProps<typeof tabsTabVariants>, "fullWidth"> {
  className?: string;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, fullWidth, disabled, ...props }, ref) => {
    const { color, variant, size, isDisabled } = React.useContext(TabsContext);
    return (
      <TabsPrimitive.Tab
        ref={ref}
        nativeButton
        render={<button type="button" />}
        disabled={disabled ?? isDisabled}
        className={cn(
          tabsTabVariants({ variant, size, fullWidth, color }),
          variant === "underline" && "pb-3",
          className,
        )}
        {...props}
      />
    );
  },
);
Tab.displayName = "Tabs.Tab";

export interface TabPanelProps extends Omit<
  React.ComponentProps<typeof TabsPrimitive.Panel>,
  "className"
> {
  className?: string;
}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.Panel
    ref={ref}
    keepMounted
    className={cn(tabsPanelVariants, className)}
    {...props}
  />
));
TabPanel.displayName = "Tabs.Panel";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabPanel,
});
