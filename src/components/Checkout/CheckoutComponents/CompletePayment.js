import React, { useState, useEffect } from "react";
import ReservationService from "../../../Service/ReservationService";

const CompletePayment = () => {

  let subtotal = 0;
  const [reservation, setReservation] = useState("");
  const [reservedItem, setReservedItem] = useState([]);

  useEffect(() => {
    getReservationLastRecord();
  }, []);

  const getReservationLastRecord = () => {
    ReservationService.getReservationLastRecord()
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        // toast.error("Error, Loading Category" + error);
      });
  };

  useEffect(() => {
    getReservedItemById(reservation.id);
    getReservationLastRecord();
  }, [reservation.id]);

  const getReservedItemById = (reservation_Id) => {
    ReservationService.getReservedItemById(reservation_Id)
      .then((response) => {
        setReservedItem(response.data);
      })
      .catch((error) => {
        // toast.error("Error, Loading Category" + error);
      });
  };


  return (
    <div className="container-sm ">

      <div className="row">

        <div className="w-100 p-3  text-center">
          <div className="success-msg  m-2">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            <div className="title display-6  text-success">Payment Successful. Thank You!</div>

          </div>
        </div>

      </div>
      <div className="row">
        <div className=" col-xs-12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3 border">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <address>
                <strong>Sports Rent</strong>
                <br />
                {reservation.pickupFullName}
                <br />
                {reservation.address}
                <br />
                {reservation.city}, {reservation.province}
                <br />
                <abbr title="Phone Number">Phone:</abbr>
                <a href="tel: +14032920077">+1 {reservation.phoneNumber}</a>
              </address>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 text-right">
              <p>
                <br />
                <em>Pickup date: {reservation.startDate}</em>
                <br />
                <em>Return date: {reservation.endDate}</em>
              </p>
              <p>
                <em>Receipt #: {reservation.reservation_Code}</em>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="text-start mt-1 mb-1">
              <h5>Order Summary</h5>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {reservedItem.map((item, index) => (
                  <tr key={(subtotal = subtotal + item.amount)}>
                    <td className="col-md-9">
                      <em>{item.product_Name}</em>
                    </td>
                    <td className="col-md-1 text-center"> {item.quantity} </td>
                    <td className="col-md-1 text-center">
                      ${item.onSalePrice}
                    </td>
                    <td className="col-md-1 text-center">${item.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td>   </td>
                  <td>   </td>
                  <td className="text-right">
                    <p>
                      <strong>Subtotal: </strong>
                    </p>
                    <p>
                      <strong>Tax: </strong>
                    </p>
                  </td>
                  <td className="text-center">
                    <p>
                      <strong>${subtotal}</strong>
                    </p>
                    <p>
                      <strong>${subtotal * 0.05}</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>   </td>
                  <td>   </td>
                  <td className="text-right">
                    <h4>
                      <strong>Total: </strong>
                    </h4>
                  </td>
                  <td className="text-center text-danger">
                    <h4>
                      <strong>${reservation.totalPrice}</strong>
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-print-none">
              <div className="float-right" >
                <a
                  href="javascript:window.print()"
                  className="btn btn-success waves-effect waves-light"

                >
                  <i className="fa fa-print" style={{ width: '100px' }}>  Print</i>
                </a>
              </div>
              <div>
              </div>
              </div>
              <div className="w-100 p-3  text-center">
                <p className=" "><strong>Please check your email</strong> you should be receiving Reservation confirmation email shortly.</p>

                <p className="">If you have any question please <span>
                  Call : <a href="tel: +14032920077">+1 403.292.0077</a>
                </span>.</p>


                <p className=" ">
                  <a className="btn btn-primary btn-sm " href="/" role="button">Continue to homepage</a>
                </p>
              </div>
            </div>
          </div>
        </div>
    
    </div>
  );
};


export default CompletePayment;