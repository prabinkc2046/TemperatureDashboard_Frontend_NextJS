'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Plot from '../PlotlyWrapper/PlotlyWrapper';
import TemperatureControls from '../TemperatureControls/TemperatureControls';
import TemperatureDashboardSkeleton from '../TemperatureDashboardSkeleton/TemperatureDashboardSkeleton';
import './TemperatureDashboard.css';

const fetchLastTemperatureData = async (lastDays, location) => {
  const url = location
    ? `https://temperaturedashboard-backend-nodejs.onrender.com/api/temperature/last?last=${lastDays}&location=${location}`
    : `https://temperaturedashboard-backend-nodejs.onrender.com/api/temperature/last?last=${lastDays}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = error => {
  if (error.response) {
    throw new Error(
      `Server Error: ${error.response.status} - ${error.response.data}`
    );
  } else if (error.request) {
    throw new Error('Network Error: No response received');
  } else {
    throw new Error(`Error: ${error.message}`);
  }
};

const TemperatureDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [plotType, setPlotType] = useState('line');
  const [metric, setMetric] = useState('avg');
  const [location, setLocation] = useState('');
  const [lastDays, setLastDays] = useState('7days');

  // Fetch temperature data using React Query
  const {
    data: lastData,
    isError: isLastError,
    isLoading: isLastLoading,
    error: lastError,
  } = useQuery({
    queryKey: ['lastTemperatureData', lastDays, location],
    queryFn: () => fetchLastTemperatureData(lastDays, location),
    enabled: !!lastDays,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  // Memoized chart data transformation for performance
  const renderChartData = useMemo(() => {
    if (!lastData?.data) return [];

    const data = lastData.data;
    const citiesToPlot =
      selectedCity === 'all' ? Object.keys(data) : [selectedCity];
    const dates = data[Object.keys(data)[0]].dates;

    return plotType === 'box'
      ? dates
          .map((date, index) =>
            citiesToPlot.map(city => ({
              type: 'box',
              y: [
                data[city].min[index],
                data[city].avg[index],
                data[city].max[index],
              ],
              name: `${date}`,
            }))
          )
          .flat()
      : citiesToPlot.map(city => ({
          x: dates,
          y: data[city][metric],
          name: `${city} - ${metric.toUpperCase()}`,
          type: plotType === 'line' ? 'scatter' : plotType,
          mode: plotType === 'line' ? 'lines' : undefined,
        }));
  }, [lastData, selectedCity, plotType, metric]);

  return (
    <div className="temperature-dashboard">
      <h2>Temperature Dashboard</h2>

      <TemperatureControls
        selectedCity={selectedCity}
        setLastDays={setLastDays}
        lastDays={lastDays}
        setPlotType={setPlotType}
        setSelectedCity={setSelectedCity}
        setMetric={setMetric}
        lastData={lastData}
        metric={metric}
        plotType={plotType}
      />
      {/* <h2>Temperature Dashboard</h2>

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
      </div> */}

      <div className="plot-container">
        <Plot
          data={renderChartData}
          layout={{
            title: `${
              selectedCity === 'all' ? 'All Cities' : selectedCity
            } Temperature`,
            xaxis: { title: 'Date', tickformat: '%Y-%m-%d' },
            yaxis: { title: 'Temperature (°C)' },
            showlegend: true,
          }}
          config={{ displayModeBar: false }}
          isError={isLastError}
          isLoading={isLastLoading}
          errorMessage={lastError?.message}
        />
      </div>
    </div>
  );
};

export default TemperatureDashboard;
