import PropTypes from "prop-types";
import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  const safeMessage =
    message || "Something went wrong. Please try again.";
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-red-50 rounded-lg">
      <p className="text-red-600 font-medium mb-2">
        ⚠️ {safeMessage}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default React.memo(ErrorMessage);