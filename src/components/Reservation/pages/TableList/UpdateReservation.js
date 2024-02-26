import React, { useState, useEffect } from "react";
import { images } from "../../../../constants";
import {  Button } from "react-bootstrap";
import ReservationService from "../../../../Service/ReservationService";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const UpdateReservation = ({ reservation, reservedItemsForm }) => {
  // const { id } = useParams();

  // create a new state called formValues that contain reservation and reservedItem
  const [formValues, setFormValues] = useState({
    id:reservation.id,
    pickupFullName: reservation.pickupFullName,
    totalPrice: reservation.totalPrice,
    reservedItemsForm: {
      ...reservedItemsForm
    }
  });
  // state of the reservedItem
  const [reservedItems, setReservedItems] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleItemInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      reservedItemsForm: {
        ...formValues.reservedItemsForm,
        [name]: value,
      },
    });
  };


  useEffect(() => {
    setFormValues({
      id: reservation.id,
      pickupFullName: reservation.pickupFullName,
      totalPrice: reservation.totalPrice,
      reservedItemsForm: reservedItemsForm ? { ...reservedItemsForm } : null
    });
  }, [reservation, reservedItemsForm]);
   


// console.log(JSON.stringify(formValues))
 const { id } = useParams();
 const handleUpdateReservation = (event) => {
  event.preventDefault();
 
  ReservationService.updateReservation(formValues,reservedItemsForm, id)
    .then((response) => {
      toast.success("Reservation updated");
    })
    .catch((error) => {
      toast.error("Error updating reservation status");
    });
};

  return (
    <>
    <div className="container-sm">
      <form onSubmit={handleUpdateReservation}>
        <div className="row">
          <div className="col-sm-6">
          
            <div className="form-group">
              <label htmlFor="pickupFullName" className="lbl">
                Pick up by:
              </label>
              <input
                type="text"
                id="pickupFullName"
                name="pickupFullName"
                value={formValues.pickupFullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalPrice " className="lbl">
                Total Amount:
              </label>
              <input
                type="number"
                id="totalPrice"
                name="totalPrice"
                value={formValues.totalPrice}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`item-name`} className="lbl">
                Item Name:
              </label>
              <input
                type="text"
                id={`item-name`}
                name="product_Name"
                value={formValues.reservedItemsForm.product_Name}
                onChange={(e) => handleItemInputChange(e)}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="lbl">Quantity:</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={formValues.reservedItemsForm.quantity}
                onChange={(e) => handleItemInputChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`price`} className="lbl">
                Price:
              </label>
              <input
                type="number"
                id={`item-amount`}
                name="amount"
                value={formValues.reservedItemsForm.amount}
                onChange={(e) => handleItemInputChange(e)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <img
              src={`data:image/png;base64,${formValues.reservedItemsForm.product_Image}`}
              alt={images.ImageNotAvailable}
              className="img-fluid "
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = images.ImageNotAvailable;
              }}
            />
          </div>
        </div>
      </form>

    </div>
      <div className="modal-footer">
      {/* <Button variant="danger" onClick={handleClose}>
        Close
      </Button> */}
      <Button
        type="button"
        className=" btn-primary"
         onClick={handleUpdateReservation}
      >
        Save changes
      </Button>
    </div>
    </>
  );
};

export default UpdateReservation;
