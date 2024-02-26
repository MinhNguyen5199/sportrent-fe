import React from 'react';

function FeaturedInfo({ totalRevenue, totalProduct, userData, reservationCount }) {

  const formatMoney = (amount) => {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const today = new Date();
  const firstMonth = new Date(today.getFullYear(), 0); // 0 represents January

  const firstMonthFormatted = `${months[firstMonth.getMonth()]}`;
  const currentMonthFormatted = `${months[today.getMonth()]} ${today.getFullYear()}`;
  const currentYear = firstMonthFormatted + " - " + currentMonthFormatted;



  return (
    <div className="featured">
      <div className="featuredItem rented">
        <span className="featuredTitle">Product Rented</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalProduct}</span>
          <i className="fa fa-shopping-cart chartIcon"></i>
        </div>
        <span className="featuredSub">{currentYear}</span>
      </div>
      <div className="featuredItem sale ">
        <span className="featuredTitle">Total Sale</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatMoney(totalRevenue)}</span>
          <i className="fa fa-money-bill chartIcon moneyBill"></i>
        </div>
        <span className="featuredSub">{currentYear}</span>
      </div>
      <div className="featuredItem customers">
        <span className="featuredTitle">New Customers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{userData}</span>
          <i className="fa fa-users chartIcon"></i>
        </div>
        <span className="featuredSub">{currentYear}</span>
      </div>
      <div className="featuredItem totalReservations">
        <span className="featuredTitle">Total Reservations</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{reservationCount}</span>
          <i className="fa fa-book chartIcon"></i>
        </div>
        <span className="featuredSub">{currentYear}</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
