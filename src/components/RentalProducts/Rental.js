import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import publicService from "../../Service/publicService";
import "./Rentals.css";
import { RentalCategory } from "./RentalCategory";
import { RentalCalender } from "./RentalCalender";
import Product from "../Product/Product";
import RentalBanner from "./RentalBanner";

// max number of product display on start
const productPerRow = 20;

const Rental = () => {
  //retrieve products including category category by category id
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProductByCat(id);
  }, [id]);

  const getProductByCat = (id) => {
    if (id) {
      publicService
        .getProductByCat(id)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => { });
    } else {
      // get all product including category
      publicService
        .getProductByCategory()
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => { });
    }
  };

  const [productCount, setProductCount] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(0);

  const handleNumberOfDaysChange = (numberOfDays) => {
    setNumberOfDays(numberOfDays);
  };

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handelAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: productCount[product.id] || 1,
        numberOfDays: numberOfDays,
      })
    );
  };

  const [next, setNext] = useState(productPerRow);

  const handleMoreProduct = () => {
    setNext(next + productPerRow);
  };

  // filter the products based on the selected filter const handleFilterChange = (filter) => {
    const handleFilterChange = (filter) => {
      let filteredProducts = [...products]; // Make a copy of the products array
    
      if (filter === "all") {
        // No need to filter, set original products
        setProducts(filteredProducts);
      } else if (filter === "type") {
        // Filter by product type
        filteredProducts = filteredProducts.filter(
          (product, index, arr) =>
            arr.findIndex((t) => t.type === product.type) === index
        );
        setProducts(filteredProducts);
      } else if (filter === "price") {
        // Filter by price range
        const minPrice = 10; // Example minimum price value
        const maxPrice = 100; // Example maximum price value
    
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setProducts(filteredProducts);
      } else if (filter === "season") {
        // Filter by season
        filteredProducts = filteredProducts.filter(
          (product) => product.season === filter.toLowerCase()
        );
        setProducts(filteredProducts);
      } else if (filter === "Summer" || filter === "Winter") {
        // Filter by season (Summer or Winter)
        filteredProducts = filteredProducts.filter(
          (product) => product.season.toLowerCase() === filter.toLowerCase()
        );
        setProducts(filteredProducts);
      }
    };
    

  // console.log(JSON.stringify(products))

  return (
    <>
      <div className="row container-{breakpoint} bg-light">
        <div className="row">
          <RentalBanner />
        </div>
        <div className="row">
          <div className="col-lg-6 ">

            <RentalCalender onNumberOfDaysChange={handleNumberOfDaysChange} />

          </div>
          <div className="col-lg-6 form-group menu_filter ">
            <ul className="flex-end">
              <li className="btn" onClick={() => handleFilterChange("*")}>
                All
              </li>
              <li className="btn" onClick={() => handleFilterChange("type")}>
                Type
              </li>
              <li className="btn" onClick={() => handleFilterChange("price")}>
                Price
              </li>
              <li className="btn" onClick={() => handleFilterChange("season")}>
                Season
              </li>
              <li className="dropdown">
                <button
                  className="dropdown-toggle"
                  type="button"
                  id="season-dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Season
                </button>
                <div className="dropdown-menu" aria-labelledby="season-dropdown">
                  <button
                    className="dropdown-item btn"
                    onClick={() => handleFilterChange("Summer")}
                  >
                    Summer
                  </button>
                  <button
                    className="dropdown-item btn"
                    onClick={() => handleFilterChange("Winter")}
                  >
                    Winter
                  </button>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="col-md-2 mt-2">
          {/* <RentalCalender onNumberOfDaysChange={handleNumberOfDaysChange} /> */}
          <RentalCategory />
        </div>

        <div className="row products">
          <Product
            products={products}
            productCount={productCount}
            numberOfDays={numberOfDays}
            setProductCount={setProductCount}
            handleAddToCart={handelAddToCart}
            productPerRow={next}
            show={show}
            setShow={setShow}
          />
        </div>

        {next < products?.length && (
          <button className="mt-4 mb-4 loadMore" onClick={handleMoreProduct}>
            {`Load More (${products.length - next})`} ...
          </button>
        )}
      </div>
    </>
  );
};
export default Rental;
