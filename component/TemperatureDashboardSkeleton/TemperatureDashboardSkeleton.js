import React from 'react';
import './TemperatureDashboardSkeleton.css';

const TemperatureDashboardSkeleton = () => {
  return (
    <div className="temperature-dashboard skeleton">
      <h2 className="skeleton-title"></h2>

      <div className="controls skeleton-controls">
        <label className="skeleton-label">
          <div className="skeleton-input skeleton-text"></div>
        </label>
        <label className="skeleton-label">
          <div className="skeleton-input skeleton-text"></div>
        </label>
        <label className="skeleton-label">
          <div className="skeleton-input skeleton-text"></div>
        </label>
        <label className="skeleton-label">
          <div className="skeleton-input skeleton-text"></div>
        </label>
      </div>

      <div className="plot-container skeleton-plot">
        {/* Optional: Add more detailed skeleton elements if needed */}
      </div>
    </div>
  );
};

export default TemperatureDashboardSkeleton;
