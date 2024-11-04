// components/PlotSkeleton/PlotSkeleton.js
import './PlotSkeleton.css';

const PlotSkeleton = () => {
  return (
    <div className="skeleton-plot-container">
      <div className="skeleton-bar" />
      <div className="skeleton-bar" />
      <div className="skeleton-bar" />
      <div className="skeleton-bar" />
      <div className="skeleton-bar" />
    </div>
  );
};

export default PlotSkeleton;
