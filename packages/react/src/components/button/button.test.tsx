import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when isDisabled", () => {
    const onClick = vi.fn();
    render(
      <Button isDisabled onClick={onClick}>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets aria-disabled instead of the native disabled attribute when isDisabled", () => {
    render(<Button isDisabled>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toBeDisabled();
  });

  it("does not call onClick when isLoading", () => {
    const onClick = vi.fn();
    render(
      <Button isLoading onClick={onClick}>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("hides endContent while isLoading", () => {
    render(
      <Button isLoading endContent={<span data-testid="end-icon" />}>
        Click me
      </Button>,
    );
    expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument();
  });

  it("forwards ref to the underlying button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies full width styling when fullWidth is set", () => {
    render(<Button fullWidth>Click me</Button>);
    expect(screen.getByRole("button").className).toContain("w-full");
  });

  it("renders only startContent when isIconOnly is set, ignoring children", () => {
    render(
      <Button isIconOnly aria-label="Add item" startContent={<span data-testid="icon" />}>
        This text should not render
      </Button>,
    );
    expect(screen.queryByTestId("icon")).toBeInTheDocument();
    expect(screen.queryByText("This text should not render")).not.toBeInTheDocument();
  });

  it("warns when isIconOnly is used without an accessible name", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button isIconOnly startContent={<span />} />);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("aria-label"));
  });

  it("does not warn when isIconOnly has a proper aria-label", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button isIconOnly aria-label="Add item" startContent={<span />} />);
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining("aria-label"));
  });

  it("warns when isIconOnly is combined with children", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Button isIconOnly aria-label="Add item" startContent={<span />}>
        extra text
      </Button>,
    );
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("children is ignored"));
  });

  it("applies the correct shadow class", () => {
    render(<Button shadow="lg">Click me</Button>);
    expect(screen.getByRole("button").className).toContain("shadow-lg");
  });

  it("renders with the secondary color", () => {
    render(<Button color="secondary">Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
