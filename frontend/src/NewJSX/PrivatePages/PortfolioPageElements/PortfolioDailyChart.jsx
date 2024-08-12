import React, { useEffect, useState, useCallback } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ButtonGroup, Button } from 'react-bootstrap';
import './PortfolioDailyChart.css'; // Ensure you have the corresponding CSS file for styling

const PortfolioDailyChart = ({ selectedAccounts, accountsData }) => {
  const [data, setData] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const [valueChange, setValueChange] = useState(0);
  const [percentageChange, setPercentageChange] = useState('0%');
  const [timeFrame, setTimeFrame] = useState('1Y');
  const [chartTitle, setChartTitle] = useState('Net Worth');

  const generateDateRange = (timeFrame) => {
    const endDate = new Date();
    let startDate;
    switch (timeFrame) {
      case '1W':
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '1M':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case '3M':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case '6M':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case 'YTD':
        startDate = new Date(new Date().getFullYear(), 0, 1);
        break;
      case '1Y':
      default:
        startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }
    let currentDate = startDate;
    const dates = [];
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const processAccountData = useCallback(() => {
    const dateRange = generateDateRange(timeFrame);

    let aggregatedData = dateRange.reduce((acc, date) => {
      acc[date] = 0;
      return acc;
    }, {});

    accountsData.forEach(account => {
      if (selectedAccounts.length === 0 || selectedAccounts.includes(account.account_id)) {
        let lastBalance = 0;
        dateRange.forEach(date => {
          const balance = account.balances.find(b => new Date(b.date).toISOString().split('T')[0] === date);
          if (balance) {
            lastBalance = parseFloat(balance.balance);
          }
          aggregatedData[date] += lastBalance;
        });
      }
    });

    const formattedData = Object.keys(aggregatedData).map(date => ({
      date: date,
      balance: aggregatedData[date]
    }));

    setData(formattedData);

    if (formattedData.length > 0) {
      const nonZeroPoints = formattedData.filter(point => point.balance !== 0);
      const first = nonZeroPoints.length > 0 ? nonZeroPoints[0].balance : 0;
      const last = nonZeroPoints.length > 0 ? nonZeroPoints[nonZeroPoints.length - 1].balance : 0;
      const change = first !== 0 ? ((last - first) / first) * 100 : 0;
      setNetWorth(last);
      setValueChange(last - first);
      setPercentageChange(`${change.toFixed(2)}%`);
    }

    if (selectedAccounts.length === 1) {
      const selectedAccount = accountsData.find(account => account.account_id === selectedAccounts[0]);
      setChartTitle(selectedAccount.account_name);
    } else if (selectedAccounts.length > 1) {
      setChartTitle(`${selectedAccounts.length} Accounts Selected`);
    } else {
      setChartTitle('Net Worth');
    }

  }, [selectedAccounts, accountsData, timeFrame]);

  useEffect(() => {
    processAccountData();
  }, [processAccountData]);

  return (
    <>
      <div className="portfolio-chart-header">
        <h2>{chartTitle}</h2>
        <div className="portfolio-summary">
          <span className="portfolio-chart-value">${Number(netWorth).toLocaleString()}</span>
          <span className="portfolio-chart-change"> ${Number(valueChange).toLocaleString()} ({percentageChange})</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }} // Adjusted left margin
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
          <XAxis dataKey="date" tickFormatter={tick => new Date(tick).toLocaleDateString()} axisLine={{ stroke: '#ccc' }} />
          <YAxis tickFormatter={(value) => value.toLocaleString()} axisLine={{ stroke: '#ccc' }} />
          <Tooltip />
          <Area type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
        </AreaChart>
      </ResponsiveContainer>
      <ButtonGroup aria-label="Time Frame" className="portfolio-timeframe-buttons">
        <Button
          variant={timeFrame === '1W' ? 'primary' : 'outline-secondary'}
          onClick={() => setTimeFrame('1W')}
          className={timeFrame === '1W' ? 'selected' : ''}
        >
          1W
        </Button>
        <Button
          variant={timeFrame === '1M' ? 'primary' : 'outline-secondary'}
          onClick={() => setTimeFrame('1M')}
          className={timeFrame === '1M' ? 'selected' : ''}
        >
          1M
        </Button>
        <Button
          variant={timeFrame === '3M' ? 'primary' : 'outline-secondary'}
          onClick={() => setTimeFrame('3M')}
          className={timeFrame === '3M' ? 'selected' : ''}
        >
          3M
        </Button>
        <Button
          variant={timeFrame === '6M' ? 'primary' : 'outline-secondary'}
          onClick={() => setTimeFrame('6M')}
          className={timeFrame === '6M' ? 'selected' : ''}
        >
          6M
        </Button>
        <Button
          variant={timeFrame === 'YTD' ? 'primary' : 'outline-secondary'}
          onClick={() => setTimeFrame('YTD')}
          className={timeFrame === 'YTD' ? 'selected' : ''}
        >
          YTD
        </Button>
        <Button
          variant={timeFrame === '1Y' ? 'primary' : 'outline-secondary'}
          onClick={() => setTimeFrame('1Y')}
          className={timeFrame === '1Y' ? 'selected' : ''}
        >
          1Y
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PortfolioDailyChart;
