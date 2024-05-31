import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../api';

function Line_Graph({ symbol, time_period }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStockData = async () => {
    try {
      const response = await api.get(`stocks/get-stock-data/${symbol}/${time_period}`);
      const data = response.data;
  
      console.log(data); // Print out the data
  
      // Assuming the data is in the 'Time Series (Daily)' format
      if (data && data['Time Series (Daily)']) {
        const dataset = data['Time Series (Daily)'];
        const labels = Object.keys(dataset);
        const values = Object.values(dataset).map(item => parseFloat(item['4. close']));
  
        setChartData({
          labels: labels.reverse(),
          datasets: [{
            label: symbol,
            data: values.reverse(),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          }]
        });
  
        setLoading(false); // Set loading to false after the data has loaded
      } else {
        console.error('Time Series (Daily) not found in data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol, time_period]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading message while the data is loading
  }

  const options = {
    scales: {
      x: {
        // No need to specify the type, it will default to 'category'
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        type: 'linear', // Or 'logarithmic', 'time', 'timeseries'
        title: {
          display: true,
          text: 'Close Price'
        }
      }
    }
  };

  return (
    <div className="line-graph">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Line_Graph;