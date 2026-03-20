import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

// Component that throws error
const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  test("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal Content")).toBeInTheDocument();
  });

  test("renders fallback UI when error occurs", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});