import React from "react";
import moment from "moment";
function LatestTransaction({latestTransactions}) {


  const getStatusColor = (status) => {
    return status === "Paid" ? "circle-paid" : "circle-not-paid";
  };

  return (
    <div className="transactionLg">
      <p className="chartTitle">Latest Transactions</p>
      <table className="transactionLgTable">
        <thead>
          <tr className="transactionLgTr">
            <th className="transactionLgTh">Customer</th>
            <th className="transactionLgTh">Date</th>
            <th className="transactionLgTh">Amount</th>
            <th className="transactionLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {latestTransactions.map((transaction, index) => (
            <tr key={index} className="transactionLgTr">
              <td className="transactionLgUser">
                <img
                    src="https://images.gr-assets.com/authors/1561336084p8/4123863.jpg"
              alt=""
                  className="transactionLgImg"
                />
                <span className="transactionLgName">{transaction.pickupFullName}</span>
              </td>
              <td className="transactionLgDate"> {moment(transaction.date_Stamp_Date).format("MMM DD, YYYY")}
           </td>
              <td className="transactionLgAmount">${transaction.totalPrice.toFixed(2)}</td>
              <td className="transactionLgStatus">
              <i className={`fa fa-circle-o mr-2 ${getStatusColor(transaction.payment_Option)}`} ></i>   {transaction.payment_Option}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestTransaction;
