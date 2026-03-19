import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Age", accessor: "age" },
  ];

  const data = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
  ];

  test("renders table headers", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  test("renders table data", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  test("shows empty state when no data", () => {
    render(<Table columns={columns} data={[]} />);

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });
});