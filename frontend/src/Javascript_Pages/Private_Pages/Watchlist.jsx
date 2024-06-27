import React from 'react';
import { useParams } from 'react-router-dom';
import '../../Styling_Pages/Private_Pages/Watchlist.css';
import StockLineGraph from '../Static_Elements/StockLineGraph';
import StockWidgets from '../Static_Elements/StockWidgets';
import StockPagePortfolioSummary from '../Static_Elements/StockPagePortfolioSummary';
import CompanyProfile from '../Static_Elements/CompanyProfile';
import KeyMetrics from '../Static_Elements/KeyMetrics';
import WatchlistNews from '../Static_Elements/WatchlistNews';

function Watchlist() {
  const { symbol } = useParams();

  return (
    <div className="watchlist-container">
      <div className="content">
        <div className="grid-container">
          <div className="stock-and-widgets">
            <div className="stock-watchlist">
              <StockLineGraph symbol={symbol} time_period='Daily' />
            </div>
            <div className="analytics-widgets">
              <StockWidgets boxTypes={['esgScore', 'esgRiskScore', 'esgRiskScore', 'esgScore']} symbol={symbol} />
            </div>
          </div>
          <div className="my-portfolio">
          <StockPagePortfolioSummary symbol={symbol} time_period='Daily' />
          </div>
          <div className="company-profile">
            <CompanyProfile symbol={symbol}/>
          </div>
          <div className="watchlist-news">
            <WatchlistNews symbol={symbol} />  
          </div>
          <div className="key-metrics">
            <KeyMetrics symbol={symbol} />  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;