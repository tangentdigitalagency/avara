import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./card";

describe("Card", () => {
  it("renders as a div by default", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card").tagName).toBe("DIV");
  });

  it("renders as a real button element when isPressable", () => {
    render(
      <Card isPressable data-testid="card">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card").tagName).toBe("BUTTON");
  });

  it("calls onClick when isPressable and clicked", () => {
    const onClick = vi.fn();
    render(
      <Card isPressable onClick={onClick} data-testid="card">
        Content
      </Card>,
    );
    fireEvent.click(screen.getByTestId("card"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when isPressable and isDisabled", () => {
    const onClick = vi.fn();
    render(
      <Card isPressable isDisabled onClick={onClick} data-testid="card">
        Content
      </Card>,
    );
    fireEvent.click(screen.getByTestId("card"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets aria-disabled instead of native disabled when isPressable and isDisabled", () => {
    render(
      <Card isPressable isDisabled data-testid="card">
        Content
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("aria-disabled", "true");
    expect(card).not.toBeDisabled();
  });

  it("applies classNames to the correct slots", () => {
    render(
      <Card
        classNames={{
          base: "base-class",
          header: "header-class",
          body: "body-class",
          footer: "footer-class",
        }}
      >
        <Card.Header data-testid="header">Header</Card.Header>
        <Card.Body data-testid="body">Body</Card.Body>
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByTestId("header").className).toContain("header-class");
    expect(screen.getByTestId("body").className).toContain("body-class");
    expect(screen.getByTestId("footer").className).toContain("footer-class");
  });

  it("marks Card.Action with a data-slot for the header grid CSS to target", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Action data-testid="action">Action</Card.Action>
        </Card.Header>
      </Card>,
    );
    expect(screen.getByTestId("action")).toHaveAttribute("data-slot", "card-action");
  });

  it("forwards ref to the underlying element", () => {
    const ref = { current: null as HTMLDivElement | HTMLButtonElement | null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
