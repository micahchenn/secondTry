import React, { useState, useEffect } from 'react';
import 'chartjs-adapter-date-fns';
import api from '../../api';
import '../../Styling_Pages/Private_Pages/Stock_Watchlist.css'; // Import the CSS file
import 'chartjs-chart-financial';
import greenBlur from '../../Styling_Pages/Public_Pictures/Green_Blur.png';
import redBlur from '../../Styling_Pages/Public_Pictures/Red_Blur.png';
import Stock_Line_Graph from '../Static_Elements/Stock_Line_Graph';
import News from '../Static_Elements/News';


function Stock_Watchlist() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [jsonResponse, setJsonResponse] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [newsSentiment, setNewsSentiment] = useState(null); // State for storing the news sentiment




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

    return (
        <div className="stock-watchlist">
            <div className="blur-effect"></div>
            <div className="grid-item">
                <div className="left-aligned-content">
                    {selectedStock && <h2 className="stock-name-header">{selectedStock['2. name']}</h2>}
                    {mostRecentPrice && <p className="price-header">Most recent price: ${mostRecentPrice}</p>}
                    <Stock_Line_Graph data={data} color={color} />
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
            </div>
            <div class="grid-item second-column-first-item">
                <News newsSentiment={newsSentiment} />
            </div>
        </div>
    );
};

export default Stock_Watchlist;