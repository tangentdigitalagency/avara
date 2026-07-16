import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("renders checked when defaultChecked is set", () => {
    render(<Switch label="Notifications" defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("does not call onCheckedChange when isLoading", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" isLoading onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("does not call onCheckedChange when isReadOnly", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" isReadOnly onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("does not call onCheckedChange when isDisabled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" isDisabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("sets aria-busy when isLoading", () => {
    render(<Switch label="Notifications" isLoading />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-busy", "true");
  });

  it("clicking the associated label toggles the switch", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Airplane mode" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByText("Airplane mode"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("resolves a function thumbIcon with the current checked state", () => {
    const thumbIcon = vi.fn((checked: boolean) => <span data-testid="thumb-icon">{checked ? "on" : "off"}</span>);
    render(<Switch label="Theme" defaultChecked thumbIcon={thumbIcon} />);
    expect(thumbIcon).toHaveBeenCalledWith(true);
    expect(screen.getByTestId("thumb-icon")).toHaveTextContent("on");
  });

  it("renders a static thumbIcon regardless of checked state", () => {
    render(<Switch label="Theme" thumbIcon={<span data-testid="static-icon" />} />);
    expect(screen.getByTestId("static-icon")).toBeInTheDocument();
  });

  it("shows the error message when isInvalid, and hides the description", () => {
    render(
      <Switch
        label="Notifications"
        isInvalid
        description="This won't show"
        errorMessage="Something is wrong"
      />,
    );
    expect(screen.getByText("Something is wrong")).toBeInTheDocument();
    expect(screen.queryByText("This won't show")).not.toBeInTheDocument();
  });

  it("shows the required asterisk when isRequired", () => {
    render(<Switch label="Notifications" isRequired />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("applies classNames to the correct slots", () => {
    render(
      <Switch
        label="Notifications"
        classNames={{ track: "track-class", thumb: "thumb-class", label: "label-class" }}
      />,
    );
    expect(screen.getByRole("switch").className).toContain("track-class");
    expect(screen.getByText("Notifications").className).toContain("label-class");
  });

  it("forwards ref to the underlying button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Switch label="Notifications" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders as a native button, not a native input", () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole("switch").tagName).toBe("BUTTON");
  });
});