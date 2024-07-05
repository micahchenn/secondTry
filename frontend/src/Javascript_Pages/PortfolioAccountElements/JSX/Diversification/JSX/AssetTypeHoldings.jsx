import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import '../CSS/AssetTypeHoldings.css';

const COLORS = [
  '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7',
  '#89c2d9', '#61a5c2', '#468faf', '#2a6f97', '#013a63'
];

const MIN_PERCENTAGE = 4; // Minimum percentage to not be grouped as "Other"

function AssetTypeHoldings({ assetTypes, stocks }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeStockIndex, setActiveStockIndex] = useState(null);

  const sortAndGroupData = (data) => {
    let sortedData = Object.keys(data).map((key) => ({
      name: key,
      value: data[key],
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

  const sortedAssetTypes = sortAndGroupData(assetTypes);

  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
  const sortedStocks = stocks.map((stock) => ({
    name: stock.ticker,
    value: (stock.value / totalValue) * 100,
  })).sort((a, b) => b.value - a.value);

  let otherStockValue = 0;
  const filteredStocks = sortedStocks.filter(stock => {
    if (stock.value < MIN_PERCENTAGE) {
      otherStockValue += stock.value;
      return false;
    }
    return true;
  });

  if (otherStockValue > 0) {
    filteredStocks.push({ name: 'Other', value: otherStockValue });
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onStockPieEnter = (_, index) => {
    setActiveStockIndex(index);
  };

  const onStockPieLeave = () => {
    setActiveStockIndex(null);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip-unique-9">
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
    <div className="asset-type-holdings-unique-9">
      <div className="chart-legend-wrapper-unique-9">
        <div className="chart-legend-container-unique-9">
          <div className="asset-type-chart-unique-9">
            <h3>Asset Type Distribution</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={sortedAssetTypes}
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
                {sortedAssetTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </div>
          <div className="asset-type-legend-unique-9">
            <ul>
              {sortedAssetTypes.map((entry, index) => (
                <li key={`item-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
                  {entry.name}: {entry.value.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="chart-legend-container-unique-9">
          <div className="stock-holdings-chart-unique-9">
            <h3>Stock Holdings Distribution</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={filteredStocks}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                onMouseEnter={onStockPieEnter}
                onMouseLeave={onStockPieLeave}
                activeIndex={activeStockIndex}
                activeShape={renderActiveShape}
                stroke="none" // Remove the border
              >
                {filteredStocks.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </div>
          <div className="stock-holdings-legend-unique-9">
            <ul>
              {filteredStocks.map((entry, index) => (
                <li key={`item-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
                  {entry.name}: {entry.value.toFixed(2)}% (${(entry.value / 100 * totalValue).toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetTypeHoldings;
