'use client';

import './TemperatureControls.css';

// TemperatureControls.js

import React from 'react';

const TemperatureControls = ({
  selectedCity,
  setSelectedCity,
  setLastDays,
  lastDays,
  plotType,
  setPlotType,
  metric,
  setMetric,
  lastData,
}) => {
  return (
    <>
      <div className="controls">
        <label>
          Select City:
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
          >
            <option value="all">All</option>
            {lastData &&
              Object.keys(lastData.data).map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </label>

        <label>
          Last:
          <select value={lastDays} onChange={e => setLastDays(e.target.value)}>
            <option value="7days">7 Days</option>
            <option value="14days">14 Days</option>
            <option value="20days">20 Days</option>
            <option value="30days">30 Days</option>
          </select>
        </label>

        <label>
          Plot Type:
          <select value={plotType} onChange={e => setPlotType(e.target.value)}>
            <option value="line">Line Chart</option>
            <option value="box">Box Plot</option>
            <option value="bar">Bar Graph</option>
          </select>
        </label>

        <label>
          Metric:
          <select
            value={metric}
            onChange={e => setMetric(e.target.value)}
            disabled={plotType === 'box'}
          >
            <option value="min">Min</option>
            <option value="max">Max</option>
            <option value="avg">Avg</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default TemperatureControls;
