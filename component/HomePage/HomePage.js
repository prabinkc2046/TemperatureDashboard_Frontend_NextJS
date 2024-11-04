import Plot from '../PlotlyWrapper/PlotlyWrapper';

export default function HomePage() {
  // Sample data for the chart
  const data = [
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      y: [20, 14, 23, 25, 22],
      type: 'bar',
      marker: { color: 'blue' },
    },
  ];

  const layout = {
    title: 'Monthly Sales',
    xaxis: { title: 'Month' },
    yaxis: { title: 'Sales' },
  };

  const config = { responsive: true };

  return (
    <div>
      <h1>My Plotly Chart in Next.js</h1>
      <Plot data={data} layout={layout} config={config} />
    </div>
  );
}
