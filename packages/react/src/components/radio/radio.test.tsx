import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup, Radio } from "./radio";

describe("RadioGroup + Radio", () => {
  it("renders with none selected by default", () => {
    render(
      <RadioGroup label="Plan">
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((r) => expect(r).toHaveAttribute("aria-checked", "false"));
  });

  it("selects the item matching defaultValue", () => {
    render(
      <RadioGroup label="Plan" defaultValue="pro">
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Basic" })).toHaveAttribute("aria-checked", "false");
  });

  it("selecting one radio deselects the others in the group", () => {
    render(
      <RadioGroup label="Plan" defaultValue="basic">
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Pro" }));
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Basic" })).toHaveAttribute("aria-checked", "false");
  });

  it("calls onValueChange with the selected value", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Plan" onValueChange={onValueChange}>
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Pro" }));
    expect(onValueChange).toHaveBeenCalledWith("pro", expect.anything());
  });

  it("does not allow selection changes when the group isReadOnly", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Plan" defaultValue="basic" isReadOnly onValueChange={onValueChange}>
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Pro" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("disables every radio when the group isDisabled", () => {
    render(
      <RadioGroup label="Plan" isDisabled>
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    screen.getAllByRole("radio").forEach((r) => expect(r).toBeDisabled());
  });

  it("disables an individual radio via its own isDisabled, independent of the group", () => {
    render(
      <RadioGroup label="Plan">
        <Radio value="basic" label="Basic" isDisabled />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Basic" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Pro" })).not.toBeDisabled();
  });

  it("inherits color/size/variant from RadioGroup context when a Radio doesn't set its own", () => {
    render(
      <RadioGroup label="Plan" color="danger">
        <Radio value="basic" label="Basic" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio").className).toContain("danger");
  });

  it("lets an individual Radio override the group's color", () => {
    render(
      <RadioGroup label="Plan" color="danger">
        <Radio value="basic" label="Basic" color="success" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio").className).toContain("success");
    expect(screen.getByRole("radio").className).not.toContain("danger");
  });

  it("applies horizontal orientation classes", () => {
    render(
      <RadioGroup label="Plan" orientation="horizontal">
        <Radio value="basic" label="Basic" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup").className).toContain("flex-row");
  });

  it("shows the error message when isInvalid, and hides the description", () => {
    render(
      <RadioGroup label="Plan" isInvalid description="Won't show" errorMessage="Pick a plan">
        <Radio value="basic" label="Basic" />
      </RadioGroup>,
    );
    expect(screen.getByText("Pick a plan")).toBeInTheDocument();
    expect(screen.queryByText("Won't show")).not.toBeInTheDocument();
  });

  it("clicking a radio's label selects it", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Plan" onValueChange={onValueChange}>
        <Radio value="basic" label="Basic" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByText("Basic"));
    expect(onValueChange).toHaveBeenCalledWith("basic", expect.anything());
  });

  it("renders each radio as a native button", () => {
    render(
      <RadioGroup label="Plan">
        <Radio value="basic" label="Basic" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio").tagName).toBe("BUTTON");
  });
});
