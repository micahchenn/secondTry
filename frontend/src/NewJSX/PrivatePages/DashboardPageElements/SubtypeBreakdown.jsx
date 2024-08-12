import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';
import './SubtypeBreakdown.css';

const SubtypeBreakdown = ({ accounts }) => {
  const subtypes = accounts.reduce((acc, account) => {
    acc[account.subtype] = (acc[account.subtype] || 0) + parseFloat(account.current_balance);
    return acc;
  }, {});

  const data = Object.keys(subtypes).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: subtypes[key],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'];

  return (
    <Card className="subtype-breakdown-card glass-effect">
      <Card.Body>
        <h3>Subtype Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default SubtypeBreakdown;
