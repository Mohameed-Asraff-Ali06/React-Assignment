import { useMemo, useState } from "react";
import Table from "../components/Tables/Table";
import { useFetch } from "../hooks/useFetch";
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

const TABS = ["transactions", "monthly", "total"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");

  // Stable options object for fetch
  const options = useMemo(() => ({ method: "GET" }), []);

  const { data, loading, error, retry } = useFetch(
    "/TransactionsData.json",
    options,
    "Failed to load transactions",
  );

  // Sorted transactions
  const sortedTransactions = useMemo(() => {
    const transactions = Array.isArray(data) ? data : [];

    return [...transactions].sort(
      (a, b) => new Date(a?.date || 0) - new Date(b?.date || 0),
    );
  }, [data]);

  // Transactions with reward points
  const transactionsWithPoints = useMemo(() => {
    return sortedTransactions.map((tx) => ({
      ...tx,
      rewardPoints: calculateRewardPoints(tx?.price || 0),
    }));
  }, [sortedTransactions]);

  // Monthly aggregation
  const monthly = useMemo(() => {
    return aggregateMonthlyRewards(sortedTransactions) || [];
  }, [sortedTransactions]);

  // Total rewards
  const totalRewardPoints = useMemo(() => {
    return calculateTotalRewards(monthly) || [];
  }, [monthly]);

  // Top customer
  const topCustomer = useMemo(() => {
    return totalRewardPoints.reduce(
      (max, curr) =>
        curr.totalRewardPoints > (max?.totalRewardPoints || 0) ? curr : max,
      null,
    );
  }, [totalRewardPoints]);

  // Total points sum
  const totalCustomerPoints = useMemo(() => {
    return totalRewardPoints.reduce(
      (sum, c) => sum + (c?.totalRewardPoints || 0),
      0,
    );
  }, [totalRewardPoints]);

  // Loading & Error
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <div className="p-6">
      {/* Summary */}
      <SummaryCards
        totalCustomers={totalRewardPoints.length}
        totalTransactions={transactionsWithPoints.length}
        totalCustomerPoints={totalCustomerPoints}
      />

      {/* Top Customer */}
      <TopCustomer customer={topCustomer} />

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-3">
        {TABS.map((tab) => (
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
            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 rounded" />
            )}
          </button>
        ))}
      </div>

      {/* Table */}
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
