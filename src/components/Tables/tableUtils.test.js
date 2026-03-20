import { sortData } from "./tableUtils";

describe("sortData", () => {
  const mockData = [
    { name: "John", age: 30 },
    { name: "alice", age: 25 },
    { name: "Bob", age: 35 },
  ];

  //. No sortConfig (early return)
  test("returns original data when no sortConfig", () => {
    const result = sortData(mockData);
    expect(result).toEqual(mockData);
  });

  // No key in sortConfig
  test("returns original data when sortConfig has no key", () => {
    const result = sortData(mockData, {});
    expect(result).toEqual(mockData);
  });

  //  Sort strings ASC (case insensitive + numeric)
  test("sorts string values ascending (case insensitive)", () => {
    const result = sortData(mockData, { key: "name", direction: "asc" });

    expect(result.map((x) => x.name)).toEqual(["alice", "Bob", "John"]);
  });

  // Sort strings DESC
  test("sorts string values descending", () => {
    const result = sortData(mockData, { key: "name", direction: "desc" });

    expect(result.map((x) => x.name)).toEqual(["John", "Bob", "alice"]);
  });

  //  Sort numbers ASC
  test("sorts numbers ascending", () => {
    const result = sortData(mockData, { key: "age", direction: "asc" });

    expect(result.map((x) => x.age)).toEqual([25, 30, 35]);
  });

  //  Sort numbers DESC
  test("sorts numbers descending", () => {
    const result = sortData(mockData, { key: "age", direction: "desc" });

    expect(result.map((x) => x.age)).toEqual([35, 30, 25]);
  });

  //  Equal values (return 0 branch)
  test("returns 0 when values are equal", () => {
    const data = [
      { name: "Same", age: 20 },
      { name: "Same", age: 20 },
    ];

    const result = sortData(data, { key: "age", direction: "asc" });

    expect(result).toEqual(data);
  });

  //  Handles undefined values safely
  test("handles undefined values", () => {
    const data = [
      { name: "John" },
      { name: undefined },
    ];

    const result = sortData(data, { key: "name", direction: "asc" });

    expect(result.length).toBe(2);
  });

  //  Empty array
  test("handles empty array", () => {
    const result = sortData([], { key: "name", direction: "asc" });

    expect(result).toEqual([]);
  });
});