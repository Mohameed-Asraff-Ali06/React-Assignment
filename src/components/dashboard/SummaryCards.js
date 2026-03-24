import React from "react";
import PropTypes from "prop-types";
import { FiUsers, FiShoppingCart, FiAward } from "react-icons/fi";

// Defines card metadata and corresponding icons
const cardData = [
  {
    label: "Total Customers",
    key: "totalCustomers",
    icon: <FiUsers className="text-blue-500" />,
  },
  {
    label: "Total Transactions",
    key: "totalTransactions",
    icon: <FiShoppingCart className="text-yellow-500" />,
  },
  {
    label: "Total Rewards",
    key: "totalCustomerPoints",
    icon: <FiAward className="text-purple-500" />,
  },
];

// Displays summary cards for total customers, transactions, and rewards
const SummaryCards = ({
  totalCustomers,
  totalTransactions,
  totalCustomerPoints,
}) => {
  const values = {
    totalCustomers,
    totalTransactions,
    totalCustomerPoints,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cardData.map((card) => (
        <div
          key={card.key}
          className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{card.label}</p>
            {card.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {values[card.key] || "N/A"}
          </h2>
        </div>
      ))}
    </div>
  );
};

SummaryCards.propTypes = {
  totalCustomers: PropTypes.number.isRequired,
  totalTransactions: PropTypes.number.isRequired,
  totalCustomerPoints: PropTypes.number.isRequired,
};

export default React.memo(SummaryCards);
