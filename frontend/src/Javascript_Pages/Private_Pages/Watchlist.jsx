import React from 'react';
import { useParams } from 'react-router-dom';
import '../../Styling_Pages/Private_Pages/Watchlist.css';
import Stock_Line_Graph from '../Static_Elements/Stock_Line_Graph';
import Stock_Widgets from '../Static_Elements/Stock_Widgets';
import StockPagePortfolioSummary from '../Static_Elements/StockPagePortfolioSummary';
import CompanyProfile from '../Static_Elements/CompanyProfile';
import KeyMetrics from '../Static_Elements/KeyMetrics';


function Watchlist() {
  const { symbol } = useParams();

  return (
    <div className="watchlist-container">
      <div className="content">
        <div className="grid-container">
          <div className="stock-and-widgets">
            <div className="stock-watchlist">
              <Stock_Line_Graph symbol={symbol} time_period='Daily' />
            </div>
            <div className="analytics-widgets">
              <Stock_Widgets boxTypes={['esgScore', 'esgRiskScore', 'esgRiskScore', 'esgScore']} symbol={symbol} />
            </div>
          </div>
          <div className="my-portfolio">
          <StockPagePortfolioSummary symbol={symbol} time_period='Daily' />
          </div>
          <div className="company-profile">
            <CompanyProfile symbol={symbol}/>
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