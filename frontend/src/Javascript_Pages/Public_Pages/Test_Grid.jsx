import React from 'react';
import '../../Styling_Pages/Public_Pages/Test_Grid.css';

const TestGrid = () => {
  return (
    <div className="grid-wrapper">
      <div className="grid">
        <div className="large-box"></div>
        {Array.from({ length: 575 }).map((_, idx) => (
          <div key={idx} className="grid-item"></div>
        ))}
      </div>
    </div>
  );
};

export default TestGrid;