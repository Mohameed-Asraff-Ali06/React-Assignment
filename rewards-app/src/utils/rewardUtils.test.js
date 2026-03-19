import {
  calculateRewardPoints,
  aggregateMonthlyRewards,
  calculateTotalRewards,
} from "./rewardUtils";

// tests for rewardUtils.js
describe("calculateRewardPoints", () => {
  test("returns 0 for price <= 50", () => {
    expect(calculateRewardPoints(40)).toBe(0);
  });

  test("returns correct points for price = 100", () => {
    expect(calculateRewardPoints(100)).toBe(50);
  });

  test("returns correct points for price > 100", () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  test("handles decimal values correctly", () => {
    expect(calculateRewardPoints(100.4)).toBe(50);
  });

  test("handles invalid input", () => {
    expect(calculateRewardPoints(null)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
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

  test("groups rewards by customer, month, and year", () => {
    const result = aggregateMonthlyRewards(transactions);

    expect(result.length).toBe(2); // John (Dec), Alice (Jan)
  });

  test("calculates correct reward points per group", () => {
    const result = aggregateMonthlyRewards(transactions);

    const john = result.find((r) => r.customerId === 1);
    expect(john.rewardPoints).toBeGreaterThan(0);
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

  test("aggregates total rewards per customer", () => {
    const result = calculateTotalRewards(monthlyData);

    const john = result.find((r) => r.customerId === 1);
    expect(john.totalRewardPoints).toBe(150);
  });
});