import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./tabs";

function BasicTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return (
    <Tabs defaultValue="account" {...props}>
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="password">Password</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account content</Tabs.Panel>
      <Tabs.Panel value="password">Password content</Tabs.Panel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the panel matching defaultValue, hides the other", () => {
    render(<BasicTabs />);
    expect(screen.getByText("Account content")).toBeVisible();
    expect(screen.getByText("Password content")).not.toBeVisible();
  });

  it("clicking a tab switches to its panel", () => {
    render(<BasicTabs />);
    fireEvent.click(screen.getByRole("tab", { name: "Password" }));
    expect(screen.getByText("Password content")).toBeVisible();
    expect(screen.getByText("Account content")).not.toBeVisible();
  });

  it("calls onValueChange when switching tabs", () => {
    const onValueChange = vi.fn();
    render(<BasicTabs onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Password" }));
    expect(onValueChange).toHaveBeenCalledWith("password", expect.anything());
  });

  it("disables an individual tab via its own disabled prop", () => {
    render(
      <Tabs defaultValue="account">
        <Tabs.List>
          <Tabs.Tab value="account">Account</Tabs.Tab>
          <Tabs.Tab value="password" disabled>
            Password
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="account">Account content</Tabs.Panel>
        <Tabs.Panel value="password">Password content</Tabs.Panel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Password" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("tab", { name: "Account" })).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("disables every tab when the group isDisabled, unless a tab overrides it", () => {
    render(
      <Tabs defaultValue="account" isDisabled>
        <Tabs.List>
          <Tabs.Tab value="account">Account</Tabs.Tab>
          <Tabs.Tab value="password" disabled={false}>
            Password
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="account">Account content</Tabs.Panel>
        <Tabs.Panel value="password">Password content</Tabs.Panel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("tab", { name: "Password" })).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("applies the underline variant's classes instead of solid's", () => {
    render(<BasicTabs variant="underline" />);
    expect(screen.getByRole("tablist").className).toContain("border-b");
    expect(screen.getByRole("tab", { name: "Account" }).className).toContain("pb-3");
  });

  it("applies size classes to each tab", () => {
    render(<BasicTabs size="lg" />);
    expect(screen.getByRole("tab", { name: "Account" }).className).toContain("text-base");
  });

  it("inherits color from Tabs context and applies it to the indicator", () => {
    render(<BasicTabs color="danger" />);
    const indicator = document.querySelector('[class*="bg-danger-500"]');
    expect(indicator).toBeTruthy();
  });

  it("applies fullWidth classes to the tab list and tabs", () => {
    render(
      <Tabs defaultValue="account">
        <Tabs.List fullWidth>
          <Tabs.Tab value="account" fullWidth>
            Account
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="account">Account content</Tabs.Panel>
      </Tabs>,
    );
    expect(screen.getByRole("tablist").className).toContain("flex");
    expect(screen.getByRole("tab").className).toContain("flex-1");
  });

  it("renders each tab as a native button", () => {
    render(<BasicTabs />);
    expect(screen.getByRole("tab", { name: "Account" }).tagName).toBe("BUTTON");
  });
});
