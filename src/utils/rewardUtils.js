import { handleError } from "../components/common/errorHandler";

/**
 * Calculate reward points based on price
 * @param {number} price
 * @returns {number}
 */
export const calculateRewardPoints = (price = 0) => {
  try {
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      return 0;
    }
    const flooredPrice = Math.floor(price);
    let points = 0;

    if (flooredPrice > 100) {
      points += (flooredPrice - 100) * 2;
    }
    if (flooredPrice > 50) {
      points += Math.min(flooredPrice, 100) - 50;
    }

    return points;
  } catch (error) {
    handleError("calculateRewardPoints", error);
    return 0;
  }
};

/**
 * Aggregates reward points by customer for each month and year.
 *
 * Groups transactions based on customerId + month + year
 * and calculates total reward points per group.
 *
 * @param {Array<Object>} transactions - List of transaction objects
 * @param {string} transactions[].customerId
 * @param {string} transactions[].customerName
 * @param {string} transactions[].date - Transaction date (ISO format)
 * @param {number} transactions[].price
 *
 * @returns {Array<Object>} Monthly aggregated rewards
 * @returns {string} returns[].customerId
 * @returns {string} returns[].customerName
 * @returns {string} returns[].month
 * @returns {number} returns[].year
 * @returns {number} returns[].rewardPoints
 */
export const aggregateMonthlyRewards = (transactions = []) => {
  try {
    if (!Array.isArray(transactions)) {
      throw new Error("Invalid transactions: expected array");
    }

    const result = transactions.reduce((acc, txn) => {
      if (!txn || typeof txn !== "object") return acc;

      const { customerId, customerName, date, price } = txn;
      if (!customerId || !date) return acc;

      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) return acc;
      const month = parsedDate.toLocaleString("default", { month: "short" });
      const year = parsedDate.getFullYear();

      const key = `${customerId}-${month}-${year}`;
      const rewardPoints = calculateRewardPoints(price);
      if (!acc[key]) {
        acc[key] = {
          customerId,
          customerName: customerName || "Unknown",
          month,
          year,
          rewardPoints: 0,
        };
      }
      acc[key].rewardPoints += rewardPoints;

      return acc;
    }, {});

    return Object.values(result);
  } catch (error) {
    handleError("aggregateMonthlyRewards", error);
    return [];
  }
};

/**
 * Calculates total reward points per customer from monthly rewards.
 *
 * Aggregates reward points across all months for each customer.
 *
 * @param {Array<Object>} monthlyRewards - List of monthly reward objects
 * @param {string} monthlyRewards[].customerId
 * @param {string} monthlyRewards[].customerName
 * @param {number} monthlyRewards[].rewardPoints
 *
 * @returns {Array<Object>} Total reward points per customer
 * @returns {string} returns[].customerId
 * @returns {string} returns[].customerName
 * @returns {number} returns[].totalRewardPoints
 */
export const calculateTotalRewards = (monthlyRewards = []) => {
  try {
    if (!Array.isArray(monthlyRewards)) {
      throw new Error("Invalid monthlyRewards: expected array");
    }

    const result = monthlyRewards.reduce((acc, item) => {
      if (!item || typeof item !== "object") return acc;

      const { customerId, customerName, rewardPoints } = item;
      if (!customerId) return acc;

      if (!acc[customerId]) {
        acc[customerId] = {
          customerId,
          customerName: customerName || "Unknown",
          totalRewardPoints: 0,
        };
      }
      acc[customerId].totalRewardPoints +=
        typeof rewardPoints === "number" ? rewardPoints : 0;

      return acc;
    }, {});

    return Object.values(result);
  } catch (error) {
    handleError("calculateTotalRewards", error);
    return [];
  }
};
