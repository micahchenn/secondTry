import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api';
import '../CSS/StockSentimentNews.css';

const StockSentimentNews = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get('/stocks/get-stock-news-and-sentiments');
      console.log(response.data); // Print the JSON data to the console
      if (response.data && Array.isArray(response.data.news)) {
        setData(response.data.news.slice(0, 6)); // Limit to 4 articles
      } else {
        console.error('Unexpected response data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString();
  };

  const handleSymbolClick = (symbol) => {
    navigate(`/stock-watchlist/${symbol}`);
  };

  return (
    <div className="StockSentimentNews">
      <h2>Stock Sentiment News</h2>
      <div className="news-wrapper">
        {data.length > 0 ? (
          data.map((newsItem, index) => (
            <div className="news-item" key={index}>
              <div className="news-content">
                <div className="news-header">
                  <p className="news-site-date">
                    <span className="news-site">{newsItem.site}</span>
                    <span className="news-date"> - {formatDate(newsItem.publishedDate)}</span>
                  </p>
                </div>
                <h3 className="news-title" onClick={() => window.open(newsItem.url, "_blank")}>{newsItem.title}</h3>
                <div className="symbol-sentiment">
                  <p className="news-symbol" onClick={() => handleSymbolClick(newsItem.symbol)}>Symbol: {newsItem.symbol}</p>
                  <p className={`news-sentiment ${newsItem.sentiment.toLowerCase()}`}>
                    Sentiment: {newsItem.sentiment} ({newsItem.sentimentScore})
                  </p>
                </div>
              </div>
              <img src={newsItem.image} alt={newsItem.title} className="news-image" />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StockSentimentNews;
