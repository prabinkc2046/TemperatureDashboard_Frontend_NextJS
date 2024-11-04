// components/PlotlyWrapper/PlotlyWrapper.js
'use client';
import './PlotlyWrapper.css';
import React from 'react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PlotSkeleton from '../PlotSkeleton/PlotSkeleton';

// Define the lazy-loaded Plot component with a loading skeleton
const LazyPlot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <PlotSkeleton />,
});

// Error boundary component to handle loading errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error or send it to an error reporting service
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <p>
            Error loading the plot. Please check your internet connection or try
            again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Plot component
const Plot = ({ data, layout, config, isLoading, isError, errorMessage }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // If data is loading, show the skeleton
  if (isLoading) {
    return <PlotSkeleton />;
  }

  // If there's an error, show the error message
  if (isError) {
    return (
      <div className="error-message">
        <p>Error loading data: {errorMessage}</p>
      </div>
    );
  }

  // Wrap the LazyPlot in an ErrorBoundary to catch loading errors
  return (
    <ErrorBoundary>
      <LazyPlot data={data} layout={layout} config={config} />
    </ErrorBoundary>
  );
};

export default Plot;
