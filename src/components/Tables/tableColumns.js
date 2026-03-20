export const TRANSACTION_COLUMNS = [
  { label: "Transaction ID", accessor: "transactionId", sortable: true },
  { label: "Customer Name", accessor: "customerName", sortable: true },
  { label: "Purchase Date", accessor: "date", sortable: true },
  { label: "Product", accessor: "product", sortable: true },
  { label: "Price", accessor: "price", sortable: true },
  { label: "Reward Points", accessor: "rewardPoints", sortable: true },
];

export const MONTHLY_COLUMNS = [
  { label: "Customer ID", accessor: "customerId", sortable: true },
  { label: "Name", accessor: "customerName", sortable: true },
  { label: "Month", accessor: "month", sortable: true },
  { label: "Year", accessor: "year", sortable: true },
  { label: "Reward Points", accessor: "rewardPoints", sortable: true },
];

export const TOTAL_COLUMNS = [
  { label: "Name", accessor: "customerName", sortable: true },
  {
    label: "Total Reward Points",
    accessor: "totalRewardPoints",
    sortable: true,
  },
];
