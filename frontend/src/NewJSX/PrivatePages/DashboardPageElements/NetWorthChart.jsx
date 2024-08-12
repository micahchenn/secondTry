import React, { useEffect, useState, useCallback } from 'react';
import api from '../../../api';  // Adjust the import path as necessary
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ButtonGroup, Button, Alert } from 'react-bootstrap';
import './NetWorthChart.css'; // Ensure you have the corresponding CSS file for styling

const NetWorthChart = ({ timeFrame, setTimeFrame }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [netWorth, setNetWorth] = useState(0);
  const [percentageChange, setPercentageChange] = useState('0%');

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(`/plaid/get-net-worth-by-day/${timeFrame}/`);
      const data = response.data.data;
      setData(data);

      if (data.length > 0) {
        const nonZeroPoints = data.filter(point => point.total_balance !== 0);
        const first = nonZeroPoints[0].total_balance;
        const last = nonZeroPoints[nonZeroPoints.length - 1].total_balance;
        const change = ((last - first) / first) * 100;
        setNetWorth(last);
        setPercentageChange(`${change.toFixed(2)}% (${timeFrame})`);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    }
  }, [timeFrame]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="net-worth-chart-header">
        <h2>Your Net Worth</h2>
        <div className="net-worth-chart-value">${Number(netWorth).toLocaleString()}</div>
        <div className="net-worth-chart-change">{percentageChange}</div>
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
          <XAxis dataKey="date" tick={false} axisLine={{ stroke: '#ccc' }} />
          <YAxis tickFormatter={(value) => value.toLocaleString()} axisLine={{ stroke: '#ccc' }} />
          <Tooltip />
          <Area type="monotone" dataKey="total_balance" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
        </AreaChart>
      </ResponsiveContainer>
      <ButtonGroup aria-label="Time Frame" className="net-worth-timeframe-buttons">
        <Button
          variant={timeFrame === '1W' ? 'primary' : 'secondary'}
          onClick={() => setTimeFrame('1W')}
        >
          1W
        </Button>
        <Button
          variant={timeFrame === '1M' ? 'primary' : 'secondary'}
          onClick={() => setTimeFrame('1M')}
        >
          1M
        </Button>
        <Button
          variant={timeFrame === '3M' ? 'primary' : 'secondary'}
          onClick={() => setTimeFrame('3M')}
        >
          3M
        </Button>
        <Button
          variant={timeFrame === '6M' ? 'primary' : 'secondary'}
          onClick={() => setTimeFrame('6M')}
        >
          6M
        </Button>
        <Button
          variant={timeFrame === 'YTD' ? 'primary' : 'secondary'}
          onClick={() => setTimeFrame('YTD')}
        >
          YTD
        </Button>
        <Button
          variant={timeFrame === '1Y' ? 'primary' : 'secondary'}
          onClick={() => setTimeFrame('1Y')}
        >
          1Y
        </Button>
      </ButtonGroup>
    </>
  );
};

export default NetWorthChart;
