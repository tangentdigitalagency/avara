import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";

describe("Input", () => {
  it("renders with a label correctly associated to the input", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(<Input placeholder="you@example.com" />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("shows the description when not invalid", () => {
    render(<Input description="Helper text" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("hides the description and shows the error when isInvalid", () => {
    render(<Input description="Helper text" isInvalid errorMessage="Something went wrong" />);
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("marks the input as disabled when isDisabled", () => {
    render(<Input isDisabled label="Email" />);
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  it("marks the input as readOnly when isReadOnly", () => {
    render(<Input isReadOnly label="Email" defaultValue="fixed" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("readonly");
  });

  it("calls onValueChange when typing (uncontrolled)", () => {
    const onValueChange = vi.fn();
    render(<Input label="Email" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a" } });
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("respects a controlled value", () => {
    render(<Input label="Email" value="fixed" onValueChange={() => {}} />);
    expect(screen.getByLabelText("Email")).toHaveValue("fixed");
  });

  it("shows a clear button when isClearable and there's a value, and clears on click", () => {
    const onValueChange = vi.fn();
    render(<Input label="Email" isClearable value="something" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("does not show a clear button when isClearable but there's no value", () => {
    render(<Input label="Email" isClearable value="" onValueChange={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("does not show a clear button when disabled, even with a value", () => {
    render(
      <Input label="Email" isClearable isDisabled value="something" onValueChange={() => {}} />,
    );
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("forwards ref to the underlying input element", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} label="Email" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
