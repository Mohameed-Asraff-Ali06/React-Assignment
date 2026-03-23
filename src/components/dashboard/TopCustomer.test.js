import { render, screen } from "@testing-library/react";
import TopCustomer from "./TopCustomer";

describe("TopCustomer", () => {
  test("renders customer data correctly", () => {
    const customer = {
      customerName: "John",
      totalRewardPoints: 150,
    };

    render(<TopCustomer customer={customer} />);

    expect(screen.getByText("Top Customer")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  test("handles missing customer data", () => {
    render(<TopCustomer customer={null} />);

    expect(screen.getByText("N/A")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("handles partial customer data", () => {
    const customer = { customerName: "Alice" };

    render(<TopCustomer customer={customer} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});