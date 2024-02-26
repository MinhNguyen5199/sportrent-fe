// import React from "react";
// import Chart from './Charts';
// import FeaturedInfo from './FeaturedInfo'
// import './dashboard.css'
// import { userData } from "./DummyData";
// import Transaction from './LatestTransaction';
// import NewMembers from "./NewMembers";
// import NewUserMetrics from "./NewUserMetrics";
// import  OrderOverview  from "./OrderOverview";
// import EmployeeProfile from "./EmployeeProfile";
// function Home() {
//   return (
//     <div className="home">
//       <FeaturedInfo />
//       <Chart data={userData} title="Product Rental Analytics" grid dataKey="Active User"/>
//       <div className="homeWidgets">
//         {/* <NewMembers/> */}
//         <NewUserMetrics />
//        <OrderOverview />
//       </div>
//         <EmployeeProfile />
//        <Transaction/>
//     </div>
//   );
// }
// export default Home;


import React, { useEffect, useState } from "react";
import Chart from './Charts';
import FeaturedInfo from './FeaturedInfo';
import NewUserMetrics from "./NewUserMetrics";
import OrderOverview from "./OrderOverview";
import EmployeeProfile from "./EmployeeProfile";
import Transaction from './LatestTransaction';
import './dashboard.css';
import DashboardService from '../../../Service/DashboardService';  // Import your service for API calls
import NewMembers from "./NewMembers";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    chartData: [],
    totalSales: 0,
    totalProductsRented: 0,
    latestTransactions: [],
    userData: 0,
    reservationCount: 0,
    newUsers: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await DashboardService.getDashboardData();
      const data = response.data;
  
      setDashboardData({
        chartData: data.chartData,
        totalSales: data.totalSales,
        totalProductsRented: data.totalProductsRented,
        reservationCount: data.reservationCount,
        userData: data.userData,
        latestTransactions: data.latestTransactions,
        newUsers: data.newUsers,
        employeeProfile: data.employeeProfile,
      });
  
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  return (
    <div className="home">
      <FeaturedInfo totalRevenue={dashboardData.totalSales}
        totalProduct={dashboardData.totalProductsRented}
        userData={dashboardData.userData}
        reservationCount={dashboardData.reservationCount}
      />
      <Chart data={dashboardData.chartData} title="Rental and Sales Analytics" grid dataKey="Active User" totalRevenue={dashboardData.totalSales} />
      <div className="homeWidgets">
        <NewUserMetrics newUsers={dashboardData.newUsers} />
        <OrderOverview />
      </div>
      <EmployeeProfile employeeProfile={dashboardData.employeeProfile} />
      <Transaction latestTransactions={dashboardData.latestTransactions} />
      {/* <NewMembers/> */}


    </div>
  );
}

export default Home;
