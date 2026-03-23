import {
  calculateRewardPoints,
  aggregateMonthlyRewards,
  calculateTotalRewards,
} from "./rewardUtils";

describe("calculateRewardPoints", () => {
  test("returns 0 for price <= 50", () => {
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(40)).toBe(0);
  });

  test("returns correct points for price between 51-100", () => {
    expect(calculateRewardPoints(60)).toBe(10);
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(100)).toBe(50);
  });

  test("returns correct points for price > 100", () => {
    expect(calculateRewardPoints(120)).toBe(90);
    expect(calculateRewardPoints(150)).toBe(150);
  });

  test("handles decimal values correctly", () => {
    expect(calculateRewardPoints(100.4)).toBe(50);
    expect(calculateRewardPoints(120.9)).toBe(90);
  });

  test("handles invalid input", () => {
    expect(calculateRewardPoints(null)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
    expect(calculateRewardPoints("abc")).toBe(0);
  });

  test("handles unexpected errors gracefully", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = calculateRewardPoints({}); // invalid type

    expect(result).toBe(0);
    

    spy.mockRestore();
  });
});

describe("aggregateMonthlyRewards", () => {
  const transactions = [
    {
      customerId: 1,
      customerName: "John",
      date: "2024-12-10",
      price: 120,
    },
    {
      customerId: 1,
      customerName: "John",
      date: "2024-12-15",
      price: 80,
    },
    {
      customerId: 2,
      customerName: "Alice",
      date: "2025-01-05",
      price: 200,
    },
  ];

  test("returns empty array for empty input", () => {
    expect(aggregateMonthlyRewards([])).toEqual([]);
  });

  test("groups rewards by customer, month, and year", () => {
    const result = aggregateMonthlyRewards(transactions);
    expect(result.length).toBe(2);
  });

  test("calculates correct reward points per group", () => {
    const result = aggregateMonthlyRewards(transactions);

    const john = result.find((r) => r.customerId === 1);

    // John:
    // 120 → 90
    // 80 → 30
    // Total = 120
    expect(john.rewardPoints).toBe(120);
  });

  test("handles multiple customers correctly", () => {
    const result = aggregateMonthlyRewards(transactions);

    const alice = result.find((r) => r.customerId === 2);

    expect(alice).toBeDefined();
    expect(alice.rewardPoints).toBe(250); // 200 → 250 points
  });

  test("handles invalid or missing data safely", () => {
    const badData = [
      { customerId: 1, customerName: "John", date: null, price: 100 },
      { customerId: 1, customerName: "John", price: 100 },
    ];

    const result = aggregateMonthlyRewards(badData);

    expect(result).toEqual([]);
  });

  test("skips transactions with invalid date", () => {
    const badData = [
      {
        customerId: 1,
        customerName: "John",
        date: "invalid-date",
        price: 100,
      },
    ];

    const result = aggregateMonthlyRewards(badData);

    expect(result).toEqual([]);
  });

  test("handles invalid input (non-array) safely", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = aggregateMonthlyRewards(null);

    expect(result).toEqual([]);
    

    spy.mockRestore();
  });

  test("ignores transactions without customerId", () => {
    const data = [
      { customerName: "John", date: "2024-12-10", price: 100 },
    ];

    const result = aggregateMonthlyRewards(data);

    expect(result).toEqual([]);
  });
});

describe("calculateTotalRewards", () => {
  const monthlyData = [
    {
      customerId: 1,
      customerName: "John",
      rewardPoints: 100,
    },
    {
      customerId: 1,
      customerName: "John",
      rewardPoints: 50,
    },
    {
      customerId: 2,
      customerName: "Alice",
      rewardPoints: 200,
    },
  ];

  test("returns empty array for empty input", () => {
    expect(calculateTotalRewards([])).toEqual([]);
  });

  test("aggregates total rewards per customer correctly", () => {
    const result = calculateTotalRewards(monthlyData);

    expect(result).toEqual([
      {
        customerId: 1,
        customerName: "John",
        totalRewardPoints: 150,
      },
      {
        customerId: 2,
        customerName: "Alice",
        totalRewardPoints: 200,
      },
    ]);
  });

  test("handles multiple customers correctly", () => {
    const result = calculateTotalRewards(monthlyData);

    expect(result.length).toBe(2);
  });

  test("handles invalid data gracefully", () => {
    const badData = [
      { customerId: 1, customerName: "John" },
      { customerId: 2, rewardPoints: null },
    ];

    const result = calculateTotalRewards(badData);

    expect(Array.isArray(result)).toBe(true);
  });

  test("handles invalid input and logs error", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = calculateTotalRewards(null);

    expect(result).toEqual([]);
    

    spy.mockRestore();
  });
});