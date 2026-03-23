import { render, screen } from "@testing-library/react";
import TableBody from "./TableBody";

describe("TableBody", () => {
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Price", accessor: "price" },
  ];

  // ✅ 1. Empty state
  test("renders 'No data found' when data is empty", () => {
    render(
      <table>
        <TableBody data={[]} columns={columns} />
      </table>
    );

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  // ✅ 2. Renders rows correctly
  test("renders table rows based on data", () => {
    const data = [
      { id: 1, name: "John", price: 100 },
      { id: 2, name: "Alice", price: 200 },
    ];

    render(
      <table>
        <TableBody data={data} columns={columns} />
      </table>
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  // ✅ 3. Formats price correctly
  test("formats price with $ and 2 decimals", () => {
    const data = [{ id: 1, name: "John", price: 50 }];

    render(
      <table>
        <TableBody data={data} columns={columns} />
      </table>
    );

    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("50.00")).toBeInTheDocument();
  });

  // ✅ 4. Handles missing values
  test("renders '-' when value is missing", () => {
    const data = [{ id: 1, name: null, price: null }];

    render(
      <table>
        <TableBody data={data} columns={columns} />
      </table>
    );

    expect(screen.getByText("-")).toBeInTheDocument();
  });

  // ✅ 5. Handles missing price
  test("renders 0.00 when price is missing", () => {
    const data = [{ id: 1, name: "John" }];

    render(
      <table>
        <TableBody data={data} columns={columns} />
      </table>
    );

    expect(screen.getByText("0.00")).toBeInTheDocument();
  });

  // ✅ 6. Renders correct number of rows
  test("renders correct number of rows", () => {
    const data = [
      { id: 1, name: "John", price: 10 },
      { id: 2, name: "Alice", price: 20 },
      { id: 3, name: "Bob", price: 30 },
    ];

    render(
      <table>
        <TableBody data={data} columns={columns} />
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(data.length);
  });
});