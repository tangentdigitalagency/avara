import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Select } from "./select";

const fruitItems = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry", isDisabled: true },
];

describe("Select", () => {
  it("shows the placeholder when nothing is selected", () => {
    render(<Select items={fruitItems} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("shows the selected item's label when defaultValue is set", () => {
    render(<Select items={fruitItems} defaultValue="banana" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });

  it("opens the popup when the trigger is clicked", async () => {
    render(<Select items={fruitItems} />);
    fireEvent.click(screen.getByRole("combobox"));
    await waitFor(() => expect(screen.getByRole("listbox")).toBeInTheDocument());
  });

  it("selecting an item calls onValueChange with that item's value", async () => {
    const onValueChange = vi.fn();
    render(<Select items={fruitItems} onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => screen.getByRole("listbox"));
    fireEvent.keyDown(screen.getByRole("option", { name: "Banana" }), { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith("banana", expect.anything());
  });

  it("does not allow selecting a disabled item", async () => {
    const onValueChange = vi.fn();
    render(<Select items={fruitItems} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    await waitFor(() => screen.getByRole("listbox"));
    fireEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("joins multiple selected labels with a comma when isMultiple", () => {
    render(<Select items={fruitItems} isMultiple value={["apple", "banana"]} />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Apple, Banana");
  });

  it("calls onValueChange with an array when isMultiple", async () => {
    const onValueChange = vi.fn();
    render(<Select items={fruitItems} isMultiple value={[]} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    await waitFor(() => screen.getByRole("listbox"));
    fireEvent.click(screen.getByRole("option", { name: "Apple" }));
    expect(onValueChange).toHaveBeenCalledWith(["apple"], expect.anything());
  });

  it("shows a clear button only when isClearable and a value is selected", () => {
    const { rerender } = render(
      <Select items={fruitItems} isClearable value={null} onValueChange={() => {}} />,
    );
    expect(screen.queryByRole("button", { name: "Clear selection" })).not.toBeInTheDocument();

    rerender(<Select items={fruitItems} isClearable value="apple" onValueChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Clear selection" })).toBeInTheDocument();
  });

  it("clicking the clear button calls onValueChange with null, and does not open the popup", () => {
    const onValueChange = vi.fn();
    render(<Select items={fruitItems} isClearable value="apple" onValueChange={onValueChange} />);
    fireEvent.pointerDown(screen.getByRole("button", { name: "Clear selection" }));
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows the error message when isInvalid, and hides the description", () => {
    render(
      <Select
        items={fruitItems}
        isInvalid
        description="Won't show"
        errorMessage="Please pick a fruit"
      />,
    );
    expect(screen.getByText("Please pick a fruit")).toBeInTheDocument();
    expect(screen.queryByText("Won't show")).not.toBeInTheDocument();
  });

  it("shows the required asterisk when isRequired", () => {
    render(<Select items={fruitItems} label="Fruit" isRequired />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("disables the trigger when isDisabled", () => {
    render(<Select items={fruitItems} isDisabled />);
    expect(screen.getByRole("combobox")).toHaveAttribute("data-disabled");
  });

  it("forwards ref to the trigger button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Select items={fruitItems} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
