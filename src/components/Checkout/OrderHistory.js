import React, { useState, useEffect } from "react";
import ReservationService from "../../Service/ReservationService";
import AuthService from "../../Service/AuthService";
// notifier
import { toast } from "react-toastify";
import "./OrderHistory.css";
import { images } from "../../constants";

const OrderHistory = () => {
  const [currentUser, setCurrentUser] = useState(
    AuthService.getCurrentUser().id
  );

  const [reservation, setReservation] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      setCurrentUser(AuthService.getCurrentUser().id);
    }
    if (currentUser) {
      getOrderHistory(currentUser);
    }
  }, [currentUser]);

  const getOrderHistory = (currentUser) => {
    ReservationService.getOrderHistory(currentUser)
      .then((response) => {
        const reversedData = response.data.reverse(); // Reverse the order of reservation list
        setReservation(reversedData);
        reversedData.forEach((reservation) => {
          getReservedItems(reservation.id);
        });
      })
      .catch((error) => {
        toast.error("Error, Loading Reservation" + error);
      });
  };
  const getReservedItems = (reservationId) => {
    ReservationService.getReservedItemById(reservationId)
      .then((response) => {
        const items = response.data.map((item) => ({
          id: item.id,
          product_Image: item.product_Image,
          product_Name: item.product_Name,
          quantity: item.quantity,
          amount: item.amount,
          reservation_id: item.reservation_id,
        }));
        setReservedItems((prevState) => [...prevState, ...items]);
        setItemCounts((prevState) => ({
          ...prevState,
          [reservationId]: items.length,
        }));
      })
      .catch((error) => {
        toast.error("Error, Reservation Items" + error);
      });
  };

  const options = { year: "numeric", month: "short", day: "numeric" };

  const TAX_RATE = 0.05; // 5% tax rate
  const calculateSubtotal = (items, reservationId) => {
    return items
      .reduce((subtotal, item) => {
        if (item.reservation_id === reservationId) {
          subtotal += item.quantity * item.amount;
        }
        return subtotal;
      }, 0)
      .toFixed(2);
  };

  // Function to calculate tax for a given reservation
  const calculateTax = (items, reservationId) => {
    const subtotal = calculateSubtotal(items, reservationId);
    const taxAmount = subtotal * TAX_RATE;
    return taxAmount.toFixed(2);
  };
  return (
    <div className="container-sm">
      <div className="container order-history">
        <h2 className=" order_header">Order History</h2>

        {reservation.map((reservations, index) => (
          <div
            className="reservations"
            onClick={() =>
              setSelectedReservation(
                selectedReservation === reservations.id ? null : reservations.id
              )
            }
          >
            <div className="row order-item" key={index}>
              <div className="col-md-2 ">
                <p className="mb-0 order-item__date">
                  {new Date(reservations.date_Stamp_Date).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
                <span
                  className={`fw-6h ${
                    reservations.reservation_Status === "Cancel"
                      ? "text-danger"
                      : reservations.reservation_Status === "Pickup"
                      ? "text-success"
                      : "text-warning"
                  } reservation_status`}
                >
                  <p className="mb-0  ">{reservations.reservation_Status}</p>
                </span>
              </div>
              <div className="col-md-2 order-item__pickup">
                <p className="mb-0 order_title">Pickup</p>
                <p className="mb-0 subtitle">
                  {new Date(reservations.startDate).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
              </div>
              <div className="col-md-2 order-item__return">
                <p className="mb-0 order_title">Return</p>
                <p className="mb-0 subtitle">
                  {new Date(reservations.endDate).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
              </div>
              <div className="col-md-3 order-item__order-number">
                <p className="mb-0 order_title">
                  Order No. {reservations.reservation_Code}
                </p>

                <p className="mb-0 subtitle ">
                  {itemCounts[reservations.id]
                    ? `Item (${itemCounts[reservations.id]})`
                    : null}
                </p>
              </div>
              <div className="col-md-2 order-item__total-price text-end">
                <p className="mb-0">${reservations.totalPrice}</p>
              </div>
              <div className="col-md-1 text-middle">
                <i
                  className={`fa ${
                    selectedReservation === reservations.id
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  }`}
                  onClick={() =>
                    setSelectedReservation(
                      selectedReservation === reservations.id
                        ? null
                        : reservations.id
                    )
                  }
                />
              </div>

              <div className="receipt">
                {selectedReservation === reservations.id && (
                  <div className="item-header row">
                    <div className="col-2 header-image">Image</div>
                    <div className="col-3 header-product">Item</div>
                    <div className="col-2 header-qty">Quantity</div>
                    <div className="col-2 header-price">Price</div>
                    <div className="col-3 header-subtotal text-end">
                      Subtotal
                    </div>
                  </div>
                )}

                {selectedReservation === reservations.id &&
                 reservedItems.map((item, index) => 
                    reservations.id === item.reservation_id ? (
                      <div key={index} className="item row">
                        <div className="col-2 images">
                          <img
                            src={`data:image/png;base64,${item.product_Image}`}
                            alt={images.ImageNotAvailable}
                            className="img-fluid prod_Image"
                            style={{ width: "60px" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = images.ImageNotAvailable;
                            }}
                          />
                        </div>
                        <div className="col-3 prod">{item.product_Name}</div>
                        <div className="col-2 qty">{item.quantity}</div>
                        <div className="col-2 subtotal">$ {item.amount}</div>
                        <div className="col-3 subtotal text-end">
                        $  {(item.quantity * item.amount).toFixed(2)}
                        </div>
                      </div>
                    ) : null
                  )}

                {selectedReservation === reservations.id && (
                  <>
                    <div className="row total">
                    <div className="col-10"></div>

                      <div className="col-1">Subtotal:</div>
                      <div className="col-1 text-end">
                        {calculateSubtotal(reservedItems, reservations.id)}
                      </div>
                    </div>
                    <div className="row total">
                    <div className="col-10"></div>

                      <div className="col-1">
                        Tax ({(TAX_RATE * 100).toFixed(0)}%):
                      </div>
                      <div className="col-1 text-end">
                        {calculateTax(reservedItems, reservations.id)}
                      </div>
                    </div>
                    <div className="row total">
                    <div className="col-10"></div>

                      <div className="col-1">Total:</div>
                      <div className="col-1 text-end">
                        {(
                          parseFloat(
                            calculateSubtotal(reservedItems, reservations.id)
                          ) +
                          parseFloat(
                            calculateTax(reservedItems, reservations.id)
                          )
                        ).toFixed(2)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
