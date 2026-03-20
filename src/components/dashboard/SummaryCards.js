import PropTypes from "prop-types";
import { FiUsers, FiShoppingCart, FiAward } from "react-icons/fi";

const SummaryCards = ({ totalCustomers, totalTransactions, totalCustomerPoints }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Total Customers */}
      <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">Total Customers</p>
          <FiUsers className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {totalCustomers}
        </h2>
      </div>

      {/* Total Transactions */}
      <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <FiShoppingCart className="text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {totalTransactions}
        </h2>
      </div>

      {/* Total Rewards */}
      <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">Total Rewards</p>
          <FiAward className="text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {totalCustomerPoints}
        </h2>
      </div>
    </div>
  );
};

SummaryCards.propTypes = {
  totalCustomers: PropTypes.number.isRequired,
  totalTransactions: PropTypes.number.isRequired,
  totalCustomerPoints: PropTypes.number.isRequired,
};

export default SummaryCards;