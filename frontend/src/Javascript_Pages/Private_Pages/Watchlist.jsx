import React from 'react';
import { useParams } from 'react-router-dom';
import '../../Styling_Pages/Private_Pages/Watchlist.css';
import Stock_Line_Graph from '../Static_Elements/Stock_Line_Graph';
import Stock_Widgets from '../Static_Elements/Stock_Widgets';

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
            {/* Your content here */}
          </div>
          <div className="inner-box2">
            <p>This is inner box 2</p>
          </div>
          <div className="inner-box3">
            <h1>This is inner box 34</h1><h1>This is inner box 34</h1><h1>This is inner box 34</h1><h1>This is inner box 34</h1><h1>This is inner box 34</h1><h1>This is inner box 34</h1>
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;