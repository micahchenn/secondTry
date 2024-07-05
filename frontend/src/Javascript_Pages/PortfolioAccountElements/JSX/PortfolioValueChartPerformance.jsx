import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../CSS/PortfolioValueChartPerformance.css';

const PortfolioValueChartPerformance = ({ data }) => {
  // Logging data to ensure it's passed correctly
  console.log('Data received:', data);

  // Check if data is undefined or empty
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.map(entry => entry.value),
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0, 'rgba(75,192,192,0.2)');
          gradient.addColorStop(1, 'rgba(75,192,192,0)');
          return gradient;
        },
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        tension: 0.4,
        pointRadius: 0,  // Remove point circles
        pointHoverRadius: 5,
        pointHitRadius: 10,
        pointHoverBorderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          display: false,  // Hide X axis tick labels
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        ticks: {
          display: false,  // Hide Y axis tick labels
        },
        beginAtZero: false,
        min: Math.min(...data.map(entry => entry.value)) - 10,  // Set a minimum value close to data
        max: Math.max(...data.map(entry => entry.value)) + 10,  // Set a maximum value close to data
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',  // White background for tooltip
        titleColor: 'black',  // Black title color
        bodyColor: 'black',  // Black body color
        callbacks: {
          label: function (context) {
            return `Value: ${context.raw.toFixed(2)}`;  // Show value up to 2 decimal places
          },
        },
      },
      legend: {
        display: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div className="portfolio-value-chart-performance">
      <Line data={chartData} options={options} />
    </div>
  );
};

PortfolioValueChartPerformance.defaultProps = {
  data: [],
};

export default PortfolioValueChartPerformance;
