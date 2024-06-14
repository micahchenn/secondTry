import React, { useState, useEffect } from 'react';
import api from '../../api';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import '../../Styling_Pages/Static_Elements/WatchlistNews.css';

function WatchlistNews({ symbol }) {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get(`stocks/get-individual-stock-news/${symbol}`);
        console.log('Response data:', response.data);
        setNews(response.data.news);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [symbol]);

  const formatDate = (publishedDate) => {
    const date = parseISO(publishedDate);
    const now = new Date();

    if (format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM dd');
    }
  };

  return (
    <div className="news-container">
      <h2 className="news-header">News</h2>
      <hr className="news-divider" />
      {Array.isArray(news) ? (
        news.map((article, index) => (
          <div key={index} className="news-article">
            <div className="news-content">
              <p className="news-site">{article.site} - {formatDate(article.publishedDate)}</p>
              <h3 className="news-title">{article.title}</h3>
              <p className="news-text">{article.text}</p>
              <a href={article.url} className="news-link" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
            <img src={article.image} alt={article.title} className="news-image" />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WatchlistNews;
