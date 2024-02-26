import React, { useEffect, useState } from "react";
import ReservationService from "../../../../Service/ReservationService";

// / notifier
import { toast } from "react-toastify";
import FormatAmount from "../../../Controls/FormatAmount";

// Test Data, IMPORT FROM DATABASE AFTER
const TransactionList = () => {
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    getReservation();
  }, []);
  // get all category
  const getReservation = () => {
    ReservationService.getReservation()
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error, Loading Reservation" + error);
      });
  };

  // Search by Keyword
  const { searchTerm } = useState([]);
  // display all category if the search team is empty other wise display based on the search term

  const searchCategory = (keyword) => {
    if (keyword === "") {
      getReservation();
    } else {
      ReservationService.searchCategory(keyword)
        .then((response) => {
          setReservation(response.data);
        })
        .catch((error) => {
          toast.error("Error, during category search" + error);
        });
    }
  };

  const statusFilter = (e) => {
    const status = e.target.value;
    if (status === "all") {
      // show all reservations
      setReservation(reservation);
    } else {
      // filter reservations by status
      const newFilter = reservation.filter((res) => res.reservation_Status.toLowerCase() === status.toLowerCase());
      setReservation(newFilter);
    }
  }

  const statusBadge = (status) => {
    //const isLoggedIn = this.state.isLoggedIn;
    let badge;
    badge =
      status === "Reserved"
        ? "badge bg-primary p-2"
        : status === "Pickup"
        ? "badge bg-success p-2"
        : status === "Return"
        ? "badge bg-secondary p-2"
        : status === "Cancel"
        ? "badge bg-danger p-2"
        : "badge bg-dark p-2";

    return (
      <div>
        <span className={badge}>
          {status === "Reserved"
            ? "Reserved"
            : status === "Pickup"
            ? "Picked up"
            : status === "Return"
            ? "Returned"
            : status === "Cancel"
            ? "Canceled"
            : "Concept"}
        </span>
      </div>
    );
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper ml-0">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-12">
                <h2>Rentals Details</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1 m-0 mb-2 mb-4 ">
              <div className="filter m-0">
                <div className="checkbox-wrapper cbox-filter">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    // checked="checked"
                    value="Reserved"
                    onChange={() => statusFilter("Reserved")}
                  />
                  <label className="form-check-label" htmlFor="reserved">
                    Reserved
                  </label>

                  <input
                    // checked="checked"
                    className="form-check-input"
                    type="checkbox"
                    value="Pickup"
                    onChange={() => statusFilter("Reserved")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Pickup"
                    style={{ width: "80px" }}
                  >
                    Picked up
                  </label>

                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Return"
                    // checked="checked"
                    onChange={() => statusFilter("Reserved")}
                    id="Return"
                  />
                  <label className="form-check-label" htmlFor="Return">
                    Returned
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Cancel"
                    // checked="checked"
                    onChange={() => statusFilter("Reserved")}
                    id="Cancel"
                  />
                  <label className="form-check-label" htmlFor="Cancel">
                    Canceled
                  </label>
                </div>
              </div>
            </div>

            <div className="col-sm-11 p-0">
              <div className="search-box">
                <i className="material-icons">&#xE8B6;</i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search&hellip;"
                  value={searchTerm}
                  onChange={(e) => searchCategory(e.target.value)}
                />
              </div>
            </div>

            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th className="th-sm" scope="col">
                    Reservation Code
                  </th>
                  <th className="th-sm">Customer</th>
                  <th className="th-sm text-align-center">Status</th>
                  <th className="th-sm">Pickup</th>
                  <th className="th-sm">Return</th>
                  <th className="th-sm align-center">Duration</th>
                  <th className="th-sm align-center">Total Amount</th>
                  <th className="th-sm text-align-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservation.map((reservations, index) => (
                  <tr key={reservations.reserveId}>
                    <th scope="row">{reservations.reservation_Code}</th>
                    <td>{reservations.pickupFullName}</td>

                    {/* status 1-reserved 2-pickedup 3-due */}
                    <td className="align-center font-weight-bold">
                      {statusBadge(reservations.reservation_Status)}
                    </td>
                    <td>{reservations.startDate}</td>
                    <td>{reservations.endDate}</td>
                    <td className="text-align-center">
                      {reservations.duration}
                    </td>
                    <td>
                      <FormatAmount amount={reservations.totalPrice} />
                    </td>

                    <td>
                      <div className="trn-btn-grp">
                        <div
                          className={
                            reservations.reservation_Status === "Reserved"
                              ? "trn-btn-show"
                              : "trn-btn-hide"
                          }
                        >
                          <a
                            href={`/StaffLayout/cust-reservation/${reservations.id}`}
                          >
                            <span className="trn-btn trn-btn-pu">Pickup</span>
                          </a>
                        </div>

                        {/* */}
                        <div
                          className={
                            reservations.reservation_Status === "Pickup"
                              ? "trn-btn-show"
                              : "trn-btn-hide"
                          }
                        >
                          <a
                            href={`/StaffLayout/cust-return/${reservations.id}`}
                          >
                            <span className="trn-btn trn-btn-pu">Return</span>
                          </a>
                        </div>
                        <div
                          className={
                            reservations.reservation_Status === "Reserved"
                              ? "trn-btn-show"
                              : "trn-btn-hide"
                          }
                        >
                          <a
                            href={`/StaffLayout/cust-return/${reservations.id}`}
                          >
                            <span className="trn-btn trn-btn-ca">Cancel</span>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TransactionList;
