import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import moment from 'moment';

const NewUserMetrics = ({newUsers}) => {


  // Group user data by week using create_at field
  const groupedData = newUsers.reduce((result, user) => {
    const weekStart = moment(user.create_at).startOf('isoWeek');
    const weekLabel = weekStart.format('MMM DD, YY');
  
    if (!result[weekLabel]) {
      result[weekLabel] = {
        week: weekLabel,
        count: 0,
      };
    }
  
    result[weekLabel].count++;
    return result;
  }, {})

  // Sort the grouped data by week
  const sortedData = Object.values(groupedData).sort(
    (a, b) => new Date(a.week) - new Date(b.week)
  );

  // Calculate total registered users
  const totalUsers = sortedData.reduce((sum, data) => sum + data.count, 0);

  return (
    <div className="transactionLg">
      <p className="chartTitle">Users Metrics</p>
      <div style={{ height: '420px' }}>
        <ResponsiveContainer>
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="week" angle={-45} textAnchor="end" interval={0} height={60} /> {/* Add angle and textAnchor props */}
            <YAxis dataKey="count" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="User Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="chartTitle">Total Registered Users: {totalUsers}</p>
    </div>
  );
};

export default NewUserMetrics;
