import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import '../CSS/SectorIndustry.css';

const COLORS = [
  '#ccd5ae', '#dbe1bc', '#e9edc9', '#f4f4d5', '#fefae0', 
  '#fcf4d7', '#faedcd', '#e7c8a0', '#deb68a', '#d4a373'
];

const MIN_PERCENTAGE = 3; // Minimum percentage to not be grouped as "Other"

function SectorIndustry({ sectors, industries }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);

  const sortAndGroupData = (data) => {
    let sortedData = Object.keys(data).map((key) => ({
      name: key,
      value: data[key].percentage,
    })).sort((a, b) => b.value - a.value);

    let otherValue = 0;
    sortedData = sortedData.filter(item => {
      if (item.value < MIN_PERCENTAGE) {
        otherValue += item.value;
        return false;
      }
      return true;
    });

    if (otherValue > 0) {
      sortedData.push({ name: 'Other', value: otherValue });
    }

    return sortedData;
  };

  const sortedSectors = sortAndGroupData(sectors);
  const sortedIndustries = sortAndGroupData(industries);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onPieEnter2 = (_, index) => {
    setActiveIndex2(index);
  };

  const onPieLeave2 = () => {
    setActiveIndex2(null);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip-unique-10">
          <p className="label">{`${payload[0].name}: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="sector-industry-charts-unique-10">
      <div className="sector-chart-container-unique-10">
        <div className="sector-chart-unique-10">
          <h3>Sector Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={sortedSectors}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              stroke="none" // Remove the border
            >
              {sortedSectors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>
        <div className="sector-legend-unique-10">
          <ul>
            {sortedSectors.map((entry, index) => (
              <li key={`item-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
                {entry.name}: {entry.value.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="industry-chart-container-unique-10">
        <div className="industry-chart-unique-10">
          <h3>Industry Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={sortedIndustries}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              onMouseEnter={onPieEnter2}
              onMouseLeave={onPieLeave2}
              activeIndex={activeIndex2}
              activeShape={renderActiveShape}
              stroke="none" // Remove the border
            >
              {sortedIndustries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>
        <div className="industry-legend-unique-10">
          <ul>
            {sortedIndustries.map((entry, index) => (
              <li key={`item-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
                {entry.name}: {entry.value.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SectorIndustry;
