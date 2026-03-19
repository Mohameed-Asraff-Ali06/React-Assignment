import { useMemo, useState } from "react";
import Table from "../components/Tables/Table";
import { useTransactions } from "../hooks/useTransactions";
import { FiUsers, FiShoppingCart, FiAward, FiStar } from "react-icons/fi";

import {
  aggregateMonthlyRewards,
  calculateRewardPoints,
  calculateTotalRewards,
} from "../utils/rewardUtils";
import {
  MONTHLY_COLUMNS,
  TOTAL_COLUMNS,
  TRANSACTION_COLUMNS,
} from "../components/Tables/tableColumns";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const { transactions, loading, error } = useTransactions();

  // Sort transactions by date
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  }, [transactions]);

  // Add reward points to each transaction
  const transactionsWithPoints = useMemo(() => {
    return sortedTransactions.map((tx) => ({
      ...tx,
      rewardPoints: calculateRewardPoints(tx.price),
    }));
  }, [sortedTransactions]);

  // Aggregate monthly rewards
  const monthly = useMemo(() => {
    return aggregateMonthlyRewards(sortedTransactions);
  }, [sortedTransactions]);

  // Calculate total rewards per customer
  const totalRewardPoints = useMemo(() => {
    return calculateTotalRewards(monthly);
  }, [monthly]);

  // Find top customer
  const topCustomer = useMemo(() => {
    return totalRewardPoints.reduce(
      (max, curr) =>
        curr.totalRewardPoints > (max?.totalRewardPoints || 0) ? curr : max,
      null,
    );
  }, [totalRewardPoints]);


  // Loading + Error
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
return (
  <div className="p-6">

{/* 📊 Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Total Customers */}
  <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-500">Total Customers</p>
      <FiUsers className="text-blue-500" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">
      {totalRewardPoints.length}
    </h2>
  </div>

  {/* Total Transactions */}
  <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-500">Total Transactions</p>
      <FiShoppingCart className="text-yellow-500" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">
      {transactions.length}
    </h2>
  </div>

  {/* Total Rewards */}
  <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-500">Total Rewards</p>
      <FiAward className="text-purple-500" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">
      {totalRewardPoints.reduce(
        (sum, c) => sum + c.totalRewardPoints,
        0
      )}
    </h2>
  </div>
</div>

{/* Top Customer */}
<div className="flex items-center justify-between bg-white border rounded-lg px-4 py-3 shadow-sm mb-6 max-w-md">
  <div className="flex items-center gap-3">
    <div className="bg-green-100 p-2 rounded-full">
      <FiStar className="text-green-600" />
    </div>

    <div>
      <p className="text-sm text-gray-500">Top Customer</p>
      <p className="text-sm font-medium text-gray-800">
        {topCustomer?.customerName || "N/A"}
      </p>
    </div>
  </div>

  <div className="text-right">
    <p className="text-xs text-gray-500">Points</p>
    <p className="text-lg font-bold text-green-600">
      {topCustomer?.totalRewardPoints || 0}
    </p>
  </div>
</div>

    {/*  Tabs */}
    <div className="flex gap-6 border-b mb-3">
      {["transactions", "monthly", "total"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative pb-2 text-sm font-medium capitalize transition ${
            activeTab === tab
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-600"
          }`}
        >
          {tab}

          {/* Active underline */}
          {activeTab === tab && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 rounded"></span>
          )}
        </button>
      ))}
    </div>

    {/* 📋 Table */}
    <div>
      {activeTab === "transactions" && (
        <Table
          columns={TRANSACTION_COLUMNS}
          data={transactionsWithPoints}
        />
      )}

      {activeTab === "monthly" && (
        <Table columns={MONTHLY_COLUMNS} data={monthly} />
      )}

      {activeTab === "total" && (
        <Table columns={TOTAL_COLUMNS} data={totalRewardPoints} />
      )}
    </div>
  </div>
);
};

export default Dashboard;
