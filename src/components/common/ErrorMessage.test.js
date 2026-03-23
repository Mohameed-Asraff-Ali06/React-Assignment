import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders message", () => {
    render(<ErrorMessage message="Error occurred" />);

    expect(screen.getByText(/Error occurred/i)).toBeInTheDocument();
  });

  it("renders default message if none provided", () => {
    render(<ErrorMessage />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("calls retry when button clicked", () => {
    const mockRetry = jest.fn();

    render(
      <ErrorMessage message="Error" onRetry={mockRetry} />
    );

    fireEvent.click(screen.getByText(/Retry/i));

    expect(mockRetry).toHaveBeenCalled();
  });

  it("does not show retry button if no handler", () => {
    render(<ErrorMessage message="Error" />);

    expect(screen.queryByText(/Retry/i)).not.toBeInTheDocument();
  });
});