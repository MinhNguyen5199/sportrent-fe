import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import ReservationService from "../../../../Service/ReservationService";
import {  useParams } from "react-router-dom";

// notifier
import { toast } from "react-toastify";

// Test Data, IMPORT FROM DATABASE AFTER
const ReturnEquipments = () => {
  const { id } = useParams();

  const [reservation_Id, setReservation_Id] = useState("");
  const [reservation_Code, setReservation_Code] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupFullName, setPickupFullName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  // fetch Reservation for a customer

  useEffect(() => {
    if (id) {
      ReservationService.customerReservationById(id)
        .then((response) => {
          setReservation_Id(response.data.id);
          setReservation_Code(response.data.reservation_Code);
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);
          setPickupFullName(response.data.pickupFullName);
          setTotalPrice(response.data.totalPrice);
        })
        .catch((error) => {
          toast.error("Error, Loading " + error);
        });
    }
  }, [id]);

  // fetch reserved item by customer
  const [reservedItem, setReservedItem] = useState([]);

  useEffect(() => {
    getReservedItemById(reservation_Id);
  }, [reservation_Id]);
  // this method will retrieve reserved items

  const getReservedItemById = (reservation_Id) => {
    ReservationService.getReservedItemById(reservation_Id)
      .then((response) => {
        setReservedItem(response.data);
      })
      .catch((error) => {
         toast.error("Error, Loading Category" + error);
      });
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-12">
                <h2>Return Equipment</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 mb-2">
              <a href={`/StaffLayout/new_reservation`}>
                <button>Save</button>
              </a>
              {/* <a href={`/StaffLayout/new_reservation`} className="m-2">
                <button>Cancel</button>
              </a> */}
            </div>
          </div>

          <Container className="m-0 mt-2 mb-3">
          <Row className="mt-2">
              <Col>
                Reservation Code:&nbsp;&nbsp;&nbsp;
                <span className="fw-6h">{reservation_Code}</span>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                Pickup
                Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fw-6h">{startDate}</span>
               
              </Col>
              <Col>
              Return Date:&nbsp;&nbsp;
                <span className="fw-6h">{endDate}</span>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                Customer Name:&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fw-6h">{pickupFullName}</span>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                Penalties:&nbsp;
                <span className="fw-6h fc-danger">$???</span>
              </Col>
              <Col>
              Total Fee:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="fw-6h">${totalPrice}</span>
              </Col>
            </Row>
          </Container>

          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Returned Quantity</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservedItem.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.product_Name}</td>
                  <td>{item.quantity}</td>
                  <td></td>
                  <td>{item.amount}</td>
                  <td>
                    <div className="width-15">
                      <Form.Select className="m-0">
                        <option value="1">Returned</option>
                        <option value="2">Missing Item</option>
                      </Form.Select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturnEquipments;
