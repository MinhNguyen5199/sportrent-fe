import React from "react"


// Reusable component: ReservationSummary
export const ReservationSummary = ({ cart, numberOfDays, duration, totalPrice }) => {
    // Rest of the code for displaying the reservation summary

    return(
        <>
  
              <h2 className="d-flex justify-content-between align-items-center mb-3 header">
             Pickup Info
                <div className="me-4">
                  <span className="badge bg-danger rounded-pill  ">
                    {cart.length}
                  </span>
                </div>
              </h2>

              <ul className="list-group mb-3 checkout-Cart">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>Rental Period </div>
                  <div>  <strong>{numberOfDays}</strong></div>

                </li>
                {cart.map((cartItem) => (

                  <li className="list-group-item d-flex justify-content-between lh-condensed border">
                    <div>
                      <h6 className="my-0">{cartItem.product.product_Name}&nbsp;<small>({cartItem.quantity})</small></h6>
                      <small className="text-muted">
                        {cartItem.product.category_Name}
                      </small>
                    </div>
                    <span className="text-muted">
                      $ {cartItem.onSalePrice.toFixed(2)}
                    </span>
                    <span className="text-muted">
                      $ {(cartItem.onSalePrice * cartItem.quantity * (duration <= 1 ? 1 : duration)).toFixed(2)}

                    </span>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total + GST (CAD)</span>
                  <strong>
                    $
                    {totalPrice}
                  </strong>
                </li>
              </ul>
             
           
        </>
    )
  };