// import React from "react";
// import { 
//   LineChart, 
//   Line, 
//   XAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer, 
// } from "recharts"; 
// function Chart({  data, title,dataKey, grid }) { 
//   return ( 
//     <div className="chart"> 
//       <p className="chartTitle"> {title}</p> 
//       <ResponsiveContainer width="100%" aspect={4 / 1}> 
//         <LineChart data={data}> 
//           <XAxis dataKey="name" stroke="#5550bd" /> 
//           <Line type="monotone" dataKey={dataKey} stroke="#5550bd" /> 
//           <Tooltip /> 
//           {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} 
//         </LineChart> 
//       </ResponsiveContainer> 
//     </div> 
//   ); 
// } 
// export default Chart;


import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

function Chart({ data, title, totalRevenue }) {
  const [chartData, setChartData] = useState([]);
  const [granularity, setGranularity] = useState("month"); // Default granularity is month

  useEffect(() => {
    processData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // Trigger the useEffect when the data prop changes

  const processData = () => {
    try {
      // Check if data is an object with a 'Data' property
      if (!data || !data.Data || !Array.isArray(data.Data)) {
        console.error("Invalid data structure:", data);
        return;
      }

      const rawData = data.Data; // Access the array under 'Data'

      // Create an object to store data for each month
      const monthData = {};

      // Process the data and calculate the total for each month
      rawData.forEach((entry) => {
        const { Month, Rent, Sales } = entry;
        if (!monthData[Month]) {
          monthData[Month] = { Month, Rent: 0, Sales: 0 };
        }

        if (Sales) {
          monthData[Month].Sales += Sales || 0;
        }
        monthData[Month].Rent += Rent || 0;
      });

      // Format the data for the chart
      const chartData = Object.values(monthData);

      setChartData(chartData);
    } catch (error) {
      console.log("Error processing data:", error);
    }
  };
  const handleGranularityChange = (newGranularity) => {
    setGranularity(newGranularity);
  };
  const formatMoney = (amount) => {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };


  return (
    <div className="chart">
      <div className="row mb-2">
        <p className="chartTitle">{title}</p>
        <div className=" col-6 text-left">

          <p className="orderOverViewTitle">Total Earnings of the Year</p>
          <h3>{formatMoney(totalRevenue)}</h3>
        </div>
        <div className="col-6 text-right">
          <button onClick={() => handleGranularityChange("day")} >Day</button>
          <button onClick={() => handleGranularityChange("week")}>Week</button>
          <button onClick={() => handleGranularityChange("month")}>Month</button>
          <button onClick={() => handleGranularityChange("year")}>Year</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <AreaChart width={1000} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Sales" stroke="red" fill="red" name="Sales" />
          <Area type="monotone" dataKey="Rent" stroke="green" fill="green" name="Rent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
