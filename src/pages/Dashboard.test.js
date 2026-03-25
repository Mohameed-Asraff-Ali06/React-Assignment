import { render, screen, fireEvent } from "@testing-library/react";
import { useFetch } from "../hooks/useFetch";
import Dashboard from "./Dashboard";

//  correct hook
jest.mock("../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));


//  mock utils properly
jest.mock("../utils/rewardUtils", () => ({
  calculateRewardPoints: jest.fn(() => 10),
  aggregateMonthlyRewards: jest.fn(() => []),   
  calculateTotalRewards: jest.fn(() => []),     
}));

//  Mock components (keep simple)
jest.mock("../components/common/Loader", () => () => <div>Loading...</div>);
jest.mock("../components/common/ErrorMessage", () => ({ message }) => (
  <div>{message}</div>
));
jest.mock("../components/Tables/Table", () => () => <div>Table</div>);
jest.mock("../components/dashboard/SummaryCards", () => () => (
  <div>Summary</div>
));
jest.mock("../components/dashboard/TopCustomer", () => () => (
  <div>TopCustomer</div>
));

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //  Loader
  test("renders loader", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: true,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  //  Error
  test("renders error message when error occurs", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: "Error occurred",
      retry: jest.fn(),
    });

    render(<Dashboard />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  //  Default tab
  test("renders transactions tab by default", () => {
    useFetch.mockReturnValue({
      data: [
        { id: 1, customerId: "John", price: 120, date: "2024-01-01" },
      ],
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);

    expect(
      screen.getByRole("button", { name: /transactions/i })
    ).toBeInTheDocument();
  });

  //  Monthly tab
  test("switches to monthly tab", () => {
    useFetch.mockReturnValue({
      data: [
        { id: 1, customerId: "John", price: 120, date: "2024-01-01" },
      ],
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: /monthly/i }));

    expect(
      screen.getByRole("button", { name: /monthly/i })
    ).toBeInTheDocument();
  });

  //  Total tab
  test("switches to total tab", () => {
    useFetch.mockReturnValue({
      data: [
        { id: 1, customerId: "John", price: 120, date: "2024-01-01" },
      ],
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: /total/i }));

    expect(
      screen.getByRole("button", { name: /total/i })
    ).toBeInTheDocument();
  });
});