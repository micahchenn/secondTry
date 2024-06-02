import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../api';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import 'chartjs-chart-financial';
import '../../Styling_Pages/Static_Elements/Stock_Line_Graph.css';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, zoomPlugin, crosshairPlugin);

const Stock_Line_Graph = ({ symbol }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [color, setLineColor] = useState('green'); // default color
  const [period, setPeriod] = useState('daily');
  const [interval, setTimeInterval] = useState('5min');
  const [timeRange, setTimeRange] = useState(null);
  const [priceTrend, setPriceTrend] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  const fetchStockData = useCallback(async () => {
    try {
      setLoading(true); // Show loading spinner while fetching new data
      const response = await api.get(`stocks/get-stock-data/${symbol}/${period.toUpperCase()}/${interval}/${timeRange}`);
      const data = response.data;
      console.log(data);
  
      const timeSeriesKeyMapping = {
        'intraday:1min': 'Time Series (1min)',
        'intraday:60min': 'Time Series (60min)',
        'daily:1M': 'Time Series (Daily)',
        'daily:3M': 'Time Series (Daily)',
        'daily:YTD': 'Time Series (Daily)',
        'daily:1Y': 'Time Series (Daily)',
        'weekly:5Y': 'Weekly Adjusted Time Series',
        'monthly:MAX': 'Monthly Adjusted Time Series'
      };
  
      const timeSeriesKey = timeSeriesKeyMapping[`${period}:${interval}`];
  
      if (data && data[timeSeriesKey]) {
        const dataset = data[timeSeriesKey];
        const labels = Object.keys(dataset).reverse(); // Ensure labels are sorted chronologically
        const values = [];
        let cumulativeSplitCoefficient = 1;
  
        labels.forEach(label => {
          const item = dataset[label];
          const splitCoefficient = parseFloat(item['8. split coefficient']) || 1;
          if (period !== 'intraday') {
            cumulativeSplitCoefficient *= splitCoefficient;
          }
  
          const adjustedClose = period === 'intraday'
            ? parseFloat(item['4. close'])
            : parseFloat(item['5. adjusted close']) / cumulativeSplitCoefficient;
          values.push(adjustedClose);
        });
  
        const firstValue = values[0];
        const lastValue = values[values.length - 1];
  
        // Determine the color based on the comparison
        const newColor = lastValue > firstValue ? 'green' : 'red';
        setLineColor(newColor);
  
        setPriceTrend(lastValue > firstValue ? 'positive' : 'negative');
  
        const priceChange = lastValue - firstValue;
        const percentChange = (priceChange / firstValue) * 100;
  
        // Set these values in your state
        setCurrentPrice(lastValue);
        setPriceChange(priceChange);
        setPercentChange(percentChange);
  
        setChartData({
          labels: labels,
          datasets: [{
            label: symbol,
            data: values,
            fill: false,
            backgroundColor: newColor,
            borderColor: newColor
          }]
        });
  
        setLoading(false);
      } else {
        console.error(`${timeSeriesKey} not found in data`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Hide loading spinner in case of error
    }
  }, [symbol, period, interval, timeRange]);
  
  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

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
          unit: 'day',
          displayFormats: {
            day: 'MM/dd/yyyy'
          },
          tooltipFormat: period === 'intraday' ? 'MM/dd/yyyy HH:mm' : 'MM/dd/yyyy',
          max: chartData.labels ? chartData.labels[0] : null
        },
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5 // Adjust this number to the maximum number of ticks you want to display
        }
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
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
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
          scaleMode: 'none' // Use `scaleMode` instead of `overScaleMode`
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
          scaleMode: 'none' // Use `scaleMode` instead of `overScaleMode`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  

  const handlePeriodChange = (newPeriod, newInterval, newTimeRange, button) => {
    setPeriod(newPeriod);
    setTimeInterval(newInterval);
    setTimeRange(newTimeRange);
    setSelectedButton(button);
  };

  return (
    <div className="chart-container">
      <div className="price-info">
        <h1 className="stock-name">{symbol}</h1>
        <a className="current-price">${currentPrice.toFixed(2)}</a>
        <a className="price-change">{priceChange < 0 ? '-' : ''}${Math.abs(priceChange).toFixed(2)} ({percentChange.toFixed(2)}%) Year to date</a>
      </div>
      <div className="chart-content">
        <div className="chart-wrapper">
          {loading ? <div>Loading...</div> : <Line data={chartData} options={options} />}
        </div>
        <div className="button-wrapper">
  <span className={`button ${selectedButton === '1D' ? priceTrend : ''}`} onClick={() => handlePeriodChange('intraday', '1min', null, '1D')}>1D</span>
  <span className={`button ${selectedButton === '1W' ? priceTrend : ''}`} onClick={() => handlePeriodChange('intraday', '60min', '1W', '1W')}>1W</span>
  <span className={`button ${selectedButton === '1M' ? priceTrend : ''}`} onClick={() => handlePeriodChange('daily', '1M', '1M', '1M')}>1M</span>
  <span className={`button ${selectedButton === '3M' ? priceTrend : ''}`} onClick={() => handlePeriodChange('daily', '3M', '3M', '3M')}>3M</span>
  <span className={`button ${selectedButton === 'YTD' ? priceTrend : ''}`} onClick={() => handlePeriodChange('daily', 'YTD', 'YTD', 'YTD')}>YTD</span>
  <span className={`button ${selectedButton === '1Y' ? priceTrend : ''}`} onClick={() => handlePeriodChange('daily', '1Y', '1Y', '1Y')}>1Y</span>
  <span className={`button ${selectedButton === '5Y' ? priceTrend : ''}`} onClick={() => handlePeriodChange('weekly', '5Y', '5Y', '5Y')}>5Y</span>
  <span className={`button ${selectedButton === 'MAX' ? priceTrend : ''}`} onClick={() => handlePeriodChange('monthly', 'MAX', 'MAX', 'MAX')}>MAX</span>
  <span className={`button settings-button ${selectedButton === 'Settings' ? priceTrend : ''}`} onClick={() => console.log('Settings clicked')}><FontAwesomeIcon icon={faCog} className="settings-icon" /></span>
</div>
      </div>
    </div>
  );
}

export default Stock_Line_Graph;
