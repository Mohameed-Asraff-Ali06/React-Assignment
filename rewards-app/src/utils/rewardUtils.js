/**
 * Calculate reward points based on price
 * @param {number} price
 * @returns {number}
 */
export const calculateRewardPoints = (price = 0) => {
  if (typeof price !== "number" || price <= 0) return 0;

  const flooredPrice = Math.floor(price); 

  let points = 0;

  // Points above 100
  if (flooredPrice > 100) {
    points += (flooredPrice - 100) * 2;
  }

  // Points between 50 and 100
  if (flooredPrice > 50) {
    points += Math.min(flooredPrice, 100) - 50;
  }

  return points;
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
  const result = transactions.reduce((acc, txn) => {
    const date = new Date(txn.date);

    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const key = `${txn.customerId}-${month}-${year}`;

    const rewardPoints = calculateRewardPoints(txn.price);

    if (!acc[key]) {
      acc[key] = {
        customerId: txn.customerId,
        customerName: txn.customerName,
        month,
        year,
        rewardPoints: 0,
      };
    }

    acc[key].rewardPoints += rewardPoints;

    return acc;
  }, {});

  return Object.values(result); 
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
  const result = monthlyRewards.reduce((acc, item) => {
    const { customerId, customerName, rewardPoints } = item;

    if (!acc[customerId]) {
      acc[customerId] = {
        customerId,
        customerName,
        totalRewardPoints: 0,
      };
    }

    acc[customerId].totalRewardPoints += rewardPoints;

    return acc;
  }, {});

  return Object.values(result);
};