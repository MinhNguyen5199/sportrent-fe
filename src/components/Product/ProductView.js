import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { ProductQuantity } from "../RentalProducts/ProductQuantity";
import "./productView.css";
import "../RentalProducts/Rentals.css";

import { images } from "../../constants";
const ProductView = () => {
  const { parameter } = useParams();
  const product = JSON.parse(decodeURIComponent(parameter));

  // CART add , update and remove  items from cart
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState({});

  const handelAddToCart = (product) => {
    dispatch(
      addToCart({ ...product, quantity: productCount[product.id] || 1 })
    );
  };
  return (
    <div className="container-sm">
      <div className="cards">
        <div className="card-body">
          <div className="card__body mt-4">
            <div className="card__category">{product.category_Name}</div>{" "}
            <h2 className="card__title ">{product.product_Name}</h2>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <div className="white-box ">
                <img
                  src={`data:image/png;base64,${product.product_Image}`}
                  alt={images.ImageNotAvailable}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = images.ImageNotAvailable; // set alternative image
                  }}
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6">
              <h4 className="box-title mt-0">Product description</h4>
              <p>{product.description}</p>
              <div className="subtitle">
                <span className="price"> Starts from</span> $
                {product.price.toFixed(2)}
              </div>
              {/* <small className="text-success">(36%off)</small> */}

              {/* Quantity increment and decrement  */}
              <div className="btns ">
                <ProductQuantity
                  product={product}
                  productCount={productCount}
                  setProductCount={setProductCount}
                />

                <button
                  className="btn btn-warning btn-rounded mr-1 "
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Add to cart"
                  onClick={() => {
                    // handelAddToCart(product);
                  }}
                >
                  <i className="fa fa-shopping-cart"> Add to cart</i>
                </button>
                <button
                  className="btn btn-primary btn-rounded "
                  onClick={() => {
                    // handelAddToCart(product);
                  }}
                  href="./cart"
                >
                  Buy Now
                </button>
              </div>
              <div>
                <h3 className="box-title mt-5">Key Highlights</h3>
                <ul className="list-unstyled">
                  <li>
                    <i className="fa fa-check text-success"></i>2 Adult capacity
                  </li>
                  <li>
                    <i className="fa fa-check text-success"></i>545 lbs. maximum
                    weight capacity
                  </li>
                  <li>
                    <i className="fa fa-check text-success"></i>Maximum 10 Hp.
                    motor
                  </li>
                  <li>
                    <i className="fa fa-check text-success"></i>12′ or 14′
                    length
                  </li>
                  <li>
                    <i className="fa fa-check text-success"></i>52.5” in width
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3 className="box-title mt-5">General Info</h3>
              <div className="table-responsive">
                <table className="table table-striped table-product">
                  <tbody>
                    <tr>
                      <td width="390">Brand</td>
                      <td>Stellar</td>
                    </tr>
                    <tr>
                      <td>Delivery Condition</td>
                      <td>Knock Down</td>
                    </tr>
                    <tr>
                      <td>Seat Lock Included</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>Office Chair</td>
                    </tr>
                    <tr>
                      <td>Style</td>
                      <td>Contemporary&amp;Modern</td>
                    </tr>
                    <tr>
                      <td>Wheels Included</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Upholstery Included</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Upholstery Type</td>
                      <td>Cushion</td>
                    </tr>
                    <tr>
                      <td>Head Support</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td>Suitable For</td>
                      <td>Study&amp;Home Office</td>
                    </tr>
                    <tr>
                      <td>Adjustable Height</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Model Number</td>
                      <td>F01020701-00HT744A06</td>
                    </tr>
                    <tr>
                      <td>Armrest Included</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Care Instructions</td>
                      <td>
                        Handle With Care,Keep In Dry Place,Do Not Apply Any
                        Chemical For Cleaning.
                      </td>
                    </tr>
                    <tr>
                      <td>Finish Type</td>
                      <td>Matte</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductView;
