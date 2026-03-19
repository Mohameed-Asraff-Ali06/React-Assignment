import React from "react";
import { FiAlertCircle } from "react-icons/fi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <div className="p-6 text-center flex flex-col items-center gap-3">
            <div className="bg-red-100 p-3 rounded-full">
              <FiAlertCircle className="text-red-600 text-3xl" />
            </div>

            <h2 className="text-gray-800 font-semibold text-lg">
              Oops! Something went wrong
            </h2>

            <p className="text-gray-500 text-sm">Please try again later.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
