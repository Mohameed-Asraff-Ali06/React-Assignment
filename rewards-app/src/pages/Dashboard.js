import { useMemo, useState } from "react";
import Table from "../components/Tables/Table";
import { useTransactions } from "../hooks/useTransactions";

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
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SummaryCards from "../components/dashboard/SummaryCards";
import TopCustomer from "../components/dashboard/TopCustomer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const { transactions, loading, error, retry } = useTransactions();

  // Sort transactions by date
  const sortedTransactions = useMemo(() => {
    return [...(transactions || [])].sort(
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

  //total reward points  for all customers
  const totalCustomerPoints = useMemo(() => {
    return totalRewardPoints.reduce((sum, c) => sum + c.totalRewardPoints, 0);
  }, [totalRewardPoints]);

  // Loading + Error
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  return (
    <div className="p-6">
      {/* Summary Cards */}
      <SummaryCards
        totalCustomers={totalRewardPoints.length}
        totalTransactions={transactions.length}
        totalCustomerPoints={totalCustomerPoints}
      />

      {/* Top Customer */}
      <TopCustomer customer={topCustomer} />

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
          <Table columns={TRANSACTION_COLUMNS} data={transactionsWithPoints} />
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
