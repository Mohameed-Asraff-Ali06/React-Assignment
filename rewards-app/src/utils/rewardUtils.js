/**
 * Calculate reward points for a transaction
 *
 * Rules:
 * - No points for price <= 50
 * - 1 point for every dollar between 50 and 100
 * - 2 points for every dollar above 100
 * - Ignore decimals (floor value)
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