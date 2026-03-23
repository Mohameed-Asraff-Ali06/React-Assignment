import { sortData } from "./tableUtils";

describe("sortData", () => {
  const mockData = [
    { name: "John", age: 30 },
    { name: "alice", age: 25 },
    { name: "Bob", age: 35 },
  ];

  // No sortConfig
  test("returns original data when no sortConfig", () => {
    const result = sortData(mockData);
    expect(result).toEqual(mockData);
  });

  // No key in sortConfig
  test("returns original data when sortConfig has no key", () => {
    const result = sortData(mockData, {});
    expect(result).toEqual(mockData);
  });

  // String ASC (case insensitive)
  test("sorts string values ascending (case insensitive)", () => {
    const result = sortData(mockData, { key: "name", direction: "asc" });

    expect(result.map((x) => x.name)).toEqual(["alice", "Bob", "John"]);
  });

  // String DESC
  test("sorts string values descending", () => {
    const result = sortData(mockData, { key: "name", direction: "desc" });

    expect(result.map((x) => x.name)).toEqual(["John", "Bob", "alice"]);
  });

  // Number ASC
  test("sorts numbers ascending", () => {
    const result = sortData(mockData, { key: "age", direction: "asc" });

    expect(result.map((x) => x.age)).toEqual([25, 30, 35]);
  });

  // Number DESC
  test("sorts numbers descending", () => {
    const result = sortData(mockData, { key: "age", direction: "desc" });

    expect(result.map((x) => x.age)).toEqual([35, 30, 25]);
  });

  // Equal values
  test("returns same order when values are equal", () => {
    const data = [
      { name: "Same", age: 20 },
      { name: "Same", age: 20 },
    ];

    const result = sortData(data, { key: "age", direction: "asc" });

    expect(result).toEqual(data);
  });

  // Undefined / null handling
  test("pushes null/undefined values to bottom", () => {
    const data = [
      { name: "John" },
      { name: null },
      { name: "Alice" },
    ];

    const result = sortData(data, { key: "name", direction: "asc" });

    expect(result.map((x) => x.name)).toEqual(["Alice", "John", null]);
  });

  // Mixed types
  test("handles mixed types safely", () => {
    const data = [
      { value: "10" },
      { value: 2 },
      { value: "3" },
    ];

    const result = sortData(data, { key: "value", direction: "asc" });

    expect(result.length).toBe(3);
  });

  // Empty array
  test("handles empty array", () => {
    const result = sortData([], { key: "name", direction: "asc" });

    expect(result).toEqual([]);
  });

  // Invalid input (error handling)
  test("handles invalid data input safely", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = sortData(null, { key: "name", direction: "asc" });

    expect(result).toEqual([]); // fallback
    expect(spy).toHaveBeenCalled(); // error logged

    spy.mockRestore();
  });
});