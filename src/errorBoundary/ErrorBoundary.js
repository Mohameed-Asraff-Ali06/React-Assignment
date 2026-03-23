import React from "react";
// ErrorBoundary component to catch and handle errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // Update state when an error is caught
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // Log error details for debugging
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
  // Reload the page when the user clicks the reload button
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
          <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              ⚠️ Oops! Something went wrong
            </h2>

            <p className="text-gray-600 mb-6">
              We're sorry, an unexpected error occurred. Please try refreshing
              the page.
            </p>

            <button
              onClick={this.handleReload}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
