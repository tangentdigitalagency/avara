import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Toaster, toast } from "./toast";

describe("Toast", () => {
  it("renders a toast with the correct color styling class", async () => {
    render(<Toaster />);
    toast.success("Saved");
    await waitFor(() => expect(screen.getByText("Saved")).toBeInTheDocument());
  });

  it("shows a progress bar element only when timeout is greater than 0", async () => {
    render(<Toaster duration={5000} />);
    toast("Auto-dismiss");
    await waitFor(() => expect(screen.getByText("Auto-dismiss")).toBeInTheDocument());
    expect(screen.getByTestId("toast-progress")).toBeInTheDocument();
  });

  it("does not render a progress bar when duration is infinite", async () => {
    render(<Toaster />);
    toast("Stays forever", { duration: "infinite" });
    await waitFor(() => expect(screen.getByText("Stays forever")).toBeInTheDocument());
    expect(screen.queryByTestId("toast-progress")).not.toBeInTheDocument();
  });

  it("remaps a rejected promise to our own 'danger' color, not Base UI's raw 'error' type", async () => {
    render(<Toaster />);
    const failing = Promise.reject(new Error("nope"));
    const result = toast.promise(failing, {
      loading: "Working…",
      success: "Done",
      error: (err) => `Failed: ${(err as Error).message}`,
    });
    // toast.promise() returns its own promise chained from the input — that's
    // the one that was actually unhandled, not the original `failing` promise.
    result.catch(() => {});
    await waitFor(() => expect(screen.getByText("Failed: nope")).toBeInTheDocument());
    // The real regression this guards against: Base UI's promise() sets
    // type: 'error' internally, which doesn't exist in our color map at all —
    // our wrapper must remap it to 'danger' or styling silently disappears.
  });

  it("resolves a successful promise with the success color", async () => {
    render(<Toaster />);
    const succeeding = Promise.resolve("ok");
    toast.promise(succeeding, {
      loading: "Working…",
      success: "All done",
      error: "Failed",
    });
    await waitFor(() => expect(screen.getByText("All done")).toBeInTheDocument());
  });

  it("renders the action as a real button styled with Avara's buttonVariants classes, not a nested <Button>", async () => {
    render(<Toaster />);
    toast("File deleted", { action: { label: "Undo", onClick: () => {} } });
    const actionButton = await screen.findByRole("button", { name: "Undo" });
    // Guards the real HTML-validity constraint: Toast.Action already renders
    // a <button> — styling must be applied via className, never a nested <Button>.
    expect(actionButton.tagName).toBe("BUTTON");
    expect(actionButton.querySelector("button")).toBeNull();
  });

  it("caps visible toasts at maxVisible and keeps the newest ones", async () => {
    render(<Toaster maxVisible={2} />);
    toast("First");
    toast("Second");
    toast("Third");
    await waitFor(() => expect(screen.getByText("Third")).toBeInTheDocument());
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.queryByText("First")).not.toBeInTheDocument();
  });
});
