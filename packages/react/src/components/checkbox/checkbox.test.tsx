import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox label="Accept" />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-checked", "false");
  });

  it("renders checked when defaultChecked is set", () => {
    render(<Checkbox label="Accept" defaultChecked />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("does not call onCheckedChange when isLoading — readOnly is what actually blocks it", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" isLoading onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("does not call onCheckedChange when isReadOnly", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" isReadOnly onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("does not call onCheckedChange when isDisabled", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" isDisabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("sets aria-busy when isLoading", () => {
    render(<Checkbox label="Accept" isLoading />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-busy", "true");
  });

  it("reflects isIndeterminate as aria-checked=mixed", () => {
    render(<Checkbox label="Select all" isIndeterminate />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("clicking the associated label toggles the checkbox", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept terms" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByText("Accept terms"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("shows a required asterisk when isRequired", () => {
    render(<Checkbox label="Accept" isRequired />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows the error message when isInvalid, and hides the description", () => {
    render(
      <Checkbox
        label="Accept"
        isInvalid
        description="This won't show"
        errorMessage="You must accept to continue"
      />,
    );
    expect(screen.getByText("You must accept to continue")).toBeInTheDocument();
    expect(screen.queryByText("This won't show")).not.toBeInTheDocument();
  });

  it("shows the description when not invalid", () => {
    render(<Checkbox label="Accept" description="Real description text" />);
    expect(screen.getByText("Real description text")).toBeInTheDocument();
  });

  it("applies classNames to the correct slots", () => {
    render(
      <Checkbox
        label="Accept"
        description="Desc"
        classNames={{ box: "box-class", label: "label-class", description: "desc-class" }}
      />,
    );
    expect(screen.getByRole("checkbox").className).toContain("box-class");
    expect(screen.getByText("Accept").className).toContain("label-class");
    expect(screen.getByText("Desc").className).toContain("desc-class");
  });

  it("forwards ref to the underlying button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Checkbox label="Accept" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders as a native button, not a native input", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole("checkbox").tagName).toBe("BUTTON");
  });
});
