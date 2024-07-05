import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api';
import '../CSS/TopMovers.css';

const TopMovers = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('gainers');
  const navigate = useNavigate();

  const fetchData = async (category) => {
    try {
      let endpoint;
      switch (category) {
        case 'losers':
          endpoint = '/stocks/get-stock-market-losers-lite';
          break;
        case 'most-active':
          endpoint = '/stocks/get-stock-market-actives-lite';
          break;
        default:
          endpoint = '/stocks/get-stock-market-gainers-lite';
          break;
      }
      const response = await api.get(endpoint);
      console.log(response.data); // Print the JSON data to the console
      if (response.data && Array.isArray(response.data[category])) {
        setData(response.data[category]);
      } else {
        console.error('Unexpected response data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(category);
  }, [category]);

  const handleItemClick = (symbol) => {
    navigate(`/stock-watchlist/${symbol}`);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="TopMovers">
      <div className="top-movers-header">
        <select value={category} onChange={handleCategoryChange}>
          <option value="gainers">Top Movers (Gainers)</option>
          <option value="losers">Top Losers</option>
          <option value="most-active">Most Active</option>
        </select>
      </div>
      <div className="ticker-wrapper">
        <div className="ticker">
          {data.length > 0 ? (
            [...data, ...data].map((mover, index) => (
              <div 
                className="ticker-item" 
                key={index} 
                onClick={() => handleItemClick(mover.symbol)}
              >
                <strong>{mover.symbol}</strong>
                <div>{mover.name}</div>
                <div className="details">
                  <div>${mover.price}</div>
                  <div className={`percentage ${mover.changesPercentage > 0 ? 'positive' : 'negative'}`}>
                    ({mover.changesPercentage}%)
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
