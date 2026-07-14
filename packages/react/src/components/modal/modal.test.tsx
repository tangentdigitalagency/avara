import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./modal";

describe("Modal", () => {
  it("renders its content when isOpen", () => {
    render(
      <Modal isOpen onOpenChange={() => {}}>
        <Modal.Header>
          <Modal.Title>Test title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Body content</Modal.Body>
      </Modal>,
    );
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("does not render its content when isOpen is false", () => {
    render(
      <Modal isOpen={false} onOpenChange={() => {}}>
        <Modal.Body>Hidden content</Modal.Body>
      </Modal>,
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });

  it("renders as an accessible dialog with the title as its accessible name", () => {
    render(
      <Modal isOpen onOpenChange={() => {}}>
        <Modal.Header>
          <Modal.Title>Accessible title</Modal.Title>
        </Modal.Header>
      </Modal>,
    );
    expect(screen.getByRole("dialog", { name: "Accessible title" })).toBeInTheDocument();
  });

  it("associates Modal.Description as the dialog's accessible description", () => {
    render(
      <Modal isOpen onOpenChange={() => {}}>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
          <Modal.Description>Description text</Modal.Description>
        </Modal.Header>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    const describedBy = dialog.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent("Description text");
  });

  it("calls onOpenChange(false) when the close button is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal isOpen onOpenChange={onOpenChange}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not render a close button when showCloseButton is false", () => {
    render(
      <Modal isOpen onOpenChange={() => {}} showCloseButton={false}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  });

  it("calls onOpenChange(false) when Escape is pressed", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal isOpen onOpenChange={onOpenChange}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does NOT call onOpenChange when Escape is pressed and isKeyboardDismissDisabled — the real bug we worked around", () => {
    const onOpenChange = vi.fn();
    render(
      <Modal isOpen onOpenChange={onOpenChange} isKeyboardDismissDisabled>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
