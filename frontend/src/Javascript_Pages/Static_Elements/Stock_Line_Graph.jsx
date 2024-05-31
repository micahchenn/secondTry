import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../api';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import 'chartjs-chart-financial';
import '../../Styling_Pages/Static_Elements/Stock_Line_Graph.css';
ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, zoomPlugin, crosshairPlugin);

const Stock_Line_Graph = ({ symbol, time_period }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [color, setLineColor] = useState('green'); // default color
  const [period, setPeriod] = useState('daily');

  const fetchStockData = async () => {
    try {
      const response = await api.get(`stocks/get-stock-data/${symbol}/${time_period.toLowerCase()}`);
      const data = response.data;
  
      const timeSeriesKey = time_period.toLowerCase() === 'daily' ? 'Time Series (Daily)' : 'Weekly Time Series';
  
      if (data && data[timeSeriesKey]) {
        const dataset = data[timeSeriesKey];
        const labels = Object.keys(dataset);
        const values = Object.values(dataset).map(item => parseFloat(item['4. close']));

        const lastValue = data[timeSeriesKey][Object.keys(data[timeSeriesKey]).slice(-2)[0]]["4. close"];
        const mostRecentData = data[timeSeriesKey][Object.keys(data[timeSeriesKey]).slice(-1)[0]]["4. close"];

        // Determine the color based on the comparison
        setLineColor(mostRecentData > lastValue ? 'green' : 'red');
  
        setChartData({
          labels: labels.reverse(),
          datasets: [{
            label: symbol,
            data: values.reverse(),
            fill: false,
            backgroundColor: color,
            borderColor: color,
          }]
        });
  
        setLoading(false);
      } else {
        console.error(`${timeSeriesKey} not found in data`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol, time_period]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = {
    elements:{
        point:{
            radius: 0 // no points on the line
        }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
                tooltipFormat: 'MM/dd/yyyy',
                max: chartData.labels ? chartData.labels[0] : null,
            },
            grid: {
                display: false,
            },
            ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 5 // Adjust this number to the maximum number of ticks you want to display
            },
        },
        y: {
            type: 'linear',
            beginAtZero: false,
            grid: {
                display: false,
            },
            ticks: {
                callback: function (value) {
                    return value.toFixed(2); // Format the y-axis labels to have two decimal points
                }
            },
        },
    },
    plugins: {
        crosshair: {
            line: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 1
            },
            sync: {
                enabled: false,
            },
            zoom: {
                enabled: false,
            }
        },
        tooltip: {
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // really transparent white
            enabled: true,
            callbacks: {
              label: function(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              },
              title: function(context) {
                return context[0].label;
              }
            }
          
        },
        zoom: {
            limits: {
                x: { min: 'original', max: 'original' },
                y: { min: 'original', max: 'original' },
            },
            pan: {
                enabled: true,
                mode: 'xy',
                overScaleMode: 'none',
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: 'xy',
                overScaleMode: 'none',
            },
        },
    },
    responsive: true,
    maintainAspectRatio: false,
};

return (
    
      <div className="chart-container">
        {loading ? <div>Loading...</div> : <Line data={chartData} options={options} />}
      </div>
      
  );
}

export default Stock_Line_Graph;