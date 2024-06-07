import React from 'react';
import ESGRiskScore from '../../Widgets/JSX/ESG_Risk_Score';
import ESG_Score from '../../Widgets/JSX/ESG_Score';
import '../../Styling_Pages/Static_Elements/Stock_Widgets.css';

// Define your box types as components
const ESGScore = () => <div className="box">ESG Score</div>;

// Create a mapping of box types to components
const BOX_TYPES = {
  'esgScore': ESG_Score,
  'esgRiskScore': ESGRiskScore,
};

const Stock_Widgets = ({ boxTypes = [], symbol }) => {
  return (
    <div className="widget">
      {boxTypes.map((type, index) => {
        const BoxComponent = BOX_TYPES[type];
        return BoxComponent ? <BoxComponent key={index} symbol={symbol} /> : null;
      })}
    </div>
  );
}

export default Stock_Widgets;