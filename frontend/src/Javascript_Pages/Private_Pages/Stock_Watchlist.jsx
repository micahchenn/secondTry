import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import api from '../../api';
import '../../Styling_Pages/Private_Pages/Stock_Watchlist.css'; // Import the CSS file
import 'chartjs-chart-financial';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import greenBlur from '../../Styling_Pages/Public_Pictures/Green_Blur.png';
import redBlur from '../../Styling_Pages/Public_Pictures/Red_Blur.png';

ChartJS.register(TimeScale, LinearScale, LineElement, PointElement, Tooltip, Legend, zoomPlugin, crosshairPlugin);

function Stock_Watchlist() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [jsonResponse, setJsonResponse] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [newsSentiment, setNewsSentiment] = useState(null); // State for storing the news sentiment



// rest of your functions






    let mostRecentPrice;
    if (data) {
        const mostRecentDate = Object.keys(data).sort().reverse()[0];
        mostRecentPrice = data[mostRecentDate]['4. close'];
    }

    const fetchSearchResults = async () => {
        try {
            const response = await api.get(`/stocks/search-keyword/${searchTerm}`);
            if (Array.isArray(response.data.bestMatches)) {
                setSearchResults(response.data.bestMatches);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error(error);
            setSearchResults([]);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchTerm) {
            const timeoutId = setTimeout(() => {
                fetchSearchResults();
            }, 500); // delay of 500ms

            setSearchTimeout(timeoutId);
        }
    }, [searchTerm]);

    const isStockPositive = () => {
        if (data) {
            const prices = Object.values(data).map(item => item['4. close']);
            return prices[prices.length - 1] > prices[0];
        }
        return false;
    };

    const color = isStockPositive() ? '#51C51D' : '#ED5525'; // Green for positive, red for negative
    const blurImage = isStockPositive() ? greenBlur : redBlur; // Green blur for positive, red blur for negative

    const fetchData = async (symbol) => {
        try {
            const response = await api.get(`/stocks/watchlist/${symbol}`);
            setData(response.data);
            const selected = searchResults.find(stock => stock['1. symbol'] === symbol);
            setSelectedStock(selected);
            setJsonResponse(JSON.stringify(response.data, null, 2));
            setError(null);
            const newsSentimentResponse = await api.get(`/stocks/news-sentiment?tickers=${symbol}`);
            setNewsSentiment(newsSentimentResponse.data);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    };

    const chartData = {
        labels: data ? Object.keys(data).reverse() : [],
        datasets: [
            {
                label: 'Stock Price',
                data: data ? Object.values(data).map(item => item['4. close']).reverse() : [],
                fill: true, // Fill the area under the line
                backgroundColor: color + '66', // Lighter color for the fill
                borderColor: color,
                pointRadius: 0,
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
                    max: data ? Object.keys(data)[0] : null,
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
                    color: color,
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
                enabled: true,
                mode: 'index',
                intersect: false,
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
        <div className="stock-watchlist">
            <div 
                className="blur-effect" 
                /*style={{ backgroundImage: `url(${blurImage})` }} */// Set the background image here 
            ></div> {/* This will be the blurred background */}
            <div className="left-aligned-content">
                {selectedStock && <h2 className="stock-name-header">{selectedStock['2. name']}</h2>}
                {mostRecentPrice && <p className="price-header">Most recent price: ${mostRecentPrice}</p>}
                <div className="chart-container">
                    {data && <Line data={chartData} options={options} />}
                </div>
                <div className="search-container">
                    <form onSubmit={(e) => { e.preventDefault(); fetchData(searchTerm); }}>
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={handleSearchChange} 
                            placeholder="Search for a stock..." 
                        />
                        <button type="submit">Submit</button>
                    </form>
                    {searchResults.length > 0 && (
                        <select onChange={(e) => fetchData(e.target.value)} className="dropdown-menu">
                            <option>Select a stock...</option>
                            {searchResults.map(result => (
                                <option key={result['1. symbol']} value={result['1. symbol']}>
                                    {result['1. symbol']} - {result['2. name']}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                {error && <p>Error: {error}</p>}
                <pre>{jsonResponse}</pre>
            </div>
            <div className="news-sentiment-column">
    <h2>News Sentiment</h2>
    <div style={{overflowY: 'auto', maxHeight: '500px'}}>
        {newsSentiment && newsSentiment.feed.length > 0 ? (
            newsSentiment.feed.map((item, index) => (
                <a href={`${item.url}`} target="_blank" rel="noopener noreferrer" key={index} style={{textDecoration: 'none', color: 'inherit'}}>
                    <div>
                        <h3>{item.title}</h3>
                        <img src={item.banner_image} alt={item.title} style={{width: "100px"}} />
                        <p>Overall Sentiment Score: {item.overall_sentiment_score}</p>
                        <p>Overall Sentiment Label: {item.overall_sentiment_label}</p>
                        {/* Add more properties here as needed */}
                    </div>
                </a>
            ))
        ) : (
            <p>No relevant news</p>
        )}
    </div>
</div>
        </div>
    );
}

export default Stock_Watchlist;
