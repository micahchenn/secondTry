import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import api from '../../api';
import '../../Styling_Pages/Private_Pages/Stock_Watchlist.css'; // Import the CSS file

// Register Chart.js components and plugins
ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, zoomPlugin);

function Stock_Watchlist() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await api.get(`/stocks/watchlist/${searchTerm}`); // Include the search term in the request
      setData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setData(null); // Clear data on error
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const chartData = {
    labels: data && data['Time Series (Daily)'] ? Object.keys(data['Time Series (Daily)']).reverse() : [],
    datasets: [
      {
        label: 'Stock Price',
        data: data && data['Time Series (Daily)'] ? Object.values(data['Time Series (Daily)']).map(item => item['4. close']).reverse() : [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        point: {
          radius: 3, // Set the radius of the data points
        },
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MM/dd/yyyy',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: false,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="stock-watchlist">
      <h1>Stock Watchlist</h1>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search for a stock..." 
      />
      <button onClick={fetchData}>Fetch Data</button>
      {/* Display the chart or error message */}
      {data && <div className="chart-container"><Line data={chartData} options={options} /></div>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Stock_Watchlist;
