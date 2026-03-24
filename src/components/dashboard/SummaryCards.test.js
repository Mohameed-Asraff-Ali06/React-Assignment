import { render, screen } from "@testing-library/react";
import SummaryCards from "./SummaryCards";

describe("SummaryCards", () => {
  const props = {
    totalCustomers: 10,
    totalTransactions: 50,
    totalCustomerPoints: 200,
  };

  test("renders all summary cards", () => {
    render(<SummaryCards {...props} />);
    expect(screen.getByText("Total Customers")).toBeInTheDocument();
    expect(screen.getByText("Total Transactions")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();
  });

  test("displays correct values", () => {
    render(<SummaryCards {...props} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  test("renders zero values correctly", () => {
    render(
      <SummaryCards
        totalCustomers={0}
        totalTransactions={0}
        totalCustomerPoints={0}
      />,
    );

    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });
});
