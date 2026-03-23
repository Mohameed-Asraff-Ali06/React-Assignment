import { render, screen, fireEvent } from "@testing-library/react";
import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  const columns = [
    { label: "Name", accessor: "name", sortable: true },
    { label: "Age", accessor: "age", sortable: true },
    { label: "City", accessor: "city" }, // not sortable
  ];

  const mockOnSort = jest.fn();

  const defaultSortConfig = {
    key: null,
    direction: "asc",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  //   Renders all column headers
  test("renders all column labels", () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          onSort={mockOnSort}
          sortConfig={defaultSortConfig}
        />
      </table>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
  });

  //  Click triggers sorting for sortable column
  test("calls onSort when sortable column is clicked", () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          onSort={mockOnSort}
          sortConfig={defaultSortConfig}
        />
      </table>
    );

    fireEvent.click(screen.getByText("Name"));

    expect(mockOnSort).toHaveBeenCalledWith("name");
  });

  //  Does NOT call onSort for non-sortable column
  test("does not call onSort when non-sortable column is clicked", () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          onSort={mockOnSort}
          sortConfig={defaultSortConfig}
        />
      </table>
    );

    fireEvent.click(screen.getByText("City"));

    expect(mockOnSort).not.toHaveBeenCalled();
  });

  //  Shows ascending icon
  test("shows ascending icon when sorted asc", () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          onSort={mockOnSort}
          sortConfig={{ key: "name", direction: "asc" }}
        />
      </table>
    );

    expect(screen.getByText("▲")).toBeInTheDocument();
  });

  //  Shows descending icon
  test("shows descending icon when sorted desc", () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          onSort={mockOnSort}
          sortConfig={{ key: "name", direction: "desc" }}
        />
      </table>
    );

    expect(screen.getByText("▼")).toBeInTheDocument();
  });

  //  Shows default icon when not sorted
  test("shows default sort icon when not sorted", () => {
    render(
      <table>
        <TableHeader
          columns={columns}
          onSort={mockOnSort}
          sortConfig={{ key: null, direction: "asc" }}
        />
      </table>
    );

    expect(screen.getAllByText("⇅").length).toBeGreaterThan(0);
  });


});