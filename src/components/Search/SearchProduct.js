import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Search.css";
import axios from "axios";
import { images } from "../../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

import { ProductQuantity } from "../RentalProducts/ProductQuantity";
import { RentalCalender } from "../RentalProducts/RentalCalender";
import Product from "../Product/Product";
import { ShoppingCartProduct } from "../RentalProducts/ShoppingCart/ShoppingCartProduct";
import Loading from "../Product/Loading";

const SearchProduct = () => {
  const { searchValue } = useParams();

  // CART add , update and remove  items from cart
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handelAddToCart = (product) => {
    dispatch(
      addToCart({ ...product, quantity: productCount[product.id] || 1 })
    );
  };
  // handel product view and pass the select product
  const handelProductView = (product) => {
    const parameter = encodeURIComponent(JSON.stringify(product));
    window.location.href = `/productView/${parameter}`;

  };
  // Product Quantity for every product  // Quantity increment and decrement state
  const [productCount, setProductCount] = useState({});
  // Number of days from Calender
  const [numberOfDays, setNumberOfDays] = useState(0);
  //update number of days based in the date calender
  const handleNumberOfDaysChange = (numberOfDays) => {
    setNumberOfDays(numberOfDays);
  };

  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  // fetch the product data from API and store it as Items where it will be filtered later based on the search Input value
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(process.env.REACT_APP_API_SP_URL + "/api/public/searchProduct"
        );
        setIsLoaded(true);
        setItems(result.data);
      } catch (error) {
        alert("No Internet connection");
        setIsLoaded(true);
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue !== "") {
      const filteredData = items.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(items);
    }
  }, [searchValue, items]);


  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return   <Loading />
  } else if (filteredResults.length >= 0) {
    return (
      <div className="container-md">
        <div className="row ">
          <div className="col-sm-12 mt-5 border-top border-color-primary  ">  <RentalCalender
            onNumberOfDaysChange={handleNumberOfDaysChange}
          />
          </div>

          <h5 className="ad-header text-black ml-3">
            Found Result {filteredResults.length} items :
            <span className="search_title">"{searchValue}"</span>
          </h5>
        </div>
        <div className="row">
          <div className="col-3">
            {/* <RentalCalender onNumberOfDaysChange={handleNumberOfDaysChange} /> */}
          </div>
        </div>
        <div className="row">
          <div className="grid-container-rental">
            {filteredResults.length === 0 ? (
              <div className="NoResult"></div>
            ) : (
              <div className="mb-5" id="grid">
                <ShoppingCartProduct
                  currentProducts={filteredResults}
                  productCount={productCount}
                  numberOfDays={numberOfDays}
                  setProductCount={setProductCount}
                  handleAddToCart={handelAddToCart}
                  show={show}
                  setShow={setShow}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default SearchProduct;
