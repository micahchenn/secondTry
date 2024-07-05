import React, { useState, useEffect, useRef } from 'react';
import '../../Styling_Pages/Private_Pages/MainStockPage.css';
import HeaderSearchBar from '../Static_Elements/HeaderSearchBar'; // Import the HeaderSearchBar component
import TopMovers from '../Static_Elements/StockDashboard/JSX/TopMovers';
import StockSentimentNews from '../Static_Elements/StockDashboard/JSX/StockSentimentNews';
import TopIndexPerformance from '../Static_Elements/StockDashboard/JSX/TopIndexPerformance';

function MainStockPage() {
  const [indexHeight, setIndexHeight] = useState(0);
  const indexRef = useRef(null);

  useEffect(() => {
    if (indexRef.current) {
      setIndexHeight(indexRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="stock-watchlist-dashboard-container-unique-7">
      <div className="stock-watchlist-dashboard-title-and-search-unique-7">
        <div className="stock-watchlist-dashboard-title-unique-7">Stocks Dashboard Overview</div>
        <div className="stock-watchlist-dashboard-search-unique-7">
          <HeaderSearchBar /> {/* Include the HeaderSearchBar component */}
        </div>
      </div>
      <div className="stock-watchlist-dashboard-top-movers-unique-7">
        <TopMovers /> {/* Include the TopMovers component */}
      </div>
      <div className="stock-watchlist-dashboard-news-and-index-unique-7">
        <div className="stock-watchlist-dashboard-news-unique-7" style={{ height: indexHeight }}>
          <StockSentimentNews /> {/* Include the StockSentimentNews component */}
        </div>
        <div className="stock-watchlist-dashboard-index-unique-7" ref={indexRef}>
          <TopIndexPerformance /> {/* Include the TopIndexPerformance component */}
        </div>
      </div>
    </div>
  );
}

export default MainStockPage;
