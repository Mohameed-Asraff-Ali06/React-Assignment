import { render, screen, fireEvent } from "@testing-library/react";

// ✅ Mock hook (correct)
jest.mock("../hooks/useTransactions", () => ({
  useTransactions: jest.fn(),
}));

import { useTransactions } from "../hooks/useTransactions";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

 

  //  Error state
  test("renders error message when error occurs", () => {
    useTransactions.mockReturnValue({
      transactions: [],
      loading: false,
      error: "Error occurred",
      retry: jest.fn(),
    });

    render(<Dashboard />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  //  Default render (transactions tab)
  test("renders transactions tab by default", () => {
    useTransactions.mockReturnValue({
      transactions: [
        { id: 1, customer: "John", price: 120, date: "2024-01-01" },
      ],
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);

    // Use role instead of text
    expect(
      screen.getByRole("button", { name: /transactions/i })
    ).toBeInTheDocument();
  });

  //  Switch to monthly tab
  test("switches to monthly tab", () => {
    useTransactions.mockReturnValue({
      transactions: [
        { id: 1, customer: "John", price: 120, date: "2024-01-01" },
      ],
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);

    const monthlyTab = screen.getByRole("button", { name: /monthly/i });
    fireEvent.click(monthlyTab);

    expect(monthlyTab).toBeInTheDocument();
  });

  // Switch to total tab
  test("switches to total tab", () => {
    useTransactions.mockReturnValue({
      transactions: [
        { id: 1, customer: "John", price: 120, date: "2024-01-01" },
      ],
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);

    const totalTab = screen.getByRole("button", { name: /total/i });
    fireEvent.click(totalTab);

    expect(totalTab).toBeInTheDocument();
  });


});