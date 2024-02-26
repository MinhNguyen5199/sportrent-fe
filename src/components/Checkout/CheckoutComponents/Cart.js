import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ADD_TO_CART } from "../../../redux/constants/cartConstant";
import { deleteFromCart } from "../../../redux/actions/cartActions";
import AuthService from "../../../Service/AuthService";
import PublicService from "../../../Service/publicService";

import { withRouter } from "../../../constants/WithRouter";
// import "./Cart.css";

import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { images } from "../../../constants";
import { RelatedProduct } from "../RelatedProduct";

const moment = extendMoment(originalMoment);

const Cart = ({ pageProgress }) => {
  // Number of days
  // pickup and return dates from calender
  const startDate = new Date(localStorage.getItem("startDate"));
  const endDate = new Date(localStorage.getItem("endDate"));

  const duration = moment(endDate).diff(startDate, "days");
  let numberOfDays = (duration <= 1 ? 1 + ' day' : duration + ' days');

  // const [quantity, setQuantity] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const user = AuthService.getCurrentUser();
  const [authorizedUser, setAuthorizedUser] = useState("");
  const [authorizedAdmin, setAuthorizedAdmin] = useState("");
  const [authorizedStaff, setAuthorizedStaff] = useState("");

  useEffect(() => {
    if (user) {
      setAuthorizedUser(user.roles.includes("ROLE_USER"));
      setAuthorizedAdmin(user.roles.includes("ROLE_ADMIN"));
      setAuthorizedStaff(user.roles.includes("ROLE_MODERATOR"));
    }
  }, [user]);

  


  // Handel change to items quantity
  const handleQtyChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    cart.forEach((cart) => {
      if (cart.product.id === product.product.id) {
        cart.quantity = e.target.value;
        cart.amount = 0;
        cart.amount =
          parseFloat(cart.quantity) * parseFloat(product.product.price) * (duration <= 1 ? 1 : duration);
      }
    });
    // update or set cart
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  //
  let navigate = useNavigate();
  const redirectToProduct = () => {
    navigate("/shoppingCart");
  };


  function handleClick() {
    navigate.push("/login");
  }
  const [relatedProducts, setRelatedProducts] = useState([]);


  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  
    // Create a copy of the current relatedProducts state
    let updatedRelatedProducts = [...relatedProducts];
  
    cart.forEach((cartItem) => {
      const productId = cartItem.product.id;
      PublicService.getRelatedProductsById(productId)
        .then((response) => {
          // Merge the new related products with the existing ones
          updatedRelatedProducts = updatedRelatedProducts.concat(response.data);
          // Remove duplicates (if any) based on product IDs
          const uniqueRelatedProducts = [];
          const productIdsSet = new Set();
          updatedRelatedProducts.forEach((product) => {
            if (!productIdsSet.has(product.id)) {
              productIdsSet.add(product.id);
              uniqueRelatedProducts.push(product);
            }
          });
          // Update the state with the merged and deduplicated related products
          setRelatedProducts(uniqueRelatedProducts);
        })
        .catch((error) => {
          console.log("Error fetching related products: ", error);
        });
    });
  }, []);
  


  return (
    <div className="checkout-ShoppingCart border">
      <div className="row">
        <div className="col-md-8 cart">
          <div className="">
            <div className="row">
              <div className="col-6 border-bottom">
                <div>
                  <h3>
                    <b>YOUR CART</b>
                  </h3>
                </div>
              </div>
              <div className="col-6  border-bottom text-right ">
                <span className="cart-items font-weight-light text-muted">
                  {cart.length === 1
                    ? "1 item"
                    : `${cart.length} items `}
                  &nbsp; for {numberOfDays}
                </span>
              </div>
            </div>
            {cart.length === 0 && (
              <h5 className="text-center text-bold mt-5">
                {" "}
                You have no items in your cart, start adding some!
              </h5>
            )}
          </div>
          {/* product in cart list here */}
          {cart.map((product) => (
            <div className="row border-top border-bottom" key={product.id}>
              <div className="row main align-items-center">
                <div className="col-2">
                  <img
                    className=" cart_image "
                    src={`data:image/png;base64,${product.product.product_Image}`}
                    alt={images.ImageNotAvailable}
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = images.ImageNotAvailable; // set alternative image
                    }}
                  />
                </div>
                <div className="col-3">
                  <div className="row cart-product-name">
                    {product.product.product_Name}
                  </div>
                  <div className="row text-mute text-gray cart-product-category">
                    {product.product.category_Name}
                  </div>

                </div>
                <div className="col-2">
                  <input
                    type="number"
                    min="1"
                    max={product.productQty}
                    value={product.quantity}
                    onChange={(e) => handleQtyChange(e, product)}
                    className="form-control text-center cartInput"
                  ></input>
                </div>
                <div className="col-2 cart-onsale-price">
                 
                    ${" "}
                    {(
                      product.onSalePrice
                    ).toFixed(2)}
                
                </div>
                <div className="col-2 product-price">
                    ${" "}
                    {(
                      product.amount
                    ).toFixed(2)}
                  
                </div>
                <div className=" col-1 close">
                  <a
                    href="/cart"
                    className="delete"
                    title="Delete"
                    data-toggle="tooltip"
                    onClick={() => dispatch(deleteFromCart(product))}
                  >
                    <i className="material-icons">&#xE872;</i>
                  </a>
                </div>
              </div>
            </div>
          ))}

          <p className="text-center mt-4"><span className="thankyou">Thanks for shopping at Calgary Sports Rent!</span></p>

          <div className="back-to-shop">
            YOU MIGHT ALSO LIKE...
            <div className="row relatedProducts">

              <RelatedProduct relatedProducts={relatedProducts} />
            </div>
          </div>
        </div>
        <div className="col-md-4 summary border">
          <div>
            <h5>
              <b>Summary</b>
            </h5>
            <hr />
          </div>

          <div className="row ">
            <div className="col-8 text-left">Subtotal() :</div>
            <div className="col-4 text-right font-weight-bold">
              $
              {cart
                .reduce(
                  (currentSum, currentCartItem) =>
                    currentSum +
                    currentCartItem.amount,
                  0
                ).toFixed(2)}
            </div>

            <form>
              <span>
                Security Deposit{" "}
                <small className="text-danger">
                  *You will be charged at store
                </small>
              </span>
              <select>
                <option className="text-muted" value={200.0}>
                  Standard-Deposit- $200.00
                </option>
              </select>
              {/* <p>GIVE CODE</p>
                <input id="code" placeholder="Enter your code" /> */}
            </form>
          </div>
          <div className="row total_price">
            <div className="col-8">Sales Tax</div>
            <div className="col-4 text-right">
              $
              {cart
                .reduce(
                  (currentSum, currentCartItem) =>
                    currentSum +
                    currentCartItem.amount *
                    0.05,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <div className="row total_price">
            <div className="col-8">Estimated Total  (CAD)</div>
            <div className="col-4 text-right grandTotal">
              $
              {cart
                .reduce(
                  (currentSum, currentCartItem) =>
                    currentSum +
                    currentCartItem.amount +
                    currentCartItem.amount *
                    0.05,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                className="mt-4 cart_button"
                type="submit"
                value="Continue Shopping"
                href="/shoppingCart"
                onClick={redirectToProduct}
              />
            </div>
            <div className="col-6">
              {authorizedUser || authorizedAdmin || authorizedStaff ? (

                <input
                  className="mt-4 cart_button"
                  type="submit"
                  value="Checkout Now"
                  onClick={() => pageProgress("checkout")}
                />

              ) : (
                <input
                  className="mt-4 cart_button"
                  type="submit"
                  value="Login"
                  onClick={() => pageProgress("signIn")}

                />

              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Cart);
