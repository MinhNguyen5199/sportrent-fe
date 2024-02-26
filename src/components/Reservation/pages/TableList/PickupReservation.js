import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReservationService from "../../../../Service/ReservationService";
import { toast } from "react-toastify";

import { Modal, Button, Form } from "react-bootstrap";


import UpdateReservation from "./UpdateReservation";
import { images } from "../../../../constants";

const PickupReservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({
    id: "",
    reservation_Code: "",
    startDate: "",
    endDate: "",
    pickupFullName: "",
    totalPrice: "",
    reservation_status: "",
  });

  const [reservedItems, setReservedItems] = useState([
    { id: 0, product_Image: null, product_Name: "", quantity: 0, amount: 0.0 },
  ]);

  useEffect(() => {
    if (id) {
      ReservationService.customerReservationById(id)
        .then((response) => {
          setReservation(response.data);
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (reservation.id) {
      ReservationService.getReservedItemById(reservation.id)
        .then((response) => {
          setReservedItems(response.data);
        })
        .catch((error) => {
          toast.error("Error, Reservation Items" + error);
        });
    }
  }, [reservation.id]);
  

  const handlePickup = () => {
    const confirmed = window.confirm(
      "Are you sure you want to confirm pickup?"
    );
    if (confirmed) {
      ReservationService.updateReservationStatus(id, "Pickup")
        .then((response) => {
          setReservation(response.data);
          toast.success("Reservation status updated to Picked Up");

          // Disable the pickup button
          const pickupButton = document.getElementById("pickup-button");
          if (pickupButton) {
            pickupButton.disabled = true;
          }
        })
        .catch((error) => {
          toast.error("Error updating reservation status");
        });
    }
  };

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel the reservation?"
    );
    if (confirmed) {
      ReservationService.updateReservationStatus(id, "Cancel")
        .then((response) => {
          setReservation(response.data);
          toast.success("Reservation status updated to Cancelled");

          // Disable the cancel button
          const cancelButton = document.getElementById("cancel-button");
          if (cancelButton) {
            cancelButton.disabled = true;
          }
        })
        .catch((error) => {
          toast.error("Error updating reservation status"+ error);
        });
    }
  };

  const [show, setShow] = useState(false);
  const [reservedItemsForm, setReservedItemsForm] = useState();

  // handle the update reservation item by passing reservation and items data to model then opening the model to modify the data
  const handleUpdateClick = (item, index) => { 
    setReservedItemsForm({ ...item, index });
    setShow(true);
  };

  // remove the items from the reservedItem on click the remove button
  const handleRemoveItem = (itemId) => {
    ReservationService.deleteReservedItemById(itemId)
      .then((response) => {
        const updatedReservedItems = reservedItems.filter((item) => item.id !== itemId);
      
        setReservedItems(updatedReservedItems);
        toast.success("Reserved Item Deleted Successfully");
      })
      .catch((error) => {
        toast.error("Error, Reserved Item Deleting was not successful" + error);
      });
  };
  

  
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <div className="modal-header">
          <h5 className="modal-title">Update Reservation</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <UpdateReservation
            reservation={reservation}
            reservedItemsForm={reservedItemsForm}
          
          />
        </div>
      
      </Modal>
      <div className="container-xl">
        <div className="dataTables_wrapper dt-bootstrap4 no-footer">
          <div className="row page-title-box ">
            <div className="col-sm-4 ">
              <h4 className="font-size-18">Pickup Reservation</h4>
            </div>
            <div className="col-sm-8 mb-2  text-end">
              <button
                className="updateBtn"
                onClick={handlePickup}
                id="pickup-button"
              >
                Pickup &amp; Print
              </button>
              <button
                onClick={handleCancel}
                className="m-2 updateBtn bg-danger"
                id="cancel-button"
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
        <Container className="m-0 mt-2 mb-3">
          <Row className="mt-2">
            <Col>
              Reservation Code:&nbsp;
              <span className="fw-6h">{reservation.reservation_Code}</span>
            </Col>

            <Col>
              Payment Status:&nbsp;
              <span className="fw-6h">{reservation.payment_Option}</span>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mt-2">
            <Col>
              Pickup Date:&nbsp;
              <span className="fw-6h">{reservation.startDate}</span>
            </Col>
            <Col>
              Return Date:&nbsp;
              <span className="fw-6h">{reservation.endDate}</span>
            </Col>
            <Col>
              Current Reservation Status:&nbsp;
              <span
                className={`fw-6h ${
                  reservation.reservation_Status === "Cancel"
                    ? "text-danger"
                    : reservation.reservation_Status === "Pickup"
                    ? "text-success"
                    : "text-warning"
                } reservation-status`}
              >
                {reservation.reservation_Status}
              </span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              Customer Name:&nbsp;
              <span className="fw-6h">{reservation.pickupFullName}</span>
            </Col>
            <Col>
              Total Fee:&nbsp;
              <span className="fw-6h">${reservation.totalPrice}</span>
            </Col>

            <Col></Col>
          </Row>
        </Container>

        <button className="updateBtn" onClick={handlePickup}>
          Add Item
        </button>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Image</th>
              <th>Item</th>
              {/* <th>Serial Number</th> */}
              <th>Quantity</th>
              <th>Amount</th>
              <th className="justify-content-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservedItems.map((item, index) => (
              <tr key={index + 1}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={`data:image/png;base64,${item.product_Image}`}
                    alt={images.ImageNotAvailable}
                    className="img-fluid prod_Image"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = images.ImageNotAvailable; // set alternative image
                    }}
                  />
                </td>
                <td>{item.product_Name}</td>
                {/* <td>{item.serial_Number}</td> */}
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td>
                  <div className="justify-content-center">
                    <Link
                      className="trn-btn trn-btn-pu"
                      onClick={() => handleUpdateClick(item)}
                    >
                      Update
                    </Link>

                    <Link 
                     className="trn-btn trn-btn-ca"
                                       
                     title="Delete"
                     data-toggle="tooltip"
                     onClick={() => {
                       window.confirm(
                         "Are you sure you want to delete this Item ?"
                       ) && handleRemoveItem(item.id);
                     }}
                     >Remove
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PickupReservation;
