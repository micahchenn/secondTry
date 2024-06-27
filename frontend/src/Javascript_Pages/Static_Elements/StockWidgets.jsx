/**
 * Stock_Widgets.jsx
 * 
 * This component just renders the outline of the four boxes that will contain the widgets.
 * 
 * Props:
 * - symbol: The stock symbol for which the widgets are to be rendered.
 * - selectedOption: The currently selected option in the parent component, passed down to each widget.
 * 
 * Dependencies:
 * - React: Used for defining the component and managing state.
 * - Box1, Box2, Box3, Box4: The individual widget components.
 * 
 * CSS:
 * - Stock_Widgets.css: Contains the styles for this component.
 * 
 * Author: Micah Chen
 * Date: 06/09/2024
 */


// Stock_Widgets.jsx
import React from 'react';
import Box1 from './Widgets/Boxes/Box1';
import Box2 from './Widgets/Boxes/Box2';
import Box3 from './Widgets/Boxes/Box3';
import Box4 from './Widgets/Boxes/Box4';

import '../../Styling_Pages/Static_Elements/Stock_Widgets.css';

// Create an array of box components
const BOXES = [Box1, Box2, Box3, Box4];

const Stock_Widgets = ({ symbol}) => {
  return (
    <div className="widget">
      {BOXES.map((Box, index) => (
        <Box key={index} symbol={symbol}  name={`Box ${index + 1}`} />
      ))}
    </div>
  );
}

export default Stock_Widgets;