import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { images } from "../../constants";

export const CartInNavbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let total = 0;

  if (cart.length > 0) {
    total = cart.reduce(
      (accumulator, product) =>
        accumulator + product.amount,
      0
    );
  }

  return (
    <>
      <div className="shopping-cart-header">
        <i
          className="fa fa-shopping-cart cart-icon"
          onClick={(event) => (window.location.href = "/cart")}
        ></i>
        <span className="badge">{cart.length}</span>
        <div className="shopping-cart-total">
          <span className="lighter-text">Total: </span>
          <span className="main-color-text">${total.toFixed(2)}</span>
        </div>

        {/* <!--end shopping-cart-header --> */}
        <ul className="shopping-cart-items">
          {cart.length === 0 && (
            <li className="clearfix text-center">Your cart is empty</li>
          )}
          {cart.map((product) => (
            <li className="clearfix" key={product.product.id}>
              <img
                src={`data:image/png;base64,${product.product.product_Image}`}
                alt={images.ImageNotAvailable}
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = images.ImageNotAvailable; // set alternative image
                }}
              />
              <span className="item-name">
                {product.product.product_Name}
                {/* {product.product.category_Name} */}
              </span>
              <span className="item-price">
                ${product ? (product.amount).toFixed(2) : 0}
              </span>
              <span className="item-quantity">
                Quantity: {product.quantity}
              </span>

              <Link
                className="delete float-right"
                title="Delete"
                data-toggle="tooltip"
                onClick={() => dispatch(deleteFromCart(product))}
              >
                <i className="material-icons">&#xE872;</i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="checkoutButton">
        <Link

          className="button"
          onClick={(event) => (window.location.href = "/cart")}
        >
          Checkout
        </Link>
      </div>
    </>
  );
};
