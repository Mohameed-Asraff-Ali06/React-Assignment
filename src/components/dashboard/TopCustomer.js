import React from "react";
import PropTypes from "prop-types";
import { FiStar } from "react-icons/fi";

const TopCustomer = ({ customer }) => {
  const name = customer?.customerName || "N/A";
  const points = customer?.totalRewardPoints ?? 0;

  return (
    <div className="flex items-center justify-between bg-white border rounded-lg px-4 py-3 shadow-sm mb-6 max-w-md">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <FiStar className="text-green-600" />
        </div>

        <div>
          <p className="text-sm text-gray-500">Top Customer</p>
          <p className="text-sm font-medium text-gray-800">{name}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-500">Points</p>
        <p className="text-lg font-bold text-green-600">{points}</p>
      </div>
    </div>
  );
};

TopCustomer.propTypes = {
  customer: PropTypes.object,
};

export default React.memo(TopCustomer);