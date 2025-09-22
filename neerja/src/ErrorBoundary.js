import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-6">Please refresh or go back to the home page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
