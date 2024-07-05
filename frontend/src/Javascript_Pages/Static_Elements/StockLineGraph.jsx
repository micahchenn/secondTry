/**
 * Stock_Line_Graph.jsx
 * 
 * This component renders a line graph for a given stock symbol using Chart.js.
 * It fetches stock data using the API request and uses various Chart.js plugins for 
 * additional features like zooming and crosshair functionality.
 * 
 * This component can be called from the search bar on the user header or in the stock watchlist dashboard TODO
 * 
 * Props:
 * - symbol: The stock symbol for which the line graph is to be rendered. (Required)
 * 
 * Dependencies:
 * - React, react-chartjs-2: Used to render the line graph.
 * - chart.js, chartjs-adapter-date-fns, chartjs-plugin-zoom, chartjs-plugin-crosshair, chartjs-chart-financial: 
 *   Used for creating the line graph and adding additional features.
 * - api: Used to fetch the stock data.
 * - FontAwesomeIcon: Used for rendering icons.
 * 
 * CSS:
 * - Stock_Line_Graph.css: Contains the styles for this component.
 * 
 * Author: Micah Chen
 * Date: 06/09/2024
 * 
 */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import '../../Styling_Pages/Static_Elements/Stock_Line_Graph.css';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from '../../api';

// Register necessary plugins for this component
ChartJS.register(
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin,
  crosshairPlugin,
  CategoryScale,
  CandlestickController,
  CandlestickElement
);

const StockLineGraph = ({ symbol }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [color, setLineColor] = useState('green'); // default color
  const [range, setRange] = useState('1M');
  const [chartType, setChartType] = useState('line'); // Default to line chart
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [openPrice, setOpenPrice] = useState(0); // To store the open price for 1D
  const chartRef = useRef(null);
  const intervalRef = useRef(null);

  const fetchStockData = useCallback(async () => {
    try {
      setLoading(true); // Show loading spinner while fetching new data
      const response = await api.get(`stocks/get-stock-candles/${symbol}/${range}`);
      const data = response.data;

      if (!data) {
        console.error('Data is undefined or empty');
        setLoading(false);
        return;
      }

      let labels, values;
      if (range === '1D' || range === '1W' || range === '1M') {
        // Handle intraday or short-term data
        if (!Array.isArray(data)) {
          console.error('Data is not in expected intraday format');
          setLoading(false);
          return;
        }

        labels = data.reverse().map(item => new Date(item.date));
        values = data.map(item => ({
          x: new Date(item.date),
          y: item.close,
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close
        }));
      } else {
        // Handle long-term data
        if (!Array.isArray(data.historical)) {
          console.error('Historical data is not in expected format');
          setLoading(false);
          return;
        }

        const reversedData = data.historical.reverse();
        labels = reversedData.map(item => new Date(item.date));
        values = reversedData.map(item => ({
          x: new Date(item.date),
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close
        }));
      }

      if (values.length === 0) {
        console.error('No data available');
        setLoading(false);
        return;
      }

      const firstValue = values[0];
      const lastValue = values[values.length - 1];

      // Determine the color based on the comparison
      const newColor = lastValue.c > firstValue.c ? 'green' : 'red';
      setLineColor(newColor);

      const priceChange = lastValue.c - firstValue.c;
      const percentChange = (priceChange / firstValue.c) * 100;

      // Set these values in your state
      setCurrentPrice(lastValue.c);
      setPriceChange(priceChange);
      setPercentChange(percentChange);
      setOpenPrice(firstValue.o); // Set the open price for 1D

      const newChartData = {
        labels: labels,
        datasets: [{
          barThickness: 2,
          label: symbol,
          data: values.map(value => chartType === 'line' ? value.c : value),
          backgroundColor: newColor,
          borderColor: newColor,
          borderWidth: chartType === 'candlestick' ? 1 : 2
        }]
      };

      setChartData(newChartData);

      if (chartRef.current) {
        chartRef.current.data = newChartData;
        chartRef.current.update();
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); // Hide loading spinner in case of error
    }
  }, [symbol, range, chartType]);

  useEffect(() => {
    fetchStockData();
    if (range === '1D') {
      // Set up the interval to fetch data every 1.1 minutes
      intervalRef.current = setInterval(fetchStockData, 66000);
    } else {
      // Clear the interval if range is not '1D'
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchStockData, range]);

  useEffect(() => {
    return () => {
      // Clean up chart instance on unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    elements: {
      point: {
        radius: 0 // no points on the line
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: range === '1D' ? 'minute' : (['1W', '1M'].includes(range) ? 'hour' : 'day'),
          displayFormats: {
            minute: 'MM/dd/yyyy HH:mm',
            hour: 'MM/dd/yyyy HH:mm',
            day: 'MM/dd/yyyy'
          },
          tooltipFormat: range === '1D' ? 'MM/dd/yyyy HH:mm' : (['1W', '1M'].includes(range) ? 'MM/dd/yyyy HH:mm' : 'MM/dd/yyyy'),
        },
        grid: {
          display: false
        },
        ticks: {
          display: range !== '1D',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: range === '1D' ? 1440 : 5 // 1440 minutes in a day, adjust max ticks for other ranges
        },
        barThickness: chartType === 'candlestick' ? 'flex' : undefined
      },
      y: {
        type: 'linear',
        beginAtZero: false,
        grid: {
          display: false
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(2); // Format the y-axis labels to have two decimal points
          }
        }
      }
    },
    plugins: {
      crosshair: {
        line: {
          color: 'rgba(255, 255, 255, 0.3)',
          width: 1
        },
        sync: {
          enabled: false
        },
        zoom: {
          enabled: false
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // really transparent white
        enabled: true,
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (chartType === 'candlestick') {
              const o = context.raw.o;
              const h = context.raw.h;
              const l = context.raw.l;
              const c = context.raw.c;
              label += `Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`;
            } else {
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
            }
            return label;
          },
          title: function (context) {
            return context[0].label;
          }
        }
      },
      zoom: {
        limits: {
          x: { min: 'original', max: 'original' },
          y: { min: 'original', max: 'original' }
        },
        pan: {
          enabled: true,
          mode: 'xy',
          scaleMode: 'none'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
          scaleMode: 'none'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Turn off animation to prevent lag with updates
    }
  };

  const handleRangeChange = (newRange) => {
    // Clear existing chart data when changing the range
    setChartData({});
    setRange(newRange);
  };

  const handleSettingsClick = () => {
    setChartType(chartType === 'line' ? 'candlestick' : 'line');
  };

  // Add a custom plugin to draw the flashing ball and the dotted line for the open price
  const customPlugin = {
    id: 'customPlugin',
    afterDatasetsDraw: (chart) => {
      if (range === '1D') {
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const point = meta.data[meta.data.length - 1]; // Get the last point

        // Draw a flashing ball at the current price
        ctx.save();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color === 'green' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.restore();

        // Draw the dotted line for the open price
        const openValue = openPrice;
        const yScale = chart.scales.y;
        const xScale = chart.scales.x;

        if (openValue !== undefined) {
          ctx.save();
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(xScale.left, yScale.getPixelForValue(openValue));
          ctx.lineTo(xScale.right, yScale.getPixelForValue(openValue));
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  ChartJS.register(customPlugin);

  return (
    <div className="chart-container">
      <div className="price-info">
        <h1 className="stock-name">{symbol}</h1>
        <span className="current-price">${currentPrice.toFixed(2)}</span>
        <span className={`price-change ${priceChange < 0 ? 'negative' : 'positive'}`}>
          {priceChange < 0 ? '-' : ''}${Math.abs(priceChange).toLocaleString()} 
          &nbsp;({percentChange.toFixed(2)}%)&nbsp;
          <span className="description">{getPeriodLabel(range)}</span>
        </span>
      </div>
      <div className="chart-content">
        <div className="chart-wrapper">
          {loading ? <div>Loading...</div> : chartType === 'line' ? <Line ref={chartRef} data={chartData} options={options} /> : <Line ref={chartRef} type="candlestick" data={chartData} options={{
            ...options,
            scales: {
              x: {
                ...options.scales.x,
                barPercentage: 0.1, // Adjust this value to control the width of the candlesticks
                categoryPercentage: 0.1 // Adjust this value to control the width of the candlesticks
              },
              y: options.scales.y
            }
          }} />}
        </div>
        <div className="button-wrapper">
          {['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y', 'MAX'].map((r) => (
            <span key={r} className={`button ${range === r ? priceChange > 0 ? 'positive' : 'negative' : ''}`} onClick={() => handleRangeChange(r)}>{r}</span>
          ))}
          <span className="button settings-button" onClick={handleSettingsClick}>
            <FontAwesomeIcon icon={faCog} className="settings-icon" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockLineGraph;

const getPeriodLabel = (period) => {
  switch(period) {
    case '1D':
      return 'Today';
    case '1W':
      return 'Past Week';
    case '1M':
      return 'Past Month';
    case '3M':
      return 'Past 3 Months';
    case 'YTD':
      return 'Year to Date';
    case '1Y':
      return 'Past Year';
    case '5Y':
      return 'Past 5 Years';
    case 'MAX':
      return 'Max Time';
    default:
      return '';
  }
};
