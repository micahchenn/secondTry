import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import '../CSS/MarketCapCountry.css';

const COLORS = [
  '#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#2196f3',
  '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb', '#e3f2fd'
];

const MIN_PERCENTAGE = 4; // Minimum percentage to not be grouped as "Other"

function MarketCapCountry({ marketCaps, countries }) {
  const [activeMarketCapIndex, setActiveMarketCapIndex] = useState(null);
  const [activeCountryIndex, setActiveCountryIndex] = useState(null);

  const sortAndGroupData = (data) => {
    let sortedData = Object.keys(data).map((key) => ({
      name: key,
      value: typeof data[key] === 'number' ? data[key] : data[key].percentage,
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

  const sortedMarketCaps = sortAndGroupData(marketCaps);
  const sortedCountries = sortAndGroupData(countries);

  const onMarketCapPieEnter = (_, index) => {
    setActiveMarketCapIndex(index);
  };

  const onMarketCapPieLeave = () => {
    setActiveMarketCapIndex(null);
  };

  const onCountryPieEnter = (_, index) => {
    setActiveCountryIndex(index);
  };

  const onCountryPieLeave = () => {
    setActiveCountryIndex(null);
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
    <div className="market-cap-country-charts-unique-10">
      <div className="chart-legend-container-unique-10">
        <div className="chart-unique-10">
          <h3>Market Cap Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={sortedMarketCaps}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              onMouseEnter={onMarketCapPieEnter}
              onMouseLeave={onMarketCapPieLeave}
              activeIndex={activeMarketCapIndex}
              activeShape={renderActiveShape}
              stroke="none" // Remove the border
            >
              {sortedMarketCaps.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>
        <div className="legend-unique-10">
          <ul>
            {sortedMarketCaps.map((entry, index) => (
              <li key={`item-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
                {entry.name}: {entry.value.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chart-legend-container-unique-10">
        <div className="chart-unique-10">
          <h3>Country Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={sortedCountries}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              onMouseEnter={onCountryPieEnter}
              onMouseLeave={onCountryPieLeave}
              activeIndex={activeCountryIndex}
              activeShape={renderActiveShape}
              stroke="none" // Remove the border
            >
              {sortedCountries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>
        <div className="legend-unique-10">
          <ul>
            {sortedCountries.map((entry, index) => (
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

export default MarketCapCountry;
