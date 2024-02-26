import React, { useState, useEffect } from "react";
import "../RentalProducts/Rentals.css";
import { images } from "../../constants";
import { ProductQuantity } from "../RentalProducts/ProductQuantity";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import StarRating from "./StarRating";
import Pagination from "./Pagination";
const Product = ({
  products,
  productCount,
  setProductCount,
  handleAddToCart,
}) => {
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  const formatTotalCost = (product, count) => {
    count = count || 1;
    let totalCost = count * product.price;
    return `$${totalCost.toFixed(2)}`;
  };

  const handelProductView = (product) => {
    const parameter = encodeURIComponent(JSON.stringify(product));
    window.location.href = `/productView/${parameter}`;
  };


  // pagination for rental products
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {loading && <Loading />}
      <div className="grid-container-rental">
        {currentProducts.map((product, index) => (
          <div className="rental" key={index}>
            <div className="prod-info-main">
              <div className="row">
                <div className="productCard">
                  <article className="card">
                    <header className="card__thumb">
                      <a href="#">
                        <img
                          src={`data:image/png;base64,${product.product_Image}`}
                          alt={images.ImageNotAvailable}
                          className="product-images"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = images.ImageNotAvailable;
                          }}
                        />
                      </a>
                    </header>

                    {show[product.id] && (
                      <img
                        src={images.addedToCart}
                        alt=""
                        className="conformationIcon"
                      />
                    )}
                    {/* <i className="heart fa fa-heart"></i> */}

                    <div className="card__body">
                      <div className="card__category">
                        {product.category_Name}
                      </div>
                      <div className="flex-container">
                        <div>
                          <h2 className="card__title">
                            {product.product_Name}
                          </h2>
                        </div>
                        <div className="card__subtitle flex-grow-1">
                          $ {product.price.toFixed(2)}
                        </div>
                      </div>
                      <p className="card__description">
                        {[...Array(3)].map((_, index) => (
                          <img
                            key={index}
                            src={`data:image/png;base64,${product.product_Image}`}
                            alt={images.ImageNotAvailable}
                            className="multiple-product-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = images.ImageNotAvailable;
                            }}
                          />
                        ))}
                      </p>
                    </div>
                  </article>
                </div>
                <div className="flex-container quantity">
                  <div className="">
                    <ProductQuantity
                      product={product}
                      productCount={productCount}
                      setProductCount={setProductCount}
                    />
                  </div>
                  <div className="flex-grow-1 text-end">
                    <StarRating />
                  </div>
                </div>
                <div className="costPeriod">
                  <div className="row">
                    <div className="col-6 period">
                      <p className="pick text-start">Description</p>
                    </div>
                    <div className="col-6 text-end period">
                      <p className="pick">
                        <span className="availability">
                          {product.available_quantity === 0 ? (
                            <p className="text-danger availability"> Not available. </p>
                          ) : (
                            `${product.available_quantity} Rental's Available`
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 ">
                      <div className="description">
                        <span>{product.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="buttons">
                  <div className="d-flex flex-row-reverse buttons">
                    <div className="view">
                      <Link
                        onClick={() => {
                          handelProductView(product);
                        }}
                      >
                        <button className=" productBtn">
                          <i className="fa fa-eye" />
                        </button>
                      </Link>
                    </div>
                    <button
                      className="add  productBtn"
                      data-toggle="tooltip"
                      title="Add to cart"
                      onClick={() => {
                        handleAddToCart(product);
                        setShow((prevShow) => ({
                          ...prevShow,
                          [product.id]: !prevShow[product.id],
                        }));
                      }}
                    >
                      <i className="fa fa-shopping-cart"> Add to cart
                        <span className="pl-2 ">
                          {formatTotalCost(
                            product,
                            productCount[product.id],
                          )}
                        </span></i>
                    </button>
                    <div className=" d-inline-block me-0">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

    </>
  );
};

export default Product;
